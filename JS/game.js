import {Player} from './Player.js'
import {Round} from './Round.js'
import {Game} from './GameClass.js'

const player1 = new Player('GG',1000)
const player2 = new Player('Lenny',1000)
const CARD_DECK_SIZE = 4
const game = new Game([player1, player2])
let round
let bank

console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Player ${player2.name} created with id ${player2.id} and ${player2.money} $`)

game.initializeGame()
main()

function main(){
    let roundPlayers = [...game.players]
    round = new Round(game, roundPlayers, CARD_DECK_SIZE)
    round.initializeRound()
    bank = round.bank
    console.log(`players: ${JSON.stringify(round.players)}`)
    let playersArray = [...round.players]
    makeYourBet(playersArray)
}

function makeYourBet(playersToBet){
    console.log(`make your bet launched`)
    game.ui.newInfoMessage("Make your bet within 10s or click Done!")
    let undecidedPlayers = playersToBet
    let playersToContinue = []
    
    let timeCount = 0
    let id = setInterval( () =>{
        if(playersToContinue.length === 0 && ++timeCount >10){
            clearInterval(id)
            game.ui.newInfoMessage("No player wants to play! Game Ended!")
            game.endGame()
            return
           }
           ({undecidedPlayers,playersToContinue} = checkBets(undecidedPlayers,playersToContinue))

           if(undecidedPlayers.length === 0){
            clearInterval(id)
            playersToBet.forEach( (player) => {
                if(player.status.hasBet && player.status.isPlaying){
                    game.ui.disableButtonById(player,['bet'], true)
                    game.ui.disableButtonById(player,['double'], false)
                } else {
                    player.endRound()
                }
            })
            console.log(`players to continue: ${JSON.stringify(playersToContinue)}`)
            waitDone(playersToContinue)
        }
    },1000)
}

function waitDone(players){
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
        endRound(game.players)
    } else {
        let newCard = round.cardDeck.getCard()
        bank.cards.push(newCard)
        round.drawBankCards()
        console.log(`card added and total value is ${bank.getCardValue()}`)
        bankPlay()
    }
}

function endRound(players){
    console.log(`Round ended, bank score is ${bank.calculateScore()}, player1 is ${player1.finalScore}, player2 is ${player2.finalScore}`)
    
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

/**
 * Remove players that already have bet or are not playing
 * @param {array of players} players
 */
function checkBets(undecidedPlayers,playersToContinue){
    undecidedPlayers.forEach((player)=> {
        if(player.status.hasBet){
            playersToContinue.push(undecidedPlayers.splice(undecidedPlayers.indexOf(player),1)[0])
        } else if (!player.status.isPlaying){
            undecidedPlayers.splice(undecidedPlayers.indexOf(player),1)
        }
    })
    return {undecidedPlayers,playersToContinue}
}

export {main, endRound, checkBets}