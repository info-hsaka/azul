/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

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
  let a = 350
  while (a < 550) {
    ctx.beginPath()
    ctx.moveTo(a, 200)
    ctx.lineTo(a, 450)
    ctx.stroke()
    a = a + 50
  }
  let b = 250
  while (b < 450) {
    ctx.beginPath()
    ctx.moveTo(300, b)
    ctx.lineTo(550, b)
    ctx.stroke()
    b = b + 50
  }

  ctx.strokeRect(0, 200, 250, 250)
  let c = 0
  while (c < 550) {
    ctx.beginPath()
    ctx.moveTo(c, 200)
    ctx.lineTo(c, 450)
    ctx.stroke()
    c = c + 50
  }

  let d = 250
  while (d < 450) {
    ctx.beginPath()
    ctx.moveTo(0, d)
    ctx.lineTo(250, d)
    ctx.stroke()
    d = d + 50
  }
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.moveTo(0, 400)
  ctx.lineTo(0, 200)
  ctx.lineTo(200, 200)
  ctx.closePath()
  ctx.fill()
}
