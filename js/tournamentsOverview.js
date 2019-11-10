class PageTournamentsOverview {
  constructor(app) {
    this._app = app;
  }

  //Default rounter show content from tournamentOverview.html
  async show() {
    let html = await fetch("pages/tournamentsOverview.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    //Click listener for new tournament button
    document.getElementById("btn_newTournament").addEventListener("click", () => {
      location.hash = "/tournaments/new"; //Set hash to /tournaments/new to navigate to new tournament page
    })

    //_tournaments should already be loaded. This is only executed if someone reloads on /tournamentsOverview page
    if(this._tournaments == null) {
      await database.ref('/tournaments/').once('value').then((snapshot) => {
        this._tournaments = snapshot.val(); //Write databse snapshot in _tournaments object
      });
    }

    // Genereate the overview cards
    this.generateTournamentCards();
  }

  //Update the _tournaments array in the background / without showing this pages
  //This helps with quicker page loading because the data can already be fetched while the user is still on the start / welcome page
  async updateTournaments() {
    await database.ref('/tournaments/').once('value').then((snapshot) => {
      this._tournaments = snapshot.val(); //Write databse snapshot in _tournaments object
    });
  }

  //Generate the Tournament Cards from tournaments array
  //Only run once in show() -> Therefore the cards should not be rendered twice
  generateTournamentCards() {
    let content = document.getElementById("content"); // Get the content div
    let colcount = 0; //Count the number of columns already created to know when to start a new row
    let row = document.createElement("div"); // Create first row
    row.classList.add("row", "align-items-center"); //Set row classes
    /*Iterate trough tournaments array
    Due to the unique IDs in Firebase this._tournaments is an Object containing key-value pairs and not an array.
    Therefore we iterate through Object.keys(this._tournaments) and get the value for the current key each time. */
    Object.keys(this._tournaments).forEach((key, index) => {
      let item = this._tournaments[key]; //Get value of current key
      let col = document.createElement("div"); //Create new card (col)
      col.classList.add("col-md-12", "col-lg-4", "colOV"); //Set col classes for bootstrap and own class colOV

      // Create title element and add it to card
      let tournamentTitle = document.createElement("div");
      tournamentTitle.classList.add("title", "text-info");
      tournamentTitle.setAttribute("hidden", "");
      tournamentTitle.innerText = item.name;
      col.appendChild(tournamentTitle);

      // Create logo / image element and add it to card
      let tournamentLogo = document.createElement("img");
      tournamentLogo.classList.add("img_overview", "img-fluid", "rounded");
      tournamentLogo.src = item.logo;
      col.appendChild(tournamentLogo);

      //Set listeners for hovering and touching
      //Event listener "onHover" -> Mouse enters -> Darken + Show tournament name
      col.addEventListener("mouseenter", () => {
        col.childNodes[0].removeAttribute("hidden"); // Show title / name
        col.childNodes[1].classList.add("dark"); // Darken image
      });

      //Same for touch device
      col.addEventListener("touchstart", () => {
        col.childNodes[0].removeAttribute("hidden");
        col.childNodes[1].classList.add("dark");
      });

      //Opposite to above -> brighten + Hide name
      col.addEventListener("mouseleave", () => {
        col.childNodes[0].setAttribute("hidden", "");
        col.childNodes[1].classList.remove("dark");
      });

      //Same for touch device
      col.addEventListener("touchend", () => {
        col.childNodes[0].setAttribute("hidden", "");
        col.childNodes[1].classList.remove("dark");
      });

      //On Click route to Tournament Detail page
      col.addEventListener("click", () => {
        //Display Tournament
        //Pass ID to display the right tournament on next page
        location.href = "?key=" + item.key + "/#/tournaments/showTournament";

      });

      //If the current Row is full (has 3 elements) add it to content and create a new one
      if(colcount == 3) {
        content.appendChild(row);
        row = document.createElement("div"); // Row = new Row
        row.classList.add("row", "align-items-center");
        colcount = 0; // Reset colcount of current row
      }

      row.appendChild(col); //Append current column to row
      colcount++; // Increment colcount

    }); // Endloop of column (1 Database item)

    content.appendChild(row); //Append the last row
  } // End generateTournamentCards()

} // End PageTournamentsOverview class
