class PageNewTeam {

  constructor(app) {
    this._app = app;
    this.alertBox = document.getElementById("alertBox");
    this.players = document.getElementById("players");
    console.log("PageNewTeam created");
    document.getElementById("addNewPlayer").addEventListener("click", submitNewPlayer);
  }

  async show() {
    let html = await fetch("pages/newTeam.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
  }

  submitNewPlayer() {
    console.log("hello");
  }
}
