class PageHome {
  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("pages/home.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
    new Twitch.Embed("twitch-embed", {
      channel: "wolfl1nk",
      layout: "video",
      theme: "dark"
    });
  }
}
