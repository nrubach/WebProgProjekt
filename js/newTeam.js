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
  }
}
