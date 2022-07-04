var maxguess = 8;	
var date = new Date();
var day =(date.getDate()*date.getMonth()*date.getDay())%players.length;
day=4;
	
if (localStorage.version != 12){
	localStorage.clear();
	localStorage.version = 12;
}

if (localStorage.length == 1){
	var guessesparse = []
	localStorage.guesses = JSON.stringify(guessesparse);
	localStorage.currentStreak = 0;
	localStorage.maxStreak = 0;
	localStorage.gamesplayed = 0;
	localStorage.gameswon = 0;
	localStorage.day=day;
}
else 
	{
		localStorage.day = day;
	}

//LOAD GUESSES
var guesses = JSON.parse(localStorage.guesses);
for (let i=0;i<guesses.length;i++)
		addGuess(guesses[i]);

//CREATE AUTOCOMPLETE ARRAY
var playernames = [];
for (var i = 0; i < players.length; i++)
	if (!JSON.stringify(guesses).includes(JSON.stringify(players[i])))
		playernames.push(players[i].fullname);
console.log(playernames);

autocomplete(document.getElementById("inputbox"), playernames);

