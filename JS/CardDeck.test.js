const { test } = require('@jest/globals')
import {CardDeck} from './CardDeck.js'

test('check length of CardDeck = 8 * 13 * 4 =  416', () => {
    let deck = new CardDeck(8)
    expect(deck.cardDeck.length).toBe(416)
})

test('length of cardDeck is reduced by 1 after calling getCard', () => {
    let deck = new CardDeck(1)
    deck.getCard()
    expect(deck.cardDeck.length).toBe(51)
})
