function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item inlcudes the text field value:*/
        if (arr[i].toUpperCase().includes(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i].substr(0, val.length);
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
	  if (event.key === "Enter"  && localStorage.won == "false" && localStorage.guessIndex < maxguess)
					{
						closeAllLists();
					event.preventDefault();
					var result = players.find(item => item.name === input.value);
					if (result != undefined) {
						if (!guess.includes(input.value.toUpperCase())){
							guess.push(input.value.toUpperCase());
							var guesselem = document.createElement("div");
							guesselem.setAttribute("class", "guess");
							guesselem.innerHTML = "<div class=\"text-block\"><img src=\"team-logos\\" + result.currentTeam + ".png\" alt=\"SENTINELS\" style=\"max-width:161px;max-height:90px;height:auto;width:auto;\"><p>" + result.currentTeam + "</p></div> <div class=\"text-block\">"+ result.continent + "</div> <div class =\"text-block\">" + result.country + "</div> <div class=\"text-block\">" + result.earnings.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits: '0'})  + "</div> <div class=\"text-block\">" + result.age + "</div> <div class=\"text-block\">" + result.rating + "</div> <div class=\"text-block\">" + result.fullname + "</div>";
							
							//WIN CONDITION
							if (result.name == players[day].name)
							{
								
								for (i=0; i<guesselem.getElementsByClassName("text-block").length;  i++){
									guesselem.getElementsByClassName("text-block")[i].style.backgroundColor="#538d4e";
								}
								localStorage.won="true";
								localStorage.gameswon++;
								document.getElementById("inputbox").disabled = true;
							}
							
							
							//TEAM CHECK
							if (result.currentTeam == players[day].currentTeam)
								guesselem.getElementsByClassName("text-block")[0].style.backgroundColor="#538d4e";
							else if (players[day].pastTeams.includes(result.currentTeam))
								guesselem.getElementsByClassName("text-block")[0].style.backgroundColor="#b59f3b";
							
							
							//COUNTRY CHECK
							if (result.country == players[day].country)
									guesselem.getElementsByClassName("text-block")[2].style.backgroundColor="#538d4e";
							
							
							//REGION CHECK
							if (result.region == players[day].region)
								guesselem.getElementsByClassName("text-block")[1].style.backgroundColor="#538d4e";
							else if (players[day].pastRegions.includes(result.region))
								guesselem.getElementsByClassName("text-block")[1].style.backgroundColor="#b59f3b";
							
							
							//AGE CHECK
							if (result.age == players[day].age)
								guesselem.getElementsByClassName("text-block")[4].style.backgroundColor="#538d4e";
							else if (Math.abs(result.age-players[day].age)<=2)
									if ((result.age-players[day].age)>0)
									{
										guesselem.getElementsByClassName("text-block")[4].style.backgroundColor="#b59f3b";
										guesselem.getElementsByClassName("text-block")[4].innerText+="\n▼";
									}
									else
									{
										guesselem.getElementsByClassName("text-block")[4].style.backgroundColor="#b59f3b";
										guesselem.getElementsByClassName("text-block")[4].innerText+="\n▲";
									}
							
							//EARNINGS CHECK 
							if (result.earnings[0] == players[day].earnings[0])
								guesselem.getElementsByClassName("text-block")[3].style.backgroundColor="#538d4e";
							else if (result.earnings[0] == players[day].earnings[1])
							{
								guesselem.getElementsByClassName("text-block")[3].style.backgroundColor="#b59f3b";
								guesselem.getElementsByClassName("text-block")[3].innerText+="\n▼";
							}
								else
								{
									guesselem.getElementsByClassName("text-block")[3].style.backgroundColor="#b59f3b";
									guesselem.getElementsByClassName("text-block")[3].innerText+="\n▲";
								}
								
								
							//RATING checked
							
								
							document.getElementsByClassName("guesses")[0].appendChild(guesselem);	
							document.getElementsByClassName("guesses")[0].innerHTML+="<br>";	
							document.getElementById("inputbox").disabled = true;
							fadeIn(document.getElementsByClassName("guess")[localStorage.guessIndex],0);							
							//SAVE PROGRESS
							
						
						}
					}
			}
			});
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

}

