import {Player} from './Player.js'
import {CardDeck} from './CardDeck.js'
import { Bank } from './Bank.js'
import { Round } from './Round.js'
import {Game} from './GameClass.js'

const player1 = new Player('GG',1000)
const player2 = new Player('Lenny',1000)
let players = [player1,player2]
const CARD_DECK_SIZE = 4
const game = new Game(players)
let round
let bank

console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Player ${player2.name} created with id ${player2.id} and ${player2.money} $`)

game.initializeGame()
main()

function main(){
    round = new Round(players, CARD_DECK_SIZE)
    round.initializeRound()
    console.log(`round initialized`)
    bank = round.bank
    if(!player1.hasBet && player1.isPlaying || !player2.hasBet && player2.isPlaying){
        makeYourBet()
    }
}

function makeYourBet(){
    document.getElementById("info").innerHTML = "Make your bet within 10s or click Done!"
    
    let timeCount = 0
    let id = setInterval( () =>{
        if( ((player1.hasBet || !player1.isPlaying) && (player2.hasBet || !player2.isPlaying)) || ++timeCount > 10 ){
            clearInterval(id)
            let playersToContinue = []
            players.forEach( (player) => {
                if(player.hasBet && player.isPlaying){
                    playersToContinue.push(player)
                    document.getElementById(`player${player.getId()}-bet`).disabled = true
                } else {
                    player.endRound()
                }
            })
            waitDone(playersToContinue)
        }
    },1000)
}

function waitDone(playersArray){
    playersArray.forEach( player => {
        player.cards.push(round.cardDeck.getCard(), round.cardDeck.getCard())
        document.getElementById(`player${player.getId()}-new-card`).disabled = false
        round.drawPlayerCards(player)
    })
    bank.cards.push(round.cardDeck.getCard())
    round.drawBankCards(bank)

    document.getElementById("info").innerHTML = "Add card or click done within 20s!"

    let timeCount =0
    let id = setInterval( () =>{
        if(++timeCount > 20) {
            clearInterval(id)
            for (let player in playersArray){player.endRound()}
        }
        if(player1.isDone && player2.isDone){
            clearInterval(id)
            bankPlay()
        }
    },1000)
}

function bankPlay(){
    if(bank.calculateScore()>16){
        endRound()
    } else {
        let newCard = round.cardDeck.getCard()
        bank.cards.push(newCard)
        round.drawBankCards()
        console.log(`card added and total value is ${bank.getCardValue()}`)
        bankPlay()
    }
}

function endRound(){
    console.log(`Round ended, bank score is ${bank.calculateScore()}, player1 is ${player1.calculateScore()}, player2 is ${player2.calculateScore()}`)
    bank.score = bank.calculateScore()
    let winners = []
    players.forEach( (player) => {
        if(player.calculateScore() > 21) {return}
        if(player.calculateScore() > bank.score || bank.score>21) {
            console.log(`player ${player.name} has won`)
            winners.push(player)
        }
    })
    console.log(`winners are ${winners}`)
    document.getElementById("info").innerHTML = ""
    if(winners.length === 0){
        document.getElementById("info").innerHTML = `Sorry, the bank won!`
    } else {
        winners.forEach( (player) => {
            document.getElementById("info").innerHTML += `Congratulation ${player.name}! You won ${round.BET*2}$`
            player.updateMoney(round.BET*2)
        })
    }
}

export {main}
