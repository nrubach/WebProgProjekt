class App {
  constructor(pageList) {
    this._pages = pageList;
    this._instances = [];

    //For performance reasons create an instance of each existing class / page which will be used for the whole session
    this._pages.forEach((page, index) => {
      this._instances[page.url] = new page.class(this);
    });

    //Fetch data from Firebase for quicker page loading later
    this._instances["/tournaments"].updateTournaments();
    this._instances["/teams"].updateTeams();

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

    //If there is no hash use "/" to get to the homepage
    if(pageUrl == "") {
      pageUrl = "/";
    }

    /** Find pageUrl in pages array **/
    let page;

    /** Old algorithm ... kept for backup **/
    // this._pages.forEach((item, index) => {
    //   if(item.url == pageUrl) {
    //     page = item;
    //   }
    // })

    /** This search algorithm iterates trough pages until it finds an exact match for pageUrl.
      Once it finds it the page object is set to that matched item and the some() function returns true.
      If nothing is matched some() returns false.
      In comparison to the example .match() algorithm this method only matches exact items and ends once it finds a valid page
    **/
    let pageFound = this._pages.some((item, index) => {
      if(item.url == pageUrl) {
        page = item;
        return true;
      }
    });

    // If .some() didn't get a hit -> redirect to 404 Page
    if(pageFound != true) {
      // SHOW 404 if page wasn't found
      page = this._pages[0];
    }

    // let page = this._pages.find(p => matches = pageUrl.match(p.url));
    //Create new currentPageObj from selected class
    this.currentPageObj = this._instances[page.url];
    //Show content in content view
    this.currentPageObj.show();
  }

  //called by PageClass.show();
  //set new content in content view
  setPageContent(htmlContent) {
    $("#content").html(htmlContent);
  }
}
