class PageTournamentDisplay {
  constructor(app) {
    this._app = app;
  }

  async show() {
    let html = await fetch("pages/tournamentDisplay.html");
    let htmlContent = "";
    if (html.ok) {
      htmlContent = await html.text();
    }
    this._app.setPageContent(htmlContent);
    let urlParams = new URLSearchParams(window.location.search);
    await database.ref('/tournaments/' + urlParams.get('key')).once('value').then((snapshot) => {
      this.currentTournament = snapshot.val(); //Write databse snapshot in _tournaments object
    });
    document.getElementById("tournamentTitle").innerHTML = this.currentTournament.name;
    let teams = this.currentTournament.teams;
    let teams_count = teams.length;
    let rounds = Math.log(teams_count)/Math.log(2);
    let matches_count = teams_count - 1;
    for(let round_number = 1; round_number <= rounds; round_number++){
      let next_round = round_number + 1;
      let round_html = document.createElement("ul");
      round_html.classList.add("round", "round-" + round_number);
      let spacer = document.createElement("li");
      spacer.classList.add("spacer");
      spacer.innerHTML = "&nbsp;";
      round_html.appendChild(spacer);
      let game_number = 0;
      for(let i = 0; i < teams_count; i+=2){
        let team_1 = document.createElement("li");
        let team_2 = document.createElement("li");
        let game_spacer = document.createElement("li");
        let spacer = document.createElement("li");
        team_1.classList.add("game", "game-top", "game-" + game_number);
        team_2.classList.add("game", "game-bottom", "game-" + game_number);
        game_spacer.classList.add("game", "game-spacer");
        spacer.classList.add("spacer");
        spacer.innerHTML = "&nbsp;";
        team_1.innerHTML = "&nbsp;";
        team_2.innerHTML = "&nbsp;";
        let next_round_matches = document.querySelectorAll(".round.round-" + next_round);
        let corresponding_game = Math.floor(game_number/2);
        let current_game = game_number;
        team_1.onclick = function(){
          if(!team_2.classList.contains("winner")){
            if(document.querySelector(".round-" + round_number + " .game-bottom.game-" + current_game).innerHTML != "&nbsp;"){
              team_1.classList.add("winner");
              if(document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game)){
                if(current_game % 2 == 0){
                  document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game).innerHTML = team_1.innerHTML;
                }
                if(current_game % 2 == 1){
                  document.querySelector(".round-" + next_round + " .game-bottom.game-" + corresponding_game).innerHTML = team_1.innerHTML;
                }
              }
            }
            else{
              alert("Das Team hat keinen Gegner.");
            }
          }
          if(team_2.classList.contains("winner")){
            team_2.classList.remove("winner");
            team_1.classList.add("winner");
            if(document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game)){
              if(current_game % 2 == 0){
                document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game).innerHTML = team_1.innerHTML;
              }
              if(current_game % 2 == 1){
                document.querySelector(".round-" + next_round + " .game-bottom.game-" + corresponding_game).innerHTML = team_1.innerHTML;
              }
            }
          }
        }
        team_2.onclick = function(){
          if(!team_1.classList.contains("winner")){
            if(document.querySelector(".round-" + round_number + " .game-top.game-" + current_game).innerHTML != "&nbsp;"){
              team_2.classList.add("winner");
              if(document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game)){
                if(current_game % 2 == 0){
                  document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game).innerHTML = team_2.innerHTML;
                }
                if(current_game % 2 == 1){
                  document.querySelector(".round-" + next_round + " .game-bottom.game-" + corresponding_game).innerHTML = team_2.innerHTML;
                }
              }
            }
            else{
              alert("Das Team hat keinen Gegner.");
            }
          }
          else{
            team_1.classList.remove("winner");
            team_2.classList.add("winner");
            if(document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game)){
              if(current_game % 2 == 0){
                document.querySelector(".round-" + next_round + " .game-top.game-" + corresponding_game).innerHTML = team_2.innerHTML;
              }
              if(current_game % 2 == 1){
                document.querySelector(".round-" + next_round + " .game-bottom.game-" + corresponding_game).innerHTML = team_2.innerHTML;
              }
            }
          }
        }
        round_html.appendChild(team_1);
        round_html.appendChild(game_spacer);
        round_html.appendChild(team_2);
        round_html.appendChild(spacer);
        game_number++;
      }
      $("#tournament").append(round_html);
      matches_count -= teams_count;
      teams_count /= 2;
    }
    for(let i = 0; i < document.querySelectorAll(".round-1 .game-top").length; i++){
      document.querySelectorAll(".round-1 .game-top")[i].innerHTML = teams[i*2];
    }
    for(let i = 0; i < document.querySelectorAll(".round-1 .game-bottom").length; i++){
      document.querySelectorAll(".round-1 .game-bottom")[i].innerHTML = teams[i*2+1];
    }
  }
}
