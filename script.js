var maxguess = 5;	

if (localStorage.version != 9){
	localStorage.clear();
	localStorage.version = 9;
}

if (localStorage.length == 1){
	localStorage.guessIndex = 0;
	localStorage.won="false";
	localStorage.lost="false";
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
		localStorage.lost = false;
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
	document.getElementById("inputbox").disabled = false;
	console.log("saved page");
	if (localStorage.won == "true" || localStorage.lost == "true")
		showstats();
}

//SHOW STATS PAGE
function showstats()
{
	if (localStorage.won == "true")
		document.getElementById("statspage").innerHTML = "<img src=\"https://prosettings.net/acd-cgi/img/v1/wp-content/uploads/" + players[day].name.toLowerCase()+ ".png\" id=\"statsimage\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>THE RIGHT ANSWER WAS<br>"+ players[day].fullname + "<br><button id=\"sharescore\" onclick=\"copyscore()\">SHARE MY SCORE</button>";
	else if (localStorage.lost == "true")
		document.getElementById("statspage").innerHTML = "<img src=\"defaultimage.png\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>SORRY, THE RIGHT ANSWER WAS<br>"+ players[day].fullname + "<br><button id=\"sharescore\" onclick=\"copyscore()\">SHARE MY SCORE</button>";
	else 
		document.getElementById("statspage").innerHTML = "<img src=\"defaultimage.png\" style=\"max-width:300px;max-height:200px;width:auto;height:auto\"><br>STATS<br>";
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
			if (document.getElementsByClassName("guess"+i)[0].getElementsByClassName("text-block")[j].style.backgroundColor == "rgb(83, 141, 78)")
				copyText += "🟩";
			else if (document.getElementsByClassName("guess"+i)[0].getElementsByClassName("text-block")[j].style.backgroundColor == "rgb(181, 159, 59)")
				copyText += "🟨";
			else
				copyText+= "⬛";
		}
		copyText +="\n";
	}
	navigator.clipboard.writeText(copyText)
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


if (localStorage.won == "false" && localStorage.lost == "false"){
	hidestats();
	console.log("won = false");
	guess = JSON.parse(localStorage.guess);
	autocomplete(document.getElementById("inputbox"), playernames);
}
else
	showstats();
