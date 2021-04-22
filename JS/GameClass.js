import {Player} from './Player.js'

export class Game{
    constructor(players){
        this.players = players
    }

    initializeGame(){
        this.players.forEach(player => this.drawPlayer(player))
        this.drawBank()
    }

    drawPlayer(player){
        let $player = document.getElementById('player'+player.id)
        let $playerName = document.createElement('div')
        $playerName.id = `player${player.id}-name`
        $playerName.innerHTML = player.name
        $player.appendChild($playerName)
        
        let $playerMoney = document.createElement('div')
        $playerMoney.id = `player${player.id}-money`
        $playerMoney.innerHTML = player.money + " $"
        $player.appendChild($playerMoney)
        
        let $playerCards = document.createElement('div')
        $playerCards.id = `player${player.id}-cards`
        $player.appendChild($playerCards)
    }
    drawBank(){
        let $bank = document.getElementById('bank')
        let $bankCards = document.createElement('div')
        $bankCards.id = `bank-cards`
        $bank.appendChild($bankCards)
    }
}