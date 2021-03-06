import { Ui } from "./Ui.js";
import { main } from "./game.js";

export class Game {
  constructor(players) {
    this.players = players;
    this.ui = new Ui();
    this.bet = 0;
  }

  initializeGame() {
    this.ui.addInfoMessage("Click on New Game to start.");
    document.getElementById("playerNameInput1").textContent =
      localStorage.getItem("player1") || "Input your name";
    document.getElementById("playerNameInput2").textContent =
      localStorage.getItem("player2") || "Input your name";
    document.getElementById("playerNameInput3").textContent =
      localStorage.getItem("player3") || "Input your name";

    //add listener to modal inside button new game
    let btnOk = document.getElementById("modal-new-game-ok");
    btnOk.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let name1 = document.getElementById("playerNameInput1").value;
      let name2 = document.getElementById("playerNameInput2").value;
      let name3 = document.getElementById("playerNameInput3").value;
      this.players[0].setName(name1);
      this.players[1].setName(name2);
      this.players[2].setName(name3);
      localStorage.setItem("player1", name1);
      localStorage.setItem("player2", name2);
      localStorage.setItem("player3", name3);
      this.bet = +document.getElementById("betRange").value;
      main();
    });

    this.players.forEach((player) => {
      this.ui.drawPlayer(player);
      this.ui.disableButtonById(player, ["double", "split", "hit"], true);
    });
    this.drawBank();
    this.ui.hideClass("split", true);
    this.ui.hideClass("progress", true);

    console.log(
      `game initialized with players ${JSON.stringify(this.players)}`
    );
  }

  drawBank() {
    return;
  }

  endGame() {
    this.players.forEach((player) => {
      this.ui.disableButtonById(
        player,
        ["bet", "double", "split", "hit", "done"],
        true
      );
    });
  }
}
