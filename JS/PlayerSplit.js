import { Player } from "./Player.js";
export class PlayerSplit extends Player {
  constructor(player) {
    super(player.name, player.money);
    this.cards = [];
    this.id = player.getId();
    this.cards.push(player.cards.pop());
    this.bet = player.bet;
    this.finalScore = 0;
    this.status = { isPlaying: true, hasBet: true, isDone: false };
    this.setSubObj(player);
    console.log(`playerSplit created: ${JSON.stringify(this)}`);
  }
  setSubObj(player) {
    player.playerSplit = this;
  }
}
