/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    const tiles = {
      schwarz:  "schwarz",
      weiß: "weiß",
      gelb: "gelb",
      blau: "blau",
      rot: "rot"
    }

    let sack = [

    ]
     let i = 1
      while (i<= 20){
        sack.push(tiles.rot)
        sack.push(tiles.weiß)
        sack.push(tiles.schwarz)
        sack.push(tiles.blau)
        sack.push(tiles.gelb)
      i= i+1 }
      let legeFeld = [
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
      ]
      return {
      sack: sack,
      legeFeld: legeFeld
    }






  },

  moves: {
    /** @type {Move} */
    playCard: ({ G, ctx, playerID, events, random }, cardIndex) => {},
    drawCard(ctx) {},
  },

  seed: "random-seed",

  turn: {
    order: TurnOrder.DEFAULT,

    onBegin: ({ G, ctx, events, random }) => {},
    onEnd: ({ G, ctx, events, random }) => {},

    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 4,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}
