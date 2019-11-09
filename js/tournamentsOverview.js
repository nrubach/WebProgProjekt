class PageTournamentsOverview {
  constructor(app) {
    this._app = app;

    //Active tournaments
    //TODO Load array from database
    //imagesrc can be image base64 encoded
  //   this.tournaments = [
  //     {
  //       id: 1,
  //       name: "Overwatch League",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 2,
  //       name: "Contenders",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 3,
  //       name: "Dorfcup",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 4,
  //       name: "Noch Was Turnier",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 5,
  //       name: "DHBW Cup",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 6,
  //       name: "Weltmeisterschaft",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //     {
  //       id: 7,
  //       name: "Weltmeischaft",
  //       imagesrc: "res/sample/owleague.jpg",
  //     },
  //   ]
 }

  //Default rounter show content from tournamentOverview.html
  async show() {
    let html = await fetch("pages/tournamentsOverview.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    //Click listener for new tournament button
    document.getElementById("btn_newTournament").addEventListener("click", () => {
      location.hash = "/tournaments/new";
    })

    if(this._tournaments == null) {
      await database.ref('/tournaments/').once('value').then((snapshot) => {
        this._tournaments = snapshot.val();
      });
    }

    this.generateTournamentCards();
  }

  async updateTournaments() {
    await database.ref('/tournaments/').once('value').then((snapshot) => {
      this._tournaments = snapshot.val();
    });
  }

  //Generate the Tournament Cards from tournaments array
  generateTournamentCards() {
    let content = document.getElementById("content")
    let colcount = 0;
    let row = document.createElement("div");
    row.classList.add("row", "align-items-center");
    //Iterate trough tournaments array
    this._tournaments.forEach((item, index) => {
      let col = document.createElement("div");
      col.classList.add("col-md-12", "col-lg-4", "colOV");

      let tournamentTitle = document.createElement("div");
      tournamentTitle.classList.add("title", "text-info");
      tournamentTitle.setAttribute("hidden", "");
      tournamentTitle.innerText = item.name;
      col.appendChild(tournamentTitle);

      let tournamentLogo = document.createElement("img");
      tournamentLogo.classList.add("img_overview", "img-fluid", "rounded");
      tournamentLogo.src = item.logo;
      col.appendChild(tournamentLogo);

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
        location.href = "?id=" + item.id + "/#/tournaments/showTournament";

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
