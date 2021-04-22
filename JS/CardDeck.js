export class CardDeck{
    constructor(cardDeckSize){
        this.cardDeck = this.generateCardDeck(cardDeckSize)
    }

    generateCardDeck(cardDeckSize){
        /**
         *@returns an array of objects: value: value of the card, image: its unicode character
         *@param cardDeckSize int number of decks to be created
         */
        let cardDeck = []
        // Cards in Unicode are 0x1F0 + [A,B,C or D] + [number which is a letter for figures]
        const FAMILY_UNICODE=["A","B","C","D"]
        const VALUE_UNICODE=[1,2,3,4,5,6,7,8,9,"A","B","D","E"]
        const VALUE=[1,2,3,4,5,6,7,8,9,10,10,10,10]
        //colors in Unicode = ['\u2660', '\u2665', '\u2666', '\u2663']

        for (let k=0; k<cardDeckSize; k++){
            for (let j=0; j<FAMILY_UNICODE.length; j++){
                for (let i=0; i<VALUE_UNICODE.length; i++){
                    cardDeck.push({value: VALUE[i],
                        image: String.fromCodePoint("0x1F0"+ FAMILY_UNICODE[j] + VALUE_UNICODE[i])})
                }
            }
        }
        return cardDeck
    }

    getCard(){
        /**
         * Remove a card from the deck (deck updated)
         * @returns the removed card as an object
         */
        let cardPosition = Math.floor(Math.random()*this.cardDeck.length)
        return this.cardDeck.splice(cardPosition,1)[0]
    }
}





