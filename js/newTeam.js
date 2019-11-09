let newTeamContext;


class PageNewTeam {

  playerObjects;

  constructor(app) {
    this._app = app;
    newTeamContext = this;
    this.playerObjects = new Array();
  }

  async show() {
    let html = await fetch("pages/newTeam.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);

    $("#alertBox").hide();
    this.players = $("#players");
    $("#addNewPlayer").on("click", this.submitPlayer);
    $("#submitTeam").on("click", this.submitTeam);

    // Setup the dnd listeners.
    this.dropZone = document.getElementById('tvarea');
    this.dropZone.addEventListener('dragover', this.handleDragOver, false);
    this.dropZone.addEventListener('drop', this.handleFileSelect, false);

    $("#inputfile").change(function(){
        newTeamContext.readURL(this);
    });
  }

  submitPlayer() {
    if ($("#newPlayerName").val().length < 2) {
      $("#alertBox").show();
      $("#faultyElement").html("Gamertag");
      return;
    }
    if ($("#newPlayerSR").val() < 0 || $("#newPlayerSR").val() > 5000) {
      $("#alertBox").show();
      $("#faultyElement").html("Skill Rating");
      return;
    }

    // Add objects of player to playerobjects
    newTeamContext.playerObjects.push({
      name: $("#newPlayerName").val(),
      sr: $("#newPlayerSR").val(),
      captain: $("#newPlayerCaptain").val()
    });

    console.log(newTeamContext.playerObjects);

    // Generate card for saved player
    let player = $('<div class="card col-sm-4">' +
    '<div class="card-body">' +
        '<div class="row">' +
            '<div class="col-lg">' +
              '<span>Gamertag: </span>' +
            '</div>' +
            '<div class="col-lg">' +
            '<b>' + $("#newPlayerName").val() +'</b>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
              '<div class="col-lg">' +
                  '<span>Skill rating: </span>' +
              '</div>' +
              '<div class="col-lg">' +
                  '<b>' + $("#newPlayerSR").val() + '</b>' +
              '</div>' +
          '</div>' +
          '<div class="row">' +
              '<div class="col-lg">' +
                  '<span>Captain? </span>' +
              '</div>' +
              '<div class="col-lg">' +
                  '<b>' + $("#newPlayerCaptain").val() + '</b>' +
              '</div>' +
          '</div>' +
      '</div>' +
  '</div>').appendTo("#players");

    // reset newPlayer Card
    $("#newPlayerName").val("")
    $("#newPlayerSR").val("")
    $("#newPlayerCaptain").val("No")
  }

  submitTeam() {
    if ($("#teamName").val() == "") {
      $("#alertBox").show();
      $("#faultyElement").html("Team name");
    } else if (newTeamContext.playerObjects.length < 2) {
      $("#alertBox").show();
      $("#faultyElement").html("The number of players");
    } else {
      let numberOfPlayers = 0;
      let avgSr = 0;
      newTeamContext.playerObjects.forEach(player => {
        numberOfPlayers++;
        console.log(player.sr);
        avgSr += parseInt(player.sr, 10);
      });
      avgSr = avgSr / numberOfPlayers;
      let teamref = database.ref('teams/').push({
        avgRating: Math.round(avgSr),
        name: $("#teamName").val()
      });
      newTeamContext.playerObjects.forEach(player => {
        database.ref('teams/' + teamref.key).update({
          id: teamref.key
        });
      });
      newTeamContext.playerObjects.forEach(player => {
        database.ref('teams/' + teamref.key +'/players').push({
          name: player.name,
          sr: player.sr,
          captain: player.captain
        });
      });
      console.log("Written to database");
    }
  }

  handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var reader = new FileReader();
        var inputFile = evt.dataTransfer.files[0];
        reader.onload = function(e){
            $('#thumbnail').attr('src', e.target.result);
            $('#thumbnail').attr('style', "display=block;");
            document.getElementById('inputfilelabel').innerHTML = inputFile.name;
        }
        document.querySelector('#inputfile').files = evt.dataTransfer.files;
        reader.readAsDataURL(inputFile);
    }
    handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    readURL(input){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e){
                $('#thumbnail').attr('src', e.target.result);
                $('#thumbnail').attr('style', "display=block;");
                document.getElementById('inputfilelabel').innerHTML = input.files[0].name;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}
