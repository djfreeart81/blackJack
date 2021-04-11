import {Player} from './Player.js'
import {CardDeck} from './CardDeck.js'
import { Bank } from './Bank.js'

const player1 = new Player('GG',1000)
const cardDeck = new CardDeck(4)
const bank = new Bank();
console.log(`Player ${player1.name} created with id ${player1.id} and ${player1.money} $`)
console.log(`Deck created with ${cardDeck.length} cards`)
console.log(cardDeck)


main();

function main(){
    initialize()

    update()
    
    //draw()

    console.log(`${cardDeck.length} remaining cards in Deck`)
}

function initialize(){
    player1.cards.push(cardDeck.getCard(), cardDeck.getCard());
    draw(player1)
}

function update(){

}

function draw(player){
    let $player = document.getElementById('player'+player.id)
    let $playerName = document.createElement('div');
    let $playerMoney = document.createElement('div');
    let $playerCards = document.createElement('div');
    $playerName.innerHTML = "Player 1: " +player.name;
    $playerMoney.innerHTML = player.money + " $";
    $playerCards.innerHTML = player.cards.reduce((acc, i) => acc + i.image, "")
    $player.appendChild($playerName);
    $player.appendChild($playerMoney);
    $player.appendChild($playerCards);
}
