class PageNewTeam {

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
    $("#addNewPlayer").on("click", this.setAlertMessage("Nico"));
  }

  submitNewPlayer() {
    console.log(this);
    this.setAlertMessage("Nico");
  }

  setAlertMessage(faultyElementText) {
    db = new Database();
    $("#faultyElement").innerHTML = faultyElementText;
    $("#alertBox").hidden = false;
    Database.database.ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
}