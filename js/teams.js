class PageTeams {
  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("pages/teams.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    //Click listener for new tournament button
    document.getElementById("btn_newTeam").addEventListener("click", () => {
      location.hash = "/teams/new";
    });

    if(this._teams == null) {
      await database.ref('/teams/').once('value').then((snapshot) => {
        this._teams = snapshot.val();
      });
    }

    this.generateTeamCards();
  }

  async updateTeams() {
    await database.ref('/teams/').once('value').then((snapshot) => {
      this._teams = snapshot.val();
    });
  }
  //Generate the Tournament Cards from tournaments array
  generateTeamCards() {
    let content = document.getElementById("content")
    let colcount = 0;
    let row = document.createElement("div");
    row.classList.add("row", "align-items-center");
    //Iterate trough tournaments array
    this._teams.forEach((item, index) => {
      let col = document.createElement("div");
      col.classList.add("col-md-12", "col-lg-4", "colOV", "flip-container");

      let flipper = document.createElement("div");
      flipper.classList.add("flipper");
      col.appendChild(flipper);

      let spacer = document.createElement("img");
      spacer.classList.add("spacer", "img_overview", "img-fluid", "rounded");
      spacer.src = item.logo;
      col.appendChild(spacer);

      let front = document.createElement("div");
      front.classList.add("front");

      let teamName = document.createElement("div");
      teamName.classList.add("title", "text-info");
      teamName.setAttribute("hidden", "");
      teamName.innerText = item.name;
      front.appendChild(teamName);

      let teamLogo = document.createElement("img");
      teamLogo.classList.add("img_overview", "img-fluid", "rounded");
      teamLogo.src = item.logo;
      front.appendChild(teamLogo);
      flipper.appendChild(front);

      let back = document.createElement("div");
      back.classList.add("back");
      back.innerHTML = "<h3 class='text-info teamName'>" + item.name + "</h3>Average skill rating - <span class='text-warning'>" + item.avgRating + "</span><h5 class='text-info playersTitle'>Players</h5>";
      item.players.forEach((playerItem, playerIndex) => {
        let playerDiv = document.createElement("div");
        let captain = "";
        if(playerItem.captain == "Yes") {
          captain = "<span class='text-warning'>Captain:</span> ";
        }
        playerDiv.innerHTML = captain + playerItem.name + " - <span class='text-warning'>" + playerItem.sr + "</span> SR";
        back.appendChild(playerDiv);
      });
      flipper.appendChild(back);

      //Listener for flip animation
      col.addEventListener("click", () => {
        col.classList.toggle("flip");
        back.classList.toggle("onTop");
        col.classList.toggle("onTop");
        //Display Tournament
        //Pass ID to display the right tournament on next page
        //location.href = "?id=" + item.id + "/#/teams/showTeam";
        console.log("Details zeigen für team " + item.key);
      });

      //Event listener "onHover" -> Mouse enters -> Blurr + Show tournament name
      col.addEventListener("mouseenter", () => {
        teamName.removeAttribute("hidden");
        teamLogo.classList.add("dark");
      });

      //Same for touch device
      col.addEventListener("touchstart", () => {
        teamName.removeAttribute("hidden");
        teamLogo.classList.add("dark");
      });

      //Opposite to above -> Unblurr + Hide name
      col.addEventListener("mouseleave", () => {
        teamName.setAttribute("hidden", "");
        teamLogo.classList.remove("dark");
      });

      //Same for touch device
      col.addEventListener("touchend", () => {
        teamName.setAttribute("hidden", "");
        teamLogo.classList.remove("dark");
      });


      //If the current Row is full add it to content and create a new one
      if(colcount >= 3) {
        content.appendChild(row);
        row = document.createElement("div");
        row.classList.add("row");
        colcount = 0;
      }

      //Append current column to row
      row.appendChild(col);
      colcount++;

    });

    //Append the last row
    content.appendChild(row);
  }

}
