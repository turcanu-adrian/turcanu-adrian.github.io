var maxguess = 5;	

//console.log(day);
if (localStorage.length == 0){
	console.log("if");
	localStorage.setItem("guessIndex", "0");
	localStorage.setItem("won", "false");
	var guess = [];
	localStorage.setItem("guess", JSON.stringify(guess));
}
else	
	document.getElementsByClassName("guesses")[0].outerHTML = localStorage.getItem("savedpage");


//CREATE AUTOCOMPLETE ARRAY
/*var autocomplete = [];
for (var i = 0; i < players.length; i++)
	autocomplete.push(players[i].name);*/
//console.log(autocomplete);
	
console.log("got to main script");
if (localStorage.getItem("won") == "false"){
	guess = JSON.parse(localStorage.getItem("guess"));
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter"  && localStorage.won == "false" && localStorage.guessIndex < maxguess)
					{
				event.preventDefault();
				var result = players.find(item => item.name.toUpperCase() === input.value.toUpperCase());
				//console.log(result);
				if (result != undefined) {
					if (!guess.includes(input.value.toUpperCase())){
						guess.push(input.value.toUpperCase());
						document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].innerHTML = "<div class=\"team-block\"><img src=\"https://images.squarespace-cdn.com/content/v1/5aa9b09612b13f9aecc1613a/1594234324405-MIM5QUS4UOH0DFG83E4Y/Logo+Main+Red.png\" alt=\"SENTINELS\" style=\"width:192px;height:108px;position:relative;right:18%;top:8%;\"><p>" + result.currentTeam + "</p></div> <div class=\"text-block\">"+ result.name + "</div> <div class =\"text-block\">" + result.nationality + "</div> <div class=\"text-block\">" + result.earnings[0] + "<br>|<br>" + result.earnings[1] + "</div> <div class=\"text-block\">" + result.age + "</div> <div class=\"text-block\">" + result.region + "</div>";
						
						//WIN CONDITION
						if (result.name == players[day].name)
						{
							document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[0].style.backgroundColor="LightGreen";
							for (i=3; i<document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*").length;  i++)
								document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[i].style.backgroundColor="LightGreen";
							localStorage.setItem("won", "true");
						}
						
						//TEAM CHECK
						if (result.currentTeam == players[day].currentTeam)
							document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[0].style.backgroundColor="LightGreen";
						else if (players[day].pastTeams.includes(result.currentTeam))
							document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[0].style.backgroundColor="Yellow";
						
						if (result.nationality == players[day].nationality)
								document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[4].style.backgroundColor="LightGreen";
						
						//REGION CHECK
						if (result.region == players[day].region)
							document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[7].style.backgroundColor="LightGreen";
						
						
						//AGE CHECK
						if (result.age == players[day].age)
							document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[8].style.backgroundColor="LightGreen";
						else if (Math.abs(result.age-players[day].age)<=2)
								if ((result.age-players[day].age)>0)
								{
									document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[8].style.backgroundColor="Yellow";
									document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[8].innerText+="\n▼";
								}
								else
								{
									document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[8].style.backgroundColor="Yellow";
									document.getElementsByClassName("guess"+localStorage.getItem("guessIndex"))[0].getElementsByTagName("*")[8].innerText+="\n▲";
								}
						
						//EARNINGS CHECK 
						localStorage.guessIndex++;					
						//SAVE PROGRESS
						console.log("Saving progress")
						localStorage.setItem("savedpage", document.getElementsByClassName("guesses")[0].outerHTML);
						localStorage.setItem("guess", JSON.stringify(guess));
					}
				}
				else
					alert(input.value + " doesn't exist");
			}
	});
}
