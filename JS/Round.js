import bank from '/Bank.js'
import player from '/Player.js'

class Round {
    constructor(players, nbCardDeck){
        this.players = players;
        this.bank = new Bank();
        this.cardDeck = new CardDeck(nbCardDeck)
    }

    startRound(){
        this.round = new Round();
        
    }   
}
