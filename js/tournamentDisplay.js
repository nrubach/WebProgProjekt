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
  }

  showTournament(id) {
    this.currentTournament = id;
  }
}
