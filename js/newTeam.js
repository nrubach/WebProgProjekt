class PageNewTeam {

  faultyElement;

  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("pages/newTeam.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    this.alertBox = $("#alertBox");
    alertBox.hidden = true;
    this.players = $("#players");
    console.log("PageNewTeam created");
    $("#addNewPlayer").on("click", this.setAlertMessage());
  }

  setAlertMessage() {
    $("#faultyElement").innerHTML = this.faultyElement;
    $("#alertBox").hidden = false;
    firebase.database().ref('teams/' + "contenders").set({
      name: "Contenders Europe"
    });
  }
}