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
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
	  if (event.key === "Enter"  && localStorage.won == "false" && localStorage.guessIndex < maxguess)
					{
						closeAllLists();
				console.log("enter key pressed");
				event.preventDefault();
				var result = players.find(item => item.name.toUpperCase() === input.value.toUpperCase());
				//console.log(result);
				if (result != undefined) {
					if (!guess.includes(input.value.toUpperCase())){
						guess.push(input.value.toUpperCase());
						document.getElementsByClassName("guess"+localStorage.guessIndex)[0].innerHTML = "<div class=\"text-block\"><img src=\"team-logos\\" + result.currentTeam + ".png\" alt=\"SENTINELS\" style=\"max-width:192px;max-height:108px;height:auto;width:auto;\"><p>" + result.currentTeam + "</p></div> <div class=\"text-block\">"+ result.name + "</div> <div class =\"text-block\">" + result.nationality + "</div> <div class=\"text-block\">" + result.earnings[0] + "<br>|<br>" + result.earnings[1] + "</div> <div class=\"text-block\">" + result.age + "</div> <div class=\"text-block\">" + result.region + "</div>";
						
						
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
						document.getElementById("inputbox").disabled = true;
						fadeIn(document.getElementsByClassName("guess"+localStorage.guessIndex)[0],0);						
					}
				}
			}
			else {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  }});
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
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

