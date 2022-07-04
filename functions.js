
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

//LOAD GUESS FUNCTION
function addGuess(localGuess){
	var text_block;
	var guess = document.createElement("div");
	guess.setAttribute("class", "guess");
	
	
	document.getElementsByClassName("guesses")[0].appendChild(guess);
	
	//CURRENT TEAM BLOCK
	text_block = document.createElement("div");
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML="<img src=\"team-logos\\" + localGuess.currentTeam + ".png\" alt=\""+ localGuess.currentTeam + "\" style=\"min-height:80px;	max-width:161px;max-height:90px;height:auto;width:auto;\"><p>" + localGuess.currentTeam + "</p>";
	if (localGuess.currentTeam == players[day].currentTeam)
		text_block.style.backgroundColor="#538d4e";
	else if (players[day].pastTeams.includes(localGuess.currentTeam))
		text_block.style.backgroundColor="#b59f3b";
	guess.appendChild(text_block);
								
	//CONTINENT BLOCK
	text_block = document.createElement("div");
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML=localGuess.continent;
	if (localGuess.continent == players[day].continent)
		text_block.style.backgroundColor="#538d4e";
	guess.appendChild(text_block);
	
	
	//COUNTRY BLOCK
	text_block = document.createElement("div");
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML = localGuess.country;
	if (localGuess.country == players[day].country)
		guesselem.getElementsByClassName("text-block")[2].style.backgroundColor="#538d4e";
	guess.appendChild(text_block);
	
	
	//EARNINGS BLOCK
	text_block = document.createElement("div");
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML = localGuess.earnings;
	if (localGuess.earnings == players[day].earnings)
		text_block.style.backgroundColor="#538d4e";
	else if (Math.abs(localGuess.earnings - players[day].earnings)<=50000)
		if (localGuess.earnings>players[day].earnings)
	{
		text_block.style.backgroundColor="#b59f3b";
		text_block.innerText+="\n▼";
	}
		else
		{
			text_block.style.backgroundColor="#b59f3b";
			text_block.innerText+="\n▲";
		}
	guess.appendChild(text_block);
	
	//AGE BLOCK
	text_block = document.createElement("div");
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML = localGuess.age;
	if (localGuess.age == players[day].age)
		text_block.style.backgroundColor="#538d4e";
	else if (Math.abs(localGuess.age-players[day].age)<=2)
			if (localGuess.age>players[day].age)
			{
				text_block.style.backgroundColor="#b59f3b";
				text_block.innerText+="\n▼";
			}
			else
			{
				text_block.style.backgroundColor="#b59f3b";
				text_block.innerText+="\n▲";
			}
	guess.appendChild(text_block);
	
	//RATING BLOCK
	text_block = document.createElement("div")
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML = localGuess.rating;
	if (localGuess.rating == players[day].rating)
		text_block.style.backgroundColor="#538d4e";
	else if (Math.abs(localGuess.rating - players[day].rating)<=0.05)
			if (localGuess.rating>players[day].rating)
			{
				text_block.style.backgroundColor="#b59f3b";
				text_block.innerText+="\n▼";
			}
			else
			{
				text_block.style.backgroundColor="#b59f3b";
				text_block.innerText+="\n▲";
			}
	guess.appendChild(text_block);
	
	//NAME BLOCK
	text_block = document.createElement("div")
	text_block.setAttribute("class", "text-block");
	text_block.innerHTML=localGuess.fullname;
	if (localGuess.name == players[day].name)
		text_block.style.backgroundColor="#538d4e";
	guess.appendChild(text_block);
	
}

