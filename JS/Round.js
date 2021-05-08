import {Bank} from './Bank.js'
import {CardDeck} from './CardDeck.js'
import {main} from './game.js'

export class Round {
    constructor(game, players, cardDeckSize){
        this.players = players;
        this.bank = new Bank();
        this.cardDeck = new CardDeck(cardDeckSize)
        this.BET = 5
    }

    initializeRound(){
        // Create EventListener
        document.getElementById('new-round').addEventListener('click', (event) => {
            event.preventDefault()
            event.stopImmediatePropagation()
            main()
        })
        console.log(JSON.stringify(this.players))
        this.players.forEach( (player) => {
            if(document.getElementById(`player${player.id}-new-card`)) {
                document.getElementById(`player${player.id}-new-card`).addEventListener("click", (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    this.addNewCard(player)
                })
            }
            if(document.getElementById(`player${player.id}-bet`)) {
                document.getElementById(`player${player.id}-bet`).addEventListener("click", (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    player.bet = this.BET
                    player.betMoney(player.bet)
                })
            }
            if(document.getElementById(`player${player.id}-double`)) {
                document.getElementById(`player${player.id}-double`).addEventListener("click", (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    player.betMoney(player.bet)
                    player.bet += this.BET
                    document.getElementById(`player${player.id}-double`).disabled = true
                    document.getElementById(`player${player.id}-done`).disabled = true
                    document.getElementById(`player${player.id}-new-card`).disabled = true
                    this.addNewCard(player)
                    player.isDone = true
                })
            }
            if(document.getElementById(`player${player.id}-split`)) {
                document.getElementById(`player${player.id}-split`).addEventListener("click", (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    //TODO: implement split logic: create 2 hands: with 2 sets of buttons or same buttons but for each hand)
                    ui.hideButtonById(`player${player.id}-split`, true)
                })
            }
            if(document.getElementById(`player${player.id}-done`)) {
                document.getElementById(`player${player.id}-done`).addEventListener("click", (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    document.getElementById(`player${player.getId()}-done`).disabled = true
                    document.getElementById(`player${player.getId()}-double`).disabled = true
                    document.getElementById(`player${player.id}-new-card`).disabled = true
                    player.isDone = true
                })
            }
            // initialize players
            player.isDone = false
            player.hasBet = false
            player.isPlaying = true
            this.clearCards()
            document.getElementById(`player${player.getId()}-name`).innerHTML = player.getName()
            document.getElementById(`player${player.getId()}-money`).innerHTML = player.getMoney() + "$"
            player.setPlayerBorderRed(false)
        })
        let elementsNewCard = document.getElementsByClassName("new-card")
        for (let el of elementsNewCard) {
            el.disabled = true
        }
        let elementsBet = document.getElementsByClassName("bet")
        for (let el of elementsBet) {
            el.disabled = false
        }
        let elementsDouble = document.getElementsByClassName("double")
        for (let el of elementsDouble) {
            el.disabled = true
        }
        let elementsSplit = document.getElementsByClassName("split")
        for (let el of elementsSplit) {
            el.disabled = true
        }
        let elementsDone = document.getElementsByClassName("done")
        for (let el of elementsDone) {
            el.disabled = false
        }
        console.log(`round initialized`)
    }

    drawPlayerCards(player){
        if(document.getElementById(`player${player.getId()}-cards`)){
            document.getElementById(`player${player.getId()}-cards`).innerHTML = player.cards.reduce((acc, i) => acc + i.image, "")
            document.getElementById(`player${player.getId()}-score`).innerHTML = player.calculateScore()
        }
    }

    drawBankCards(){
        document.getElementById('bank-cards').innerHTML = this.bank.cards.reduce((acc, i) => acc + i.image, "")
        document.getElementById(`bank-score`).innerHTML = this.bank.calculateScore()
    }

    addNewCard(player){
        let newCard = this.cardDeck.getCard()
        player.cards.push(newCard)
        this.drawPlayerCards(player)
        console.log(`card added for player${player.getId()} and value is ${newCard.value}`)
        if(player.getCardValue()>21) {
            this.players.pop(player)
            player.endRound()
        }
    }

    clearCards(){
        this.players.forEach( player => {
            if(player.cards){
                player.cards.length = 0
            }
            this.drawPlayerCards(player)
        })
        if(bank.cards){
            bank.cards.length = 0
        }
        this.drawBankCards()
    }
}
