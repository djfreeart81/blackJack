import { Ui } from "./Ui.js";

export class Game {
  constructor(players) {
    this.players = players;
    this.ui = new Ui();
  }

  initializeGame() {
    this.players.forEach((player) => this.drawPlayer(player));
    this.drawBank();
    this.hideSplit();
    console.log("game initialized");
  }

  drawPlayer(player) {
    let $player = document.getElementById("player" + player.id);
    let $playerName = document.createElement("div");
    $playerName.id = `player${player.id}-name`;
    $playerName.innerHTML = player.name;
    $player.appendChild($playerName);
    console.log(JSON.stringify($playerName));

    let $playerMoney = document.createElement("div");
    $playerMoney.id = `player${player.id}-money`;
    $playerMoney.innerHTML = player.money + " $";
    $player.appendChild($playerMoney);

    let $playerCards = document.createElement("div");
    $playerCards.id = `player${player.id}-cards`;
    $player.appendChild($playerCards);
  }

  drawBank() {
    return;
  }

  hideSplit() {
    let elements = document.getElementsByClassName("split");
    for (let el of elements) {
      el.style.display = "none";
    }
  }

  endGame() {
    this.players.forEach((player) => {
      this.ui.disableButtonById(
        player,
        ["bet", "double", "split", "hit"],
        true
      );
    });
  }
}
