var maxguess = 5;	

if (localStorage.version != 1){
	localStorage.clear();
	localStorage.version = 1;
}

if (localStorage.length == 0){
	localStorage.guessIndex = 0;
	localStorage.won="false";
	var guess = [];
	localStorage.guess=JSON.stringify(guess);
}
else if (localStorage.savedpage != null)	
	document.getElementsByClassName("guesses")[0].outerHTML = localStorage.savedpage;

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

function savepage()
{
	localStorage.savedpage = document.getElementsByClassName("guesses")[0].outerHTML;
	localStorage.guessIndex++;			
	localStorage.guess=JSON.stringify(guess);
	document.getElementById("inputbox").disabled = false;
	console.log("saved page");
}


//CREATE AUTOCOMPLETE ARRAY
/*var autocomplete = [];
for (var i = 0; i < players.length; i++)
	autocomplete.push(players[i].name);*/
//console.log(autocomplete);

if (localStorage.getItem("won") == "false"){
	guess = JSON.parse(localStorage.guess);
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter"  && localStorage.won == "false" && localStorage.guessIndex < maxguess)
					{
				event.preventDefault();
				var result = players.find(item => item.name.toUpperCase() === input.value.toUpperCase());
				//console.log(result);
				if (result != undefined) {
					if (!guess.includes(input.value.toUpperCase())){
						guess.push(input.value.toUpperCase());
						document.getElementsByClassName("guess"+localStorage.guessIndex)[0].innerHTML = "<div class=\"text-block\"><img src=\"https://images.squarespace-cdn.com/content/v1/5aa9b09612b13f9aecc1613a/1594234324405-MIM5QUS4UOH0DFG83E4Y/Logo+Main+Red.png\" alt=\"SENTINELS\" style=\"width:192px;height:108px;\"><p>" + result.currentTeam + "</p></div> <div class=\"text-block\">"+ result.name + "</div> <div class =\"text-block\">" + result.nationality + "</div> <div class=\"text-block\">" + result.earnings[0] + "<br>|<br>" + result.earnings[1] + "</div> <div class=\"text-block\">" + result.age + "</div> <div class=\"text-block\">" + result.region + "</div>";
						
						
						//console.log(document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*"));
						
						
						//WIN CONDITION
						if (result.name == players[day].name)
						{
							document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[0].style.backgroundColor="LightGreen";
							for (i=3; i<document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*").length;  i++){
								document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[i].style.backgroundColor="LightGreen";
							}
							localStorage.won="true";
							
						}
						
						
						//TEAM CHECK
						if (result.currentTeam == players[day].currentTeam)
							document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[0].style.backgroundColor="LightGreen";
						else if (players[day].pastTeams.includes(result.currentTeam))
							document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[0].style.backgroundColor="Yellow";
						
						
						//COUNTRY CHECK
						if (result.nationality == players[day].nationality)
								document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[4].style.backgroundColor="LightGreen";
						
						
						//REGION CHECK
						if (result.region == players[day].region)
							document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[9].style.backgroundColor="LightGreen";
						
						
						//AGE CHECK
						if (result.age == players[day].age)
							document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[8].style.backgroundColor="LightGreen";
						else if (Math.abs(result.age-players[day].age)<=2)
								if ((result.age-players[day].age)>0)
								{
									document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[8].style.backgroundColor="Yellow";
									document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[8].innerText+="\n▼";
								}
								else
								{
									document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[8].style.backgroundColor="Yellow";
									document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[8].innerText+="\n▲";
								}
						
						//EARNINGS CHECK 
						if (result.earnings[0] == players[day].earnings[0])
							document.getElementsByClassName("guess" + localStorage.guessIndex)[0].getElementsByTagName("*")[5].style.backgroundColor="LightGreen";
						else if (result.earnings[0] == players[day].earnings[1])
						{
							document.getElementsByClassName("guess" + localStorage.guessIndex)[0].getElementByTagName("*")[5].style.backgroundColor="Yellow";
							document.getElementsByClassName("guess" + localStorage.guessIndex)[0].getElementsByTagName("*")[5].innerText+="\n▼";
						}
							else
							{
								document.getElementsByClassName("guess" + localStorage.guessIndex)[0].getElementsByTagName("*")[5].style.backgroundColor="Yellow";
								document.getElementsByClassName("guess"+localStorage.guessIndex)[0].getElementsByTagName("*")[5].innerText+="\n▲";
							}
						
								
						//SAVE PROGRESS
						//console.log("Saving progress")
						document.getElementById("inputbox").disabled = true;
						fadeIn(document.getElementsByClassName("guess"+localStorage.guessIndex)[0],0);

						
					}
				}
				else
					alert(input.value + " doesn't exist");
			}
	});
}
