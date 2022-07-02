var maxguess = 8;	
var date = new Date();
var day =((date.getDate()*date.getMonth()*date.getDay())-1)%2 + 1;
day=0;
	
if (localStorage.version != 11){
	localStorage.clear();
	localStorage.version = 11;
}

if (localStorage.length == 1){
	localStorage.currentStreak = 0;
	localStorage.maxStreak = 0;
	localStorage.gamesplayed = 0;
	localStorage.gameswon = 0;
	localStorage.guessIndex = 0;
	localStorage.won="false";
	localStorage.day=day;
	var guess = [];
	localStorage.guess=JSON.stringify(guess);
}
else if (localStorage.savedpage != null)
	if (day == localStorage.day)
		document.getElementsByClassName("guesses")[0].outerHTML = localStorage.savedpage;
	else 
	{
		localStorage.guessIndex = 0;
		localStorage.savedpage = null;
		localStorage.won = false;
		localStorage.day = day;
	}
	
//FADE IN ANIMATION
function fadeIn(doc, index){
	if (index<doc.getElementsByClassName("text-block").length) 
		var element =  doc.getElementsByClassName("text-block")[index];
	else{
		savepage();
		return;
	}
	let opacity = 0;
	element.style.opacity = 0;
	let timer = setInterval(function() {
		if (opacity > 1){
			clearInterval(timer);
			fadeIn(doc, index+1);	
			}
		else
		{
			opacity += 0.01;
			element.style.opacity = opacity;
			}
	}, 5);
	
}


//SAVE PAGE IN LOCALSTORAGE
function savepage()
{
	localStorage.savedpage = document.getElementsByClassName("guesses")[0].outerHTML;
	localStorage.guessIndex++;			
	localStorage.guess=JSON.stringify(guess);
	
	console.log("saved page");
	if (localStorage.won == "true")
		{
		localStorage.currentStreak++;
		if (localStorage.currentStreak>localStorage.maxStreak)
				localStorage.maxStreak = localStorage.currentStreak;
		localStorage.gamesplayed++;
		showstats();
		}
	else if (localStorage.guessIndex==maxguess)
	{
		localStorage.currentStreak=0;
		localStorage.gamesplayed++;
		showstats();
	}
	else 
		document.getElementById("inputbox").disabled = false;
}

//SHOW STATS PAGE
function showstats()
{
	document.getElementById("statspage").innerHTML = "<img src=\"defaultimage.png\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>STATS<br>";
	if (localStorage.won == "true")
		document.getElementById("statspage").innerHTML = "<img src=\"https://prosettings.net/acd-cgi/img/v1/wp-content/uploads/" + players[day].name.toLowerCase()+ ".png\" id=\"statsimage\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>THE RIGHT ANSWER WAS<br><p id=\"statsname\">"+ players[day].fullname + "</p><br><button id=\"sharescore\" onclick=\"copyscore()\">SHARE MY SCORE</button>	";
	else if (localStorage.guessIndex==maxguess)
		document.getElementById("statspage").innerHTML = "<img src=\"https://prosettings.net/acd-cgi/img/v1/wp-content/uploads/" + players[day].name.toLowerCase()+ ".png\" id=\"statsimage\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>THE RIGHT ANSWER WAS<br><p id=\"statsname\">"+ players[day].fullname + "</p><br><button id=\"sharescore\" onclick=\"copyscore()\">SHARE MY SCORE</button>";
	document.getElementById("statspage").innerHTML += "<p id=\"statstext\">GAMES PLAYED: " + localStorage.gamesplayed + "<br>GAMES WON: "+  localStorage.gameswon + "<br>CURRENT STREAK: "+localStorage.currentStreak + "<br>MAX STREAK: " + localStorage.maxStreak + "</p>";
	document.getElementById("statscontainer").style.display = "block";
}

//COPY RESULTS TO CLIPBOARD
function copyscore()
{
	var copyText = "VALARANTE 1 "+ localStorage.guessIndex +"/" + maxguess + "\n\n";
	for (let i=0;i<localStorage.guessIndex;i++)
	{
		for (let j=0; j<6;j++)
		{
			if (document.getElementsByClassName("guess")[i].getElementsByClassName("text-block")[j].style.backgroundColor == "rgb(83, 141, 78)")
				copyText += "🟩";
			else if (document.getElementsByClassName("guess")[i].getElementsByClassName("text-block")[j].style.backgroundColor == "rgb(181, 159, 59)")
				copyText += "🟨";
			else
				copyText+= "⬛";
		}
		copyText +="\n";
	}
	navigator.clipboard.writeText(copyText)
	alert("COPIED TO CLIPBOARD");
}

//HIDE STATS PAGE
function hidestats()
{
	document.getElementById("statscontainer").style.display = "none";
}

	

//CREATE AUTOCOMPLETE ARRAY
var playernames = [];
for (var i = 0; i < players.length; i++)
	playernames.push(players[i].fullname);
console.log(playernames);

//CREATE TEAMS ARRAY WITH EXTENSION



if (localStorage.won == "false" && localStorage.guessIndex<maxguess){
	hidestats();
	guess = JSON.parse(localStorage.guess);
	autocomplete(document.getElementById("inputbox"), playernames);
}
else
	showstats();
