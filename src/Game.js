/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"

export const tiles = {
  schwarz: "black",
  weiß: "rgba(209, 209, 209, 0.66)",
  gelb: "yellow",
  blau: "blue",
  rot: "red",
}

/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
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
      [
        { farbe: tiles.blau, belegt: false },
        { farbe: tiles.gelb, belegt: false },
        { farbe: tiles.rot, belegt: false },
        { farbe: tiles.schwarz, belegt: false },
        { farbe: tiles.weiß, belegt: false },
      ],
      [
        { farbe: tiles.weiß, belegt: false },
        { farbe: tiles.blau, belegt: false },
        { farbe: tiles.gelb, belegt: false },
        { farbe: tiles.rot, belegt: false },
        { farbe: tiles.schwarz, belegt: false },
      ],
      [
        { farbe: tiles.schwarz, belegt: false },
        { farbe: tiles.weiß, belegt: false },
        { farbe: tiles.blau, belegt: false },
        { farbe: tiles.gelb, belegt: false },
        { farbe: tiles.rot, belegt: false },
      ],
      [
        { farbe: tiles.rot, belegt: false },
        { farbe: tiles.schwarz, belegt: false },
        { farbe: tiles.weiß, belegt: false },
        { farbe: tiles.blau, belegt: false },
        { farbe: tiles.gelb, belegt: false },
      ],
      [
        { farbe: tiles.gelb, belegt: false },
        { farbe: tiles.rot, belegt: false },
        { farbe: tiles.schwarz, belegt: false },
        { farbe: tiles.weiß, belegt: false },
        { farbe: tiles.blau, belegt: false },
      ],
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

    // let erstesTileImArray =

    takeTile: function takeTile(move, manufakturindex, tileindex) {
      //welche Farbe hat das angeklickte Tile
      let Farbechecker = move.G.manufaktur[manufakturindex][tileindex]

      let d = 0
      while (d < 4) {
        if (move.G.manufaktur[manufakturindex][d] == Farbechecker) {
          move.G.inventory.push(move.G.manufaktur[manufakturindex][d])
          move.G.manufaktur[manufakturindex][d] = null
          //move.G.manufaktur[manufakturindex].splice(d, 1)
        } else {
          move.G.mitte.push(move.G.manufaktur[manufakturindex][d])
          move.G.manufaktur[manufakturindex][d] = null
          //move.G.manufaktur[manufakturindex].splice(d, 1)
        }
        d = d + 1
      }
      move.G.manufaktur[manufakturindex] = []
    },

    pushPyramide: function pushPyramide(move, indexAnzeiger) {
      //move.G.pyramide[indexAnzeiger].push(move.G.inventory[0])

      while (move.G.inventory.length > 0) {
        let nullOrt = move.G.pyramide[indexAnzeiger].indexOf(null)
        move.G.pyramide[indexAnzeiger][nullOrt] = move.G.inventory.pop()
        //move.G.inventory = []
      }

      let mitteLeer = move.G.mitte.length == 0

      let manufakturLeer = true

      for (let alleArraysAusManufaktur of move.G.manufaktur) {
        if (alleArraysAusManufaktur.length != 0) {
          manufakturLeer = false
        }
      }
      if (manufakturLeer && mitteLeer) {
        let r = 0
        while (r < move.G.pyramide.length) {
          if (move.G.pyramide[r].indexOf(null) == -1) {
          }
        }
      }
    },
    mitteZumInventory: function mitteZumInventory(move, Farbe) {
      let z = 0
      while (z < move.G.mitte.length) {
        if (move.G.mitte[z] == Farbe) {
          let Tiles = move.G.mitte.splice(z, 1)[0]
          move.G.inventory.push(Tiles)
        } else {
          z = z + 1
        }
      }
    },
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
