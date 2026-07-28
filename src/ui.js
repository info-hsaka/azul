
export function draw(state) {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	// draw here
ctx.strokeRect(0,0, 500, 500)
let a = 100
while(a < 500)
	{


ctx.beginPath()
ctx.moveTo(a,0)
ctx.lineTo(a, 500)
ctx.stroke()
a= a + 100
}
let b = 100
while(b < 500)
	{


ctx.beginPath()
ctx.moveTo(0, b)
ctx.lineTo(500, b)
ctx.stroke()
b= b + 100
}
}