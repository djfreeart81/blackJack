const { test } = require('@jest/globals')
import {CardDeck} from './CardDeck.js'

test('check length of CardDeck = 8 * 13 * 4 =  416', () => {
    expect(CardDeck.generateCardDeck(8).length).toBe(416)
})

test('length of cardDeck is reduced by 1 after calling getCard', () => {
    let deck = new CardDeck(1)
    deck.getCard()
    expect(deck.length).toBe(51)
})
