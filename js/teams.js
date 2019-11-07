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
      col.classList.add("col-md-12", "col-lg-4", "colOV");
      col.innerHTML = "<div class=\"title\" hidden>" + item.name + "</div><img class=\"img_overview img-fluid rounded\" src=\"" + item.logo + "\">";

      //Event listener "onHover" -> Mouse enters -> Blurr + Show tournament name
      col.addEventListener("mouseenter", () => {
        col.childNodes[0].removeAttribute("hidden");
        col.childNodes[1].classList.add("dark");
      });

      //Same for touch device
      col.addEventListener("touchstart", () => {
        col.childNodes[0].removeAttribute("hidden");
        col.childNodes[1].classList.add("dark");
      });

      //Opposite to above -> Unblurr + Hide name
      col.addEventListener("mouseleave", () => {
        col.childNodes[0].setAttribute("hidden", "");
        col.childNodes[1].classList.remove("dark");
      });

      //Same for touch device
      col.addEventListener("touchend", () => {
        col.childNodes[0].setAttribute("hidden", "");
        col.childNodes[1].classList.remove("dark");
      });

      //On Click route to Tournament Detail page
      col.addEventListener("click", () => {
        //Display Tournament
        //Pass ID to display the right tournament on next page
        //location.href = "?id=" + item.id + "/#/teams/showTeam";
        console.log("Details zeigen für team " + item.key);

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
