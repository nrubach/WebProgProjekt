let newTournamentContext;

class PageNewTournament {
  constructor(app) {
    this._app = app;
    newTournamentContext = this;
    this.participatingTeams = new Array();
    this.allTeams = new Array();
  }

  async show() {
    let html = await fetch("pages/newTournament.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    $("#alertBox").hide();
    
    await this.loadTeamsToSelect();

    $("#submitTournament").on("click", this.submitTournament);

    $("#teamSelector").change(() => {
      if($("#teamSelector").val() != null) {
        newTournamentContext.participatingTeams.push(
          newTournamentContext.allTeams[$("#teamSelector").val()]
        );
        let deleteButton = "<button id='" + newTournamentContext.allTeams[$("#teamSelector").val()].key + "'>Delete</button>";
        $("#teamList").append("<li class='list-group-item'>" + newTournamentContext.allTeams[$("#teamSelector").val()].name + " - " + newTournamentContext.allTeams[$("#teamSelector").val()].sr + " SR average</li>");
        $("#teamSelector option[value|='" + $("#teamSelector").val() + "']").attr("disabled", "");
      }
    });

  }

  async loadTeamsToSelect() {
    if(this._teams == null) {
      await database.ref('/teams/').once('value').then((snapshot) => {
        this._teams = snapshot.val(); // Get /teams/ Object from database
      });
    }

    let number = 0;
    Object.keys(this._teams).forEach((key) => {
      let item = this._teams[key]; // Get value for current key out of database snapshot
      $("#teamSelector").append('<option value="' + number + '">' + item.name + ' - ' + item.avgRating + ' SR average</option>');
      newTournamentContext.allTeams.push({
        key: item.key,
        name: item.name,
        sr: item.avgRating
      });
      number = number+1;
    });
  }

  async submitTournament() {
    if ($("#tournamentName").val() == "") {
      $("#faultyElement").html("The tournament name");
      $("#alertBox").show();
      setTimeout(function() { $("#alertBox").hide(); }, 5000);
    } else if (newTournamentContext.participatingTeams.length != 8) {
      $("#faultyElement").html("There need to be exactly 8 teams. The number of teams");
      $("#alertBox").show();
      setTimeout(function() { $("#alertBox").hide(); }, 5000);
    } else {
      let numberOfPlayers = 0;
      let avgSr = 0;
      newTeamContext.playerObjects.forEach(player => {
        numberOfPlayers++;
        console.log(player.sr);
        avgSr += parseInt(player.sr, 10);
      });
      avgSr = avgSr / numberOfPlayers;
      let tournamentRef = database.ref('tournaments/').push({
        avgRating: Math.round(avgSr),
        name: $("#teamName").val()
      });
      if (newTournamentContext.imageData == null) {
        database.ref('tournaments/' + tournamentRef.key).update({
          logo: ""
        });      
      } else {
        database.ref('teams/' + tournamentRef.key).update({
          logo: newTournamentContext.imageData
        });
      }
      newTeamContext.participatingTeams.forEach(team => {
        database.ref('tournament/' + teamref.key +'/teams').push({
          name: team.name,
          sr: team.sr
        });
      });
      console.log("Written to database");
      await newTeamContext._app._instances["/tournaments"].updateTournaments();
      location.hash = "/tournaments";
    }
  }

  readImage(input){
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e){
        var i = new Image();
        i.src = e.target.result;
        i.onload = function(){
          $('#thumbnail').attr('src', e.target.result);
          let width = i.width;
          let height = i.height;
          console.log(width);
          console.log(height);
          console.log(width/height);
          let ratioCheck = (width/height == 16/9);
          if(ratioCheck) {
            newTeamContext.imageData = e.target.result;
          } else {
            $("#faultyElement").html("Image ratio has to be 16:9. Current image");
            $("#alertBox").show();
            setTimeout(function() { $("#alertBox").hide(); }, 10000);
            $('#thumbnail').attr('src', '');
            $('#inputfile').val(null);
          }
        };
        $('#thumbnail').attr('style', "display=block;");
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
}
