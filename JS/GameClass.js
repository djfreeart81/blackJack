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
    document.getElementById("playerNameInput1").defaultValue =
      localStorage.getItem("player1") || "Input your name";
    document.getElementById("playerNameInput2").defaultValue =
      localStorage.getItem("player2") || "Input your name";
    document.getElementById("playerNameInput3").defaultValue =
      localStorage.getItem("player3") || "Input your name";

    //add listener to modal inside button new game
    let btnOk = document.getElementById("modal-new-game-ok");
    btnOk.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      for (let i = 1; i < this.players.length + 1; i++) {
        let name = document.getElementById(`playerNameInput${i}`).value;
        this.players[i - 1].setName(name);
        localStorage.setItem(`player${i}`, name);
      }
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
