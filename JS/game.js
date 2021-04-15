import {Player} from './Player.js'
import {CardDeck} from './CardDeck.js'
import { Bank } from './Bank.js'

const player1 = new Player('GG',1000)
const player2 = new Player('Lenny',10)
player2.id=2
let cardDeck
const bank = new Bank();

console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Player ${player2.name} created with id ${player2.id} and ${player2.money} $`)
console.log(`Deck created with ${cardDeck.length} cards`)
console.log(cardDeck)


main();

function main(){
    initializeCards()

    update()
    

    console.log(`${cardDeck.length} remaining cards in Deck`)
}

function initializeCards(){
    
    
    cardDeck = new CardDeck(4)
    player1.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawPlayer(player1)
    player2.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawPlayer(player2)
    bank.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawBank()
}

function update(){

}

function drawPlayer(player){
    let $player = document.getElementById('player'+player.id)
    let $playerName = document.createElement('div')
    $playerName.id = `player${player.id}-name`
    $playerName.innerHTML = player.name
    $player.appendChild($playerName)
    
    let $playerMoney = document.createElement('div')
    $playerMoney.id = `player${player.id}-money`
    $playerMoney.innerHTML = player.money + " $"
    $player.appendChild($playerMoney)
    
    if (document.getElementById(`player${player.id}-cards`)) {
        let cards = document.getElementById(`player${player.id}-cards`)
        cards.remove()
    }
    let $playerCards = document.createElement('div')
    $playerCards.id = = `player${player.id}-cards`
    $playerCards.innerHTML = player.cards.reduce((acc, i) => acc + i.image, "")
    $player.appendChild($playerCards)
}
function drawBank(player){
    let $bank = document.getElementById('bank')
    let $bankCards = document.createElement('div')
    $bankCards.id = `bank-cards`
    $bankCards.innerHTML = bank.cards.reduce((acc, i) => acc + i.image, "")
    $bank.appendChild($bankCards)
}

funtion clearCards(){
    player1.cards = []
    player2.cards = []
    bank.cards = []
    
    for (let i=1; i<3; i++) {
        let cards = document.getElementById(`player${i}-cards`)
        cards.remove()
    }
    let $bank = document.getElementById('bank')
    
}
