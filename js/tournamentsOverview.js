class PageTournamentsOverview {
  constructor(app) {
    this._app = app;
    this.tournaments = [
      {
        id: 1,
        name: "Overwatch League",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 2,
        name: "Contenders",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 3,
        name: "Dorfcup",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 4,
        name: "Noch Was Turnier",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 5,
        name: "DHBW Cup",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 6,
        name: "Weltmeisterschaft",
        imagesrc: "res/sample/owleague.jpg",
      },
      {
        id: 7,
        name: "Weltmeischaft",
        imagesrc: "res/sample/owleague.jpg",
      },
    ]
  }

  async show() {
    let html = await fetch("pages/tournamentsOverview.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
    this.generateTournamentCards();
  }

  generateTournamentCards() {
    let content = document.getElementById("content")
    let colcount = 0;
    let row = document.createElement("div");
    row.classList.add("row");
    this.tournaments.forEach((item, index) => {
      let col = document.createElement("div");
      col.classList.add("col-md-12", "col-lg-4", "colOV");
      col.innerHTML = "<div class=\"title\" hidden>" + item.name + "</div><img class=\"img_overview img-fluid rounded\" src=\"" + item.imagesrc + "\">";

      col.addEventListener("mouseenter", () => {
        col.childNodes[0].removeAttribute("hidden");
        col.childNodes[1].classList.add("blurred");
      });

      col.addEventListener("mouseleave", () => {
        col.childNodes[0].setAttribute("hidden", "");
        col.childNodes[1].classList.remove("blurred");
      });

      col.addEventListener("click", () => {
        //Display Tournament
        location.href = "?id=" + item.id + "/#/tournaments/showTournament";

      });

      if(colcount >= 3) {
        content.appendChild(row);
        row = document.createElement("div");
        row.classList.add("row");
        colcount = 0;
      }

      row.appendChild(col);
      colcount++;

    });
    content.appendChild(row);
  }


}
