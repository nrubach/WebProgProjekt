let newTeamContext;

class PageNewTeam {

  static id = 0;
  faultyElement;

  constructor(app) {
    this._app = app;
    newTeamContext = this;
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
    $("#addNewPlayer").on("click", this.submitPlayer);

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
      alertBox.hidden = false;
      $("#faultyElement").html("Name");
      return;
    }
    if ($("#newPlayerSR").val() < 0 || $("#newPlayerSR").val() > 5000) {
      alertBox.hidden = false;
      $("#faultyElement").html("Skill Rating");
      return;
    }

    database.ref('teams/' + "players/" + PageNewTeam.id).set({
      name: $("#newPlayerName").val(),
      sr: $("#newPlayerSR").val(),
      captain: $("#newPlayerCaptain").val()
    });
    console.log("Written to database");
    PageNewTeam.id++;

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
