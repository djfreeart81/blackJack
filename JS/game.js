import {Player} from './Player.js'
import {CardDeck} from './CardDeck.js'
import { Bank } from './Bank.js'

const player1 = new Player('GG',1000)
const player2 = new Player('Lenny',1000)
const BET = 5
player2.id=2
let players = [player1,player2]
let cardDeck
const bank = new Bank()

console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Player ${player2.name} created with id ${player2.id} and ${player2.money} $`)


initializeGame()

if(!player1.hasBet && player1.isPlaying || !player2.hasBet && player2.isPlaying){
    makeYourBet()
}

console.log(`${cardDeck.length} remaining cards in Deck`)

function initializeGame(){
    
    cardDeck = new CardDeck(4)
    console.log(`Deck created with ${cardDeck.length} cards`)
    console.log(cardDeck)
    
    player1.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawPlayer(player1)
    player2.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawPlayer(player2)
    bank.cards.push(cardDeck.getCard(), cardDeck.getCard())
    drawBank()

    // Create EventListener
    players.forEach( (player) => {
        if(document.getElementById(`player${player.id}-new-card`)) {
            document.getElementById(`player${player.id}-new-card`).addEventListener("click", (event) => {
                event.preventDefault()
                addNewCard(player)
            })
        }
        if(document.getElementById(`player${player.id}-bet`)) {
            document.getElementById(`player${player.id}-bet`).addEventListener("click", (event) => {
                event.preventDefault()
                player.betMoney(BET)
            })
        }
        if(document.getElementById(`player${player.id}-done`)) {
            document.getElementById(`player${player.id}-done`).addEventListener("click", (event) => {
                event.preventDefault()
                document.getElementById(`player${player.getId()}-done`).disabled = true
                document.getElementById(`player${player.getId()}-new-card`).disabled = true
                player.isDone = true
            })
        }
    })
    let elementsNewCard = document.getElementsByClassName("new-card")
    for (let el of elementsNewCard) {
        el.disabled = true
    }
}

function makeYourBet(){
    document.getElementById("info").innerHTML = "Make your bet within 10s or click Done!"
    
    let timeCount =0
    let id = setInterval( () =>{
        if((player1.hasBet || !player1.isPlaying) && (player2.hasBet || !player2.isPlaying)){
            clearInterval(id)
            let playersToContinue = []
            players.forEach( (player) => {
                if(player.hasBet && player.isPlaying){
                    playersToContinue.push(player)
                }
            })
            waitDone(playersToContinue)
        }
        if(++timeCount > 10) {
            clearInterval(id)
            let playersToContinue = []
            players.forEach( (player) => {
                if(player.hasBet && player.isPlaying){
                    playersToContinue.push(player)
                }
            })
            waitDone(playersToContinue)
        }
    },1000)
}

function waitDone(playersArray){
    document.getElementById("info").innerHTML = "Add card or click done within 30s!"

    let timeCount =0
    let id = setInterval( () =>{
        if(player1.isDone && player2.isDone){
            clearInterval(id)
            bankPlay()
        }
        if(++timeCount > 30) {
            clearInterval(id)
            bankPlay()
        }
    },1000)
}

function bankPlay(){
    //TODO: implement bank add card until 17, then calculate gains
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
    $playerCards.id = `player${player.id}-cards`
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

function clearCards(){
    player1.cards = []
    player2.cards = []
    bank.cards = []
    
    for (let i=1; i<3; i++) {
        let cards = document.getElementById(`player${i}-cards`)
        cards.remove()
    }
    let $bank = document.getElementById('bank')
}

function addNewCard(player){
    let newCard = cardDeck.getCard()
    player.cards.push(newCard)
    let $player = document.getElementById('player'+player.id)
    let $playerCards = document.getElementById(`player${player.id}-cards`)
    $playerCards.innerHTML += newCard.image
    console.log(`card added and total value is ${player.getCardValue()}`)
    if(player.getCardValue()>21) {
        player.endRound()
    }
}