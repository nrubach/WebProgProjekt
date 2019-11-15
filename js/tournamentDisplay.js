class PageTournamentDisplay {
  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("pages/tournamentDisplay.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
    let urlParams = new URLSearchParams(window.location.search);
    await database.ref('/tournaments/' + urlParams.get('key')).once('value').then((snapshot) => {
      this.currentTournament = snapshot.val(); //Write databse snapshot in _tournaments object
    });
    document.getElementById("tournamentTitle").innerHTML = this.currentTournament.name;
    let tournament = this.currentTournament.tournament;
    console.log("Matches.length = " + Object.keys(tournament.round_0).length);
    let round1 = document.createElement("ul");
    let round_data = tournament.round_0;
    round1.classList.add("round","round-0");
    let spacer = document.createElement("li");
    spacer.classList.add("spacer");
    spacer.innerHTML = "&nbsp;";
    round1.appendChild(spacer);
    Object.keys(round_data).forEach((element) => {
      let match = round_data[element];
      let team_1 = document.createElement("li");
      let team_2 = document.createElement("li");
      let game_spacer = document.createElement("li");
      let spacer = document.createElement("li");
      team_1.classList.add("game", "game-top");
      team_2.classList.add("game", "game-bottom");
      game_spacer.classList.add("game", "game-spacer");
      spacer.classList.add("spacer");
      spacer.innerHTML = "&nbsp;";
      game_spacer.innerHTML = "&nbsp;";
      team_1.innerHTML = match.team_1;
      team_2.innerHTML = match.team_2;
      if(match.winner == 1){
        team_1.classList.add("winner");
      }
      if(match.winner == 2){
        team_2.classList.add("winner");
      }
      round1.appendChild(team_1);
      round1.appendChild(game_spacer);
      round1.appendChild(team_2);
      round1.appendChild(spacer);
    });
    $("#tournament").append(round1);
  }
}
