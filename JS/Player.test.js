const { test } = require('@jest/globals')
import {Player} from './Player.js'

test('cards 1 + 10 = 21', () => {
    const player1 = new Player("test", 1000)
    player1.cards = [{value: 1, image: "image"}, {value: 10, image: "image"}]
    expect(player1.calculateScore()).toBe(21)
})

test('cards 1 + 10 + 1 + 1 = 13', () => {
    const player1 = new Player("test", 1000)
    player1.cards = [{value: 1, image: "image"}, {value: 10, image: "image"},{value: 1, image: "image"},{value: 1, image: "image"}]
    expect(player1.calculateScore()).toBe(13)
})

test('cards 1 + 1 + 1 + 1 = 14', () => {
    const player1 = new Player("test", 1000)
    player1.cards = [{value: 1, image: "image"}, {value: 1, image: "image"},{value: 1, image: "image"},{value: 1, image: "image"}]
    expect(player1.calculateScore()).toBe(14)
})

test('cards 1 + 5 + 5 = 21', () => {
    const player1 = new Player("test", 1000)
    player1.cards = [{value: 1, image: "image"}, {value: 5, image: "image"},{value: 5, image: "image"}]
    expect(player1.calculateScore()).toBe(21)
})
