class PageTeams {
  constructor(app) {
    this._app = app;
  }

  async show() { //Called by App() router
    let html = await fetch("pages/teams.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent); //Set index container content

    //Click listener for new team button
    document.getElementById("btn_newTeam").addEventListener("click", () => {
      location.hash = "/teams/new"; //Redirect to #/teams/new page
    });

    //_teams should already be loaded. This is only executed if someone reloads on /teams page
    if(this._teams == null) {
      await database.ref('/teams/').once('value').then((snapshot) => {
        this._teams = snapshot.val(); //get /teams/ Object from databse
      });
    }

    this.generateTeamCards();
  }

  //Update the _teams array in the background / without showing this pages
  //This helps with quicker page loading because the data can already be fetched while the user is still on the start / welcome page
  async updateTeams() {
    await database.ref('/teams/').once('value').then((snapshot) => {
      this._teams = snapshot.val(); //get /teams/ Object from databse
    });
  }

  //Generate the Team Cards from teams array
  generateTeamCards() {
    let content = document.getElementById("content")
    let colcount = 0;
    let row = document.createElement("div");
    row.classList.add("row", "align-items-center");
    /*Iterate trough _teams array
    Due to the unique IDs in Firebase this._teams is an Object containing key-value pairs and not an array.
    Therefore we iterate through Object.keys(this._teams) and get the value for the current key each time. */
    Object.keys(this._teams).forEach((key) => {
      let item = this._teams[key]; //Get value for current key out of database snapshot
      let col = document.createElement("div"); //Create card div
      col.classList.add("col-md-12", "col-lg-4", "colOV", "flip-container"); //Set bootstrap classes, own styling and flip-container for animation

      //Outer frame which will be flipped
      let flipper = document.createElement("div");
      flipper.classList.add("flipper");
      col.appendChild(flipper);

      //Spacer to make flipper and col the correct height
      let spacer = document.createElement("img");
      spacer.classList.add("spacer", "img_overview", "img-fluid", "rounded");
      spacer.src = item.logo;
      col.appendChild(spacer);

      //Front container
      let front = document.createElement("div");
      front.classList.add("front");

      //Team name in front container
      let teamName = document.createElement("div");
      teamName.classList.add("title", "text-info");
      teamName.setAttribute("hidden", "");
      teamName.innerText = item.name;
      front.appendChild(teamName);

      //Team logo in front container
      let teamLogo = document.createElement("img");
      teamLogo.classList.add("img_overview", "img-fluid", "rounded");
      teamLogo.src = item.logo; //item.logo is a base64 encoded image saved as string in the databse. It can be directly used as img src
      front.appendChild(teamLogo);
      flipper.appendChild(front);

      //Back container
      let back = document.createElement("div");
      back.classList.add("back");

      //Content of back container
      back.innerHTML = "<h3 class='text-info teamName'>" + item.name + "</h3>Durchschnittliches skill rating - <span class='text-warning'>" + item.avgRating + "</span><h5 class='text-info playersTitle'>Spieler</h5>";
      //Generate each player from players object
      Object.keys(item.players).forEach((playerKey) => {
        let playerItem = item.players[playerKey];
        let playerDiv = document.createElement("div");
        let captain = "";
        if(playerItem.captain == "Yes") { //If player is captain add yellow prefix
          captain = "<span class='text-warning'>[Captain] </span> ";
        }
        playerDiv.innerHTML = captain + playerItem.name + " - <span class='text-warning'>" + playerItem.sr + "</span> SR";
        back.appendChild(playerDiv);
      });
      flipper.appendChild(back);

      //Listener for flip animation
      col.addEventListener("click", () => {
        col.classList.toggle("flip");
        back.classList.toggle("onTop"); //Show active / flipped card above the others
        col.classList.toggle("onTop");
        //console.log("Details zeigen für team " + item.key);
      });

      //Event listener "onHover" -> Mouse enters -> Blurr + Show tournament name
      col.addEventListener("mouseenter", () => {
        teamName.removeAttribute("hidden"); //Show team name
        teamLogo.classList.add("dark"); //Make image darker
      });

      //Same for touch device
      col.addEventListener("touchstart", () => {
        teamName.removeAttribute("hidden");
        teamLogo.classList.add("dark");
      });

      //Opposite to above -> Brighten + Hide name
      col.addEventListener("mouseleave", () => {
        teamName.setAttribute("hidden", ""); //Hide Team name
        teamLogo.classList.remove("dark"); //Brighten image
        col.classList.remove("flip"); //Unflip card when mouse leaves card --> Only one card can be flipped at once
        back.classList.remove("onTop");
        col.classList.remove("onTop");
      });

      //Same for touch device
      col.addEventListener("touchend", () => {
        teamName.setAttribute("hidden", "");
        teamLogo.classList.remove("dark");
        back.classList.remove("onTop");
        col.classList.remove("onTop");
      });


      //If the current Row is full add it to content and create a new one
      if(colcount == 3) {
        content.appendChild(row);
        row = document.createElement("div");
        row.classList.add("row");
        colcount = 0; //Reset colcount
      }

      //Append current column to row
      row.appendChild(col);
      colcount++;

    }); //End loop for card / one snapshot item

    //Append the last row
    content.appendChild(row);
  } //End of generateTeamCards()

} //End of PageTeams()
