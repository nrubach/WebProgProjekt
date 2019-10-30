class App {
  constructor(pageList) {
    this._pages = pageList;

    //Load homepage on initial app creation
    this._handleRoute();
  }

  run() {
    //Listen for Hashchange --> Load the targeted page
    window.addEventListener("hashchange", () => {
      this._handleRoute();
    });
  }

  _handleRoute() {
    //remove # from location.hash
    let pageUrl = location.hash.slice(1);

    /** Find pageUrl in pages array **/
    let page;

    /** Old algorithm ... kept for backup **/
    // this._pages.forEach((item, index) => {
    //   if(item.url == pageUrl) {
    //     page = item;
    //   }
    // })

    let pageFound = this._pages.some(function(item, index) {
      if(item.url == pageUrl) {
        page = item;
        return true;
      }
    });

    if(pageFound != true) {
      // Alert user page wasn't found
      page = this._pages[0];
    }

    // let page = this._pages.find(p => matches = pageUrl.match(p.url));
    //Create new currentPageObj from selected class
    this.currentPageObj = new page.class(this);
    //Show content in content view
    this.currentPageObj.show();
  }

  //called by PageClass.show();
  //set new content in content view
  setPageContent(htmlContent) {
    $("#content").html(htmlContent);
  }
}
