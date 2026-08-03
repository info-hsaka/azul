/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    const tiles = {
      schwarz: "black",
      weiß: "rgba(209, 209, 209, 0.66)",
      gelb: "yellow",
      blau: "blue",
      rot: "red",
    }

    let sack = []
    let i = 1
    while (i <= 20) {
      sack.push(tiles.rot)
      sack.push(tiles.weiß)
      sack.push(tiles.schwarz)
      sack.push(tiles.blau)
      sack.push(tiles.gelb)
      i = i + 1
    }

    sack = random.Shuffle(sack)

    let legeFeld = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]

    let pyramide = [
      [null],
      [null, null],
      [null, null, null],
      [null, null, null, null],
      [null, null, null, null, null],
    ]

    let manufaktur = [[], [], [], [], [], [], [], [], []]

    for (let platte of manufaktur) {
      while (platte.length < 4) {
        platte.push(sack.shift())
      }
    }
    let mitte = []

    const inventory = []

    return {
      sack: sack,
      legeFeld: legeFeld,
      pyramide: pyramide,
      manufaktur: manufaktur,
      mitte: mitte,
      inventory: inventory,
    }
  },

  moves: {
    /** @type {Move} */

    takeTile: function takeTile(move, manufakturindex, tileindex) {
      console.log(JSON.stringify(move.G.manufaktur, null, 4))
      console.log(manufakturindex)
      move.G.inventory.push(move.G.manufaktur[manufakturindex][tileindex])
      move.G.manufaktur[manufakturindex][tileindex] = null
    },

    // pushPyramide: function pushPyramide (move, inventory)
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
