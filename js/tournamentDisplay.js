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
    let matches = this.currentTournament.matches;
    console.log("Matches.length = " + Object.keys(matches).length);
    let rounds = Math.log(Object.keys(matches).length) / Math.log(2);
    console.log("rounds = " + rounds);
    //this.showMatch(matches["0"]).appendTo("#tournament");
    for(let i = 0; i <= rounds; i++){
      let round = document.createElement("ul");
      round.classList.add("round","round-" + i);
      round.innerHTML = '<li class="spacer"></li>';
      Object.keys(matches).forEach((element) => {
        round.innerHTML += (this.showMatch(matches[element]));
      });
      $("#tournament").append(round);
    }
  }

  showMatch(match) {
    let html = '<li class="game game-top">' + match.team_1 + '<span></span></li>' +
    '<li class="game game-spacer">&nbsp;</li>' +
    '<li class="game game-bottom">' + match.team_2 + '<span></span></li>' +
    '<li class="spacer"></li>';
    return html;
  }
}
