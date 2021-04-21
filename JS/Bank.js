export class Bank{
    constructor(){
        this.name = "bank"
        this.cards = []
        this.score = 0
    }

/**
 * calculate score, consider Ace as 1 if total score <17 with ace as 10
 * TODO: check if Ace handled properly
 */
    calculateScore(){
        let cardValues = this.cards.map( ({value}) => value).sort( (a,b) => b-a)
        return cardValues.reduce( (acc, val) => {
            return val===1 && acc+val <8 ? acc+val+10 : acc+val
        },0)
    }

    getCardValue(){
        return this.cards.reduce( (acc, card) => acc+card.value,0)
    }
}