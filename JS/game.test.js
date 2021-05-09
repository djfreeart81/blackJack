const { test } = require('@jest/globals')
import { Player } from './Player'
import {checkBets} from './game.js'

test('checkbets remove element', () => {
    let player1 = new Player("1",1000)
    let player2 = new Player("2",1000)
    let player3 = new Player("3",1000)
    player1.status.hasBet = true
    player2.status.hasBet = false
    player2.status.isDone = false
    player3.status.hasBet = false
    player3.status.isDone = true
    let undecidedPlayers = [player1,player2,player3]
    let playersToContinue = []
    checkBets(undecidedPlayers,playersToContinue)
    expect(checkBets(undecidedPlayers,playersToContinue)).toBe([player2],[player1,player3])
})
//TODO: test not working because start from beginning of game, instead of only the function