import {Player} from './Player.js'
import {Round} from './Round.js'
import {Game} from './GameClass.js'

const player1 = new Player('GG',1000)
const player2 = new Player('Lenny',1000)
let players = [player1, player2]
const CARD_DECK_SIZE = 4
const game = new Game(players)
let round
let bank

console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Player ${player2.name} created with id ${player2.id} and ${player2.money} $`)

game.initializeGame()
main()

function main(){
    round = new Round(game, [player1,player2], CARD_DECK_SIZE)
    round.initializeRound()
    bank = round.bank
    players = round.players
    console.log(`players: ${JSON.stringify(players)}`)
    
    if(!player1.status.hasBet && player1.status.isPlaying || !player2.status.hasBet && player2.status.isPlaying){
        makeYourBet()
    }
}

function makeYourBet(){
    let playersToContinue = []
    
    console.log(`make your bet launched`)
    game.ui.newInfoMessage("Make your bet within 10s or click Done!")
    
    let timeCount = 0
    let id = setInterval( () =>{
        if(playersToContinue.length === 0 && ++timeCount >10){
            clearInterval(id)
            game.ui.newInfoMessage("No player wants to play! Game Ended!")
            game.endGame()
            return
           }
        if( ((player1.status.hasBet || !player1.status.isPlaying) && (player2.status.hasBet || !player2.status.isPlaying)) || timeCount > 10 ){
            clearInterval(id)
            players.forEach( (player) => {
                if(player.status.hasBet && player.status.isPlaying){
                    game.ui.disableButtonById(player,['bet'], true)
                    game.ui.disableButtonById(player,['double'], false)
                } else {
                    player.endRound()
                }
            })
            
            waitDone()
        }
    },1000)
}

function waitDone(){
    console.log(`waitDone is launched`)
    players.forEach( player => {
        player.cards.push(round.cardDeck.getCard(), round.cardDeck.getCard())
        game.ui.disableButtonById(player,['new-card','double'], false)
        round.drawPlayerCards(player)
        // display Split button is both cards values are the same
        if(player.cards[0].value === player.cards[1].value){
            console.log(`split available for player${player.getId()}`)
            game.ui.hideButtonById(`player${player.getId()}-split`, false)
            game.ui.disableButtonById(player,['split'], false)
        }
    })
    bank.cards.push(round.cardDeck.getCard())
    round.drawBankCards(bank)

    game.ui.newInfoMessage("Add card or click done within 20s!")

    let timeCount =0
    let id = setInterval( () =>{
        if(++timeCount > 20) {
            clearInterval(id)
            for (let player of players){
                player.status.isDone = true
            }
        }
        if(player1.status.isDone && player2.status.isDone){
            clearInterval(id)
            for (let player of players){player.finalScore = player.calculateScore()}
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
    let tie = []
    players.forEach( (player) => {
        if(player.finalScore > 21) {return}
        if(player.finalScore > bank.score || bank.score>21) {
            console.log(`player ${player.name} has won`)
            winners.push(player)
        }
        if(player.finalScore === bank.score){
            if(player.finalScore === 21 && player.cards.length === 2 && bank.cards.length >2){
                console.log(`player ${player.name} has won`)
                winners.push(player)
            } else if (player.finalScore === 21 && player.cards.length > 2 && bank.cards.length === 2){
                console.log(`player ${player.name} has lost`)
            } else {
                console.log(`player ${player.name} tied`)
                tie.push(player)
            }
        }
    })
    game.ui.newInfoMessage("")
    if(winners.length === 0 && tie.length ===0){
        game.ui.newInfoMessage(`Sorry, the bank won!`)
    } else {
        winners.forEach( player => {
            if(player.cards.length === 2 && player.calculateScore() === 21){
                game.ui.addInfoMessage(`Congratulation ${player.name}! You won ${player.bet*1.5}$`+"\n")
                player.updateMoney(player.bet + player.bet*1.5)
            } else {
                game.ui.addInfoMessage(`Congratulation ${player.name}! You won ${player.bet}$`+"\n")
                player.updateMoney(player.bet + player.bet)
            }
        })
        tie.forEach( player => {
            game.ui.addInfoMessage(`${player.name}, you tied with bank, get back your bet ${player.bet}$`+"\n")
            player.updateMoney(player.bet)
        })
    }
}

export {main}