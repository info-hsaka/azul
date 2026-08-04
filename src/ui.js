/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { onClick } from "./canvas.js"

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
  //PYRAMIDE
  ctx.strokeRect(0, 200, 250, 250)
  let c1 = 0
  while (c1 < 550) {
    ctx.beginPath()
    ctx.moveTo(c1, 200)
    ctx.lineTo(c1, 450)
    ctx.stroke()
    c1 = c1 + 50
  }

  let d1 = 250
  while (d1 < 450) {
    ctx.beginPath()
    ctx.moveTo(0, d1)
    ctx.lineTo(250, d1)
    ctx.stroke()
    d1 = d1 + 50
  }
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.moveTo(0, 400)
  ctx.lineTo(0, 190)
  ctx.lineTo(250, 150)
  ctx.closePath()
  ctx.fill()

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

  let pyramideIndex = 0
  let pyramideIndexNochTiefer = 0
  function quadratInPyramide(pyramideIndex, pyramideIndexNochTiefer) {
    let tileFarbe = state.G.pyramide[pyramideIndex][pyramideIndexNochTiefer]
    let y = 200
    while (y < 450) {
      // wile schleife betrachtet das gesamte dreieck soll das so sein?
      //klicken funnktionirt, zeichnen aber nicht
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(200, y, 50, 50)
      }
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(150, y, 50, 50)
      }
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(100, y, 50, 50)
      }
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(50, y, 50, 50)
      }
      if (tileFarbe != null && tileFarbe != undefined) {
        ctx.fillStyle = tileFarbe
        ctx.fillRect(0, y, 50, 50)
      }
      y = y + 50
      //pyramideIndex = pyramideIndex + 1
      pyramideIndexNochTiefer = pyramideIndexNochTiefer + 1
    }
  }

  console.log(state.G.manufaktur[0])
  //state.G.manufaktur[0[0]]

  let e = 0
  while (e < 1500) {
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(e, 0)
    ctx.lineTo(e, 1500)
    ctx.stroke()
    e = e + 25
  }
  let f = 0
  while (f < 3000) {
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(0, f)
    ctx.lineTo(3000, f)
    ctx.stroke()
    f = f + 25
  }
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

  /*ctx.beginPath()
  ctx.arc(725, 150, 75, 0, 2 * Math.PI)
  ctx.strokeStyle = "black"
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(925, 150, 75, 0, 2 * Math.PI)
  ctx.strokeStyle = "black"
  ctx.stroke()*/

  /* ctx.strokeRect(300, 200, 250, 250)
  let a2 = 350
  while (a2 < 550) {
    ctx.beginPath()
    ctx.moveTo(a2, 200)
    ctx.lineTo(a2, 450)
    ctx.stroke()
    a2 = a + 50
  }
  let b2 = 250
  while (b2 < 450) {
    ctx.beginPath()
    ctx.moveTo(300, b2)
    ctx.lineTo(550, b2)
    ctx.stroke()
    b2 = b2 + 50
  }

  ctx.strokeRect(0, 200, 250, 250)
  let c2 = 0
  while (c2 < 550) {
    ctx.beginPath()
    ctx.moveTo(c2, 200)
    ctx.lineTo(c2, 450)
    ctx.stroke()
    c2 = c2 + 50
  }

  let d2 = 250
  while (d2 < 450) {
    ctx.beginPath()
    ctx.moveTo(0, d2)
    ctx.lineTo(250, d2)
    ctx.stroke()
    d2 = d2 + 50
  }
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.moveTo(0, 400)
  ctx.lineTo(0, 200)
  ctx.lineTo(250, 150)
  ctx.closePath()
  ctx.fill()*/
}
