export class Player {
  constructor(name, money) {
    this.name = name;
    this.money = money;
    this.id = null;
    this.setId();
    this.cards = [];
    this.bet = 0;
    this.finalScore = 0;
    this.status = { isPlaying: true, hasBet: false, isDone: false };
  }

  setId() {
    this.id = ++idCount;
  }

  getName() {
    return this.name;
  }

  getMoney() {
    return this.money;
  }

  getId() {
    return this.id;
  }
  getCardValue() {
    return this.cards.reduce((acc, card) => acc + card.value, 0);
  }

  betMoney(amount) {
    if (this.money < amount) {
      alert("not enough money");
      this.playing = false;
      return;
    }
    this.bet = amount;
    this.updateMoney(-amount);
    this.status.hasBet = true;
    console.log(`player ${this.name} bet ${this.bet}`);
  }

  updateMoney(amount) {
    this.money += amount;
    let $playerMoney = document.getElementById(`player${this.getId()}-money`);
    $playerMoney.innerHTML = this.money + " $";
  }

  /**
   * Define the border parameters and manage new-card button status
   * @param {green,red} color
   */
  setPlayerBorderRed(bool) {
    let colors = {
      true: { border: "red", background: "LightCoral" },
      false: { border: "green", background: "darkgray" },
    };

    document.getElementById(`player${this.getId()}`).style.borderColor =
      colors[bool].border;
    document.getElementById(`player${this.getId()}`).style.backgroundColor =
      colors[bool].background;
    document.getElementById(
      `player${this.getId()}-button-box`
    ).style.borderColor = colors[bool].border;
    document.getElementById(`player${this.getId()}-new-card`).disabled = bool;
  }
  endRound() {
    this.isPlaying = false;
    this.isDone = true;
    document.getElementById(`player${this.getId()}-done`).disabled = true;
    document.getElementById(`player${this.getId()}-bet`).disabled = true;
    document.getElementById(`player${this.getId()}-new-card`).disabled = true;
    this.setPlayerBorderRed(true);
  }
  calculateScore() {
    let cardValues = this.cards.map(({ value }) => value).sort((a, b) => b - a);
    let numberOfOnes = cardValues.filter((number) => number === 1).length;
    return cardValues.reduce((acc, val) => {
      if ((val === 1 && numberOfOnes-- > 1) || val !== 1) {
        return acc + val;
      } else {
        return acc + val + 10 <= 21 ? acc + val + 10 : acc + val;
      }
    }, 0);
  }
}

let idCount = 0;
