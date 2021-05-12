import { Ui } from "./Ui.js";
import { main } from "./game.js";

export class Game {
  constructor(players) {
    this.players = players;
    this.ui = new Ui();
  }

  initializeGame() {
    this.ui.addInfoMessage("\nClick on New Game to start");
    //add listener to modal inside button new game
    let btnOk = document.getElementById("modal-new-game-ok");
    btnOk.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.players[0].setName(
        document.getElementById("playerNameInput1").value
      );
      this.players[1].name = document.getElementById("playerNameInput2").value;
      main();
    });

    this.players.forEach((player) => {
      this.drawPlayer(player);
      this.ui.disableButtonById(player, ["double", "split", "hit"], true);
    });
    this.drawBank();
    this.ui.hideClass("split", true);
    this.ui.hideClass("progress", true);

    console.log(
      `game initialized with players ${JSON.stringify(this.players)}`
    );
  }

  drawPlayer(player) {
    let $player = document.getElementById("player" + player.id);
    // let $playerName = document.createElement("div");
    // $playerName.id = `player${player.id}-name`;
    // $playerName.innerHTML = player.name;
    // $player.appendChild($playerName);
    // console.log(JSON.stringify($playerName));

    // let $playerMoney = document.createElement("div");
    // $playerMoney.id = `player${player.id}-money`;
    // $playerMoney.innerHTML = player.money + " $";
    // $player.appendChild($playerMoney);

    let $playerCards = document.createElement("div");
    $playerCards.id = `player${player.id}-cards`;
    $player.appendChild($playerCards);
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
