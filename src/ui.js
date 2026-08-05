/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { onClick } from "./canvas.js"
import { tiles } from "./Game.js"
export function draw(
  /** @type {ClientState<[ReturnType<Game["setup"]>]>} */
  state,
  /** @type{Record<string, (...args: any[]) => void>} */
  moves,
) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  // draw here
  ctx.strokeRect(300, 200, 250, 250)
  let a1 = 350
  while (a1 < 550) {
    ctx.beginPath()
    ctx.moveTo(a1, 200)
    ctx.lineTo(a1, 450)
    ctx.stroke()
    a1 = a1 + 50
  }
  let b1 = 250
  while (b1 < 450) {
    ctx.beginPath()
    ctx.moveTo(300, b1)
    ctx.lineTo(550, b1)
    ctx.stroke()
    b1 = b1 + 50
  }
  // Pyramide
  let x = 0
  let y = 0
  while (y < 5) {
    x = 0
    while (x < 5) {
      if (x + y < 4) {
        x = x + 1
        continue
      }
      ctx.strokeRect(x * 50, y * 50 + 200, 50, 50)
      let tileFarbe = state.G.pyramide[y][4 - x]
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(x * 50, y * 50 + 200, 50, 50)
      }

      x = x + 1
    }
    y = y + 1
  }

  if (state.G.inventory.length > 0) {
    onClick(0, 400, 250, 50, () => {
      moves.pushPyramide(4)
    })
    onClick(50, 350, 200, 50, () => {
      moves.pushPyramide(3)
    })
    onClick(100, 300, 150, 50, () => {
      moves.pushPyramide(2)
    })
    onClick(150, 250, 100, 50, () => {
      moves.pushPyramide(1)
    })
    onClick(200, 200, 50, 50, () => {
      moves.pushPyramide(0)
    })
  }

  console.log(state.G.manufaktur[0])
  //state.G.manufaktur[0[0]]

  /*let e = 0
  while (e < 1500) {
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(e, 0)
    ctx.lineTo(e, 1500)
    ctx.stroke()
    e = e + 50
  }
  let f = 0
  while (f < 3000) {
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(0, f)
    ctx.lineTo(3000, f)
    ctx.stroke()
    f = f + 50
  }*/
  // while schleife für die Platten
  let mittelpunkte = []
  let p = 725
  let q = 150 //Das ist der erste Mittelpunkt
  while (q <= 550) {
    ctx.beginPath()
    ctx.arc(p, q, 75, 0, 2 * Math.PI)
    ctx.strokeStyle = "black"
    ctx.stroke() //Hier wird der Kreis gezeichnet
    mittelpunkte.push([p, q - 50])
    if (p < 1125) {
      p = p + 200
    } else if (q <= 550) {
      p = 725
      q = q + 200
    }
  }

  console.dir(mittelpunkte)

  ctx.beginPath() // großer Kreis (Freier Markt)
  ctx.arc(275, 775, 275, 0, Math.PI * 2)
  ctx.stroke()

  let platz = 0
  function quadrateLegen(a, b, platz) {
    let farbeSortierer = state.G.manufaktur[platz]

    if (farbeSortierer[0] != null) {
      ctx.fillStyle = farbeSortierer[0]
      ctx.fillRect(a - 50, b, 50, 50)
      onClick(a - 50, b, 50, 50, () => moves.takeTile(platz, 0))
    }

    if (farbeSortierer[1] != null) {
      ctx.fillStyle = farbeSortierer[1]
      ctx.fillRect(a, b, 50, 50)
      onClick(a, b, 50, 50, () => moves.takeTile(platz, 1))
    }

    if (farbeSortierer[2] != null) {
      ctx.fillStyle = farbeSortierer[2]
      ctx.fillRect(a - 50, b + 50, 50, 50)
      onClick(a - 50, b + 50, 50, 50, () => moves.takeTile(platz, 2))
    }

    if (farbeSortierer[3] != null) {
      ctx.fillStyle = farbeSortierer[3]
      ctx.fillRect(a, b + 50, 50, 50)
      onClick(a, b + 50, 50, 50, () => moves.takeTile(platz, 3))
    }
  }
  for (let punkt of mittelpunkte) {
    let a = punkt[0]
    let b = punkt[1]
    quadrateLegen(a, b, platz)
    if (platz < 8) {
      platz = platz + 1
    }
  }

  //Damit lesen wir aus wie viele Tiles einer Farbe in der Mitte sind
  let anzahlWeiß = 0
  let anzahlRot = 0
  let anzahlBlau = 0
  let anzahlGelb = 0
  let anzahlSchwarz = 0

  for (let tile of state.G.mitte) {
    if (tile == tiles.weiß) {
      anzahlWeiß = anzahlWeiß + 1
    }
    if (tile == tiles.rot) {
      anzahlRot = anzahlRot + 1
    }
    if (tile == tiles.blau) {
      anzahlBlau = anzahlBlau + 1
    }
    if (tile == tiles.gelb) {
      anzahlGelb = anzahlGelb + 1
    }
    if (tile == tiles.schwarz) {
      anzahlSchwarz = anzahlSchwarz + 1
    }
  }

  //zeigt uns die fünf Farben in der mitte an
  ctx.fillStyle = tiles.weiß
  ctx.fillRect(100, 600, 100, 100)
  onClick(100, 600, 100, 100, () => moves.mitteZumInventory(tiles.weiß))

  ctx.fillStyle = tiles.rot
  ctx.fillRect(350, 600, 100, 100)
  onClick(350, 600, 100, 100, () => moves.mitteZumInventory(tiles.rot))

  ctx.fillStyle = tiles.blau
  ctx.fillRect(100, 750, 100, 100)
  onClick(100, 750, 100, 100, () => moves.mitteZumInventory(tiles.blau))

  ctx.fillStyle = tiles.schwarz
  ctx.fillRect(350, 750, 100, 100)
  onClick(350, 750, 100, 100, () => moves.mitteZumInventory(tiles.schwarz))

  ctx.fillStyle = tiles.gelb
  ctx.fillRect(225, 900, 100, 100)
  onClick(225, 900, 100, 100, () => moves.mitteZumInventory(tiles.gelb))

  //Zeigt uns die Anzahl der jeweiligen Teils in der Mitte an
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.font = "50px Arial"
  ctx.lineWidth = 1
  ctx.strokeStyle = "black"
  ctx.fillStyle = "white"
  ctx.fillText(anzahlWeiß, 100, 600)
  ctx.strokeText(anzahlWeiß, 100, 600)
  ctx.fillText(anzahlSchwarz, 350, 750)
  ctx.strokeText(anzahlSchwarz, 350, 750)
  ctx.fillText(anzahlRot, 350, 600)
  ctx.strokeText(anzahlRot, 350, 600)
  ctx.fillText(anzahlGelb, 225, 900)
  ctx.strokeText(anzahlGelb, 225, 900)
  ctx.fillText(anzahlBlau, 100, 750)
  ctx.strokeText(anzahlBlau, 100, 750)
}
