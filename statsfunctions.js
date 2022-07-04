
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