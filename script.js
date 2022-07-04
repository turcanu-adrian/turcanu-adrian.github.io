var maxguess = 8;	
var date = new Date();
var day =((date.getDate()*date.getMonth()*date.getDay())-1)%2 + 1;
day=0;
	
if (localStorage.version != 11){
	localStorage.clear();
	localStorage.version = 11;
}

if (localStorage.length == 1){
	var guessesparse = []
	localStorage.guesses = JSON.stringify(guessesparse);
	localStorage.currentStreak = 0;
	localStorage.maxStreak = 0;
	localStorage.gamesplayed = 0;
	localStorage.gameswon = 0;
	localStorage.guessIndex = 0;
	localStorage.won="false";
	localStorage.day=day;
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

//LOAD GUESSES
var guesses = JSON.parse(localStorage.guesses);
for (let i=0;i<guesses.length;i++)
		addGuess(guesses[i]);

//CREATE AUTOCOMPLETE ARRAY
var playernames = [];
for (var i = 0; i < players.length; i++)
	playernames.push(players[i].fullname);
console.log(playernames);


if (localStorage.won == "false" && localStorage.guessIndex<maxguess){
	autocomplete(document.getElementById("inputbox"), playernames);
}
else
	showstats();
