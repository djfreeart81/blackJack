import {Player} from './Player.js'

export class Game{
    constructor(players){
        this.players = players
    }

    initializeGame(){
        this.players.forEach(player => this.drawPlayer(player))
        this.drawBank()
        this.hideSplit()
        console.log('game initialized')
    }

    drawPlayer(player){
        let $player = document.getElementById('player'+player.id)
        let $playerName = document.createElement('div')
        $playerName.id = `player${player.id}-name`
        $playerName.innerHTML = player.name
        $player.appendChild($playerName)
        console.log(JSON.stringify($playerName))
        
        let $playerMoney = document.createElement('div')
        $playerMoney.id = `player${player.id}-money`
        $playerMoney.innerHTML = player.money + " $"
        $player.appendChild($playerMoney)
        
        let $playerCards = document.createElement('div')
        $playerCards.id = `player${player.id}-cards`
        $player.appendChild($playerCards)
    }
    
    drawBank(){
        return
    }
    
    hideSplit(){
        let splitEl = document.querySelectorAll('.split')
        for (let el of splitEl){
            if (el.style.display === "none") {
                el.style.display = "block"
//               } else {
//                 el.style.display = "none";
              }
        }
    }
    
    endGame(){
        // Go to menu
    }
}
