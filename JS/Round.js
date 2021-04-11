import bank from '/Bank.js'
import player from '/Player.js'

class Round {
    constructor(players){
        this.players = players;
        this.round = null;
        this.bank = null;
    }

    startRound(){
        this.round = new Round();
    }

    
}