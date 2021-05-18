export class Bank {
  constructor() {
    this.name = "bank";
    this.cards = [];
    this.score = 0;
  }

  /*
  calculateScoreOld() {
    let cardValues = this.cards.map(({ value }) => value).sort((a, b) => b - a);
    return cardValues.reduce((acc, val) => {
      return val === 1 && acc + val < 8 ? acc + val + 10 : acc + val;
    }, 0);
  }
  */

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

  getCardValue() {
    return this.cards.reduce((acc, card) => acc + card.value, 0);
  }
}
