export class Bank{
    constructor(){
        this.cards=[]
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
}