const { test } = require('@jest/globals')
import {Bank} from './Bank.js'

test('cards 1 + 10 = 21', () => {
    const bank = new Bank()
    bank.cards = [{value: 1, image: "image"}, {value: 10, image: "image"}]
    expect(bank.calculateScore()).toBe(21)
})

test('cards 1 + 10 + 1 + 1 = 13', () => {
    const bank = new Bank()
    player1.cards = [{value: 1, image: "image"}, {value: 10, image: "image"},{value: 1, image: "image"},{value: 1, image: "image"}]
    expect(bank.calculateScore()).toBe(13)
})

test('cards 1 + 1 + 1 + 1 = 14', () => {
    const bank = new Bank()
    bank.cards = [{value: 1, image: "image"}, {value: 1, image: "image"},{value: 1, image: "image"},{value: 1, image: "image"}]
    expect(bank.calculateScore()).toBe(14)
})

test('cards 1 + 5 + 5 = 21', () => {
    const bank = new Bank()
    bank.cards = [{value: 1, image: "image"}, {value: 5, image: "image"},{value: 5, image: "image"}]
    expect(bank.calculateScore()).toBe(21)
})
