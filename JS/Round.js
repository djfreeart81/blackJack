import { Bank } from "./Bank.js";
import { CardDeck } from "./CardDeck.js";
import { main } from "./game.js";

export class Round {
  constructor(game, players, cardDeckSize) {
    this.players = players;
    this.bank = new Bank();
    this.cardDeck = new CardDeck(cardDeckSize);
    this.game = game;
    this.BET = 5; // default bet
  }

  initializeRound() {
    // Create EventListener
    document.getElementById("new-round").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      main();
    });
    this.players.forEach((player) => {
      if (document.getElementById(`player${player.id}-hit`)) {
        document
          .getElementById(`player${player.id}-hit`)
          .addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.addNewCard(player);
            this.game.ui.disableButtonById(player, ["double"], true);
          });
      }
      if (document.getElementById(`player${player.id}-bet`)) {
        document
          .getElementById(`player${player.id}-bet`)
          .addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            player.bet = player.bet || this.BET;
            player.betMoney(player.bet);
            player.status.hasBet = true;
            this.game.ui.disableButtonById(player, ["bet"], true);
          });
      }
      if (document.getElementById(`player${player.id}-double`)) {
        document
          .getElementById(`player${player.id}-double`)
          .addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            player.betMoney(player.bet);
            player.bet += player.bet;
            this.game.ui.disableButtonById(
              player,
              ["hit", "double", "done"],
              true
            );
            this.addNewCard(player);
            player.status.isDone = true;
          });
      }
      if (document.getElementById(`player${player.id}-split`)) {
        document
          .getElementById(`player${player.id}-split`)
          .addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            //TODO: implement split logic: create 2 hands: with 2 sets of buttons or same buttons but for each hand)
            this.game.ui.hideButtonById(`player${player.id}-split`, true);
          });
      }
      if (document.getElementById(`player${player.id}-done`)) {
        document
          .getElementById(`player${player.id}-done`)
          .addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.game.ui.disableButtonById(
              player,
              ["hit", "double", "done", "bet"],
              true
            );
            player.status.isDone = true;
          });
      }
      // initialize players
      player.status.isDone = false;
      player.status.hasBet = false;
      player.status.isPlaying = true;
      this.clearCards();
      document.getElementById(`player${player.getId()}-name`).innerHTML =
        player.getName();
      document.getElementById(`player${player.getId()}-money`).innerHTML =
        player.getMoney() + " $";
      player.setPlayerBorderRed(false);
    });
    let elementsNewCard = document.getElementsByClassName("BJ-btn-hit");
    for (let el of elementsNewCard) {
      el.disabled = true;
    }
    let elementsBet = document.getElementsByClassName("BJ-btn-bet");
    for (let el of elementsBet) {
      el.disabled = false;
    }
    let elementsDouble = document.getElementsByClassName("BJ-btn-double");
    for (let el of elementsDouble) {
      el.disabled = true;
    }
    let elementsSplit = document.getElementsByClassName("BJ-btn-split");
    for (let el of elementsSplit) {
      el.disabled = true;
    }
    let elementsDone = document.getElementsByClassName("BJ-btn-done");
    for (let el of elementsDone) {
      el.disabled = false;
    }
    console.log(`round initialized`);
  }

  drawPlayerCards(player) {
    if (document.getElementById(`player${player.getId()}-cards`)) {
      document.getElementById(`player${player.getId()}-cards`).innerHTML =
        player.cards.reduce((acc, i) => acc + i.image, "");
      document.getElementById(`player${player.getId()}-score`).innerHTML =
        "score: " + player.calculateScore();
    }
  }

  drawBankCards() {
    document.getElementById("bank-cards").innerHTML = this.bank.cards.reduce(
      (acc, i) => acc + i.image,
      ""
    );
    document.getElementById(`bank-score`).innerHTML =
      "score: " + this.bank.calculateScore();
  }

  addNewCard(player) {
    let newCard = this.cardDeck.getCard();
    player.cards.push(newCard);
    this.drawPlayerCards(player);
    console.log(
      `card added for player${player.getId()} and value is ${newCard.value}`
    );
    if (player.getCardValue() > 21) {
      this.players.pop(player);
      this.endRoundPlayer(player);
    }
  }

  clearCards() {
    this.players.forEach((player) => {
      if (player.cards) {
        player.cards.length = 0;
      }
      this.drawPlayerCards(player);
    });
    if (bank.cards) {
      bank.cards.length = 0;
    }
    this.drawBankCards();
  }

  endRoundPlayer(player) {
    player.status.isPlaying = false;
    player.status.isDone = true;
    this.game.ui.disableButtonById(
      player,
      ["done", "bet", "hit", "double"],
      true
    );
    player.setPlayerBorderRed(true);
  }
}
