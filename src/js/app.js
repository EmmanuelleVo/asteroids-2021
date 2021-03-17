const main = document.getElementById('asteroids')
document.body.removeChild(main)

const canvas = document.createElement('canvas')
document.body.insertAdjacentElement("afterbegin", canvas)
canvas.width = 640
canvas.height = 480

const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#fff'

const shipSize = 20

ctx.beginPath()
ctx.moveTo(canvas.width/2, canvas.height/2)
ctx.lineTo(canvas.width/2 + shipSize/2, 0.5 + (canvas.height/2 + 1.5 * shipSize))
ctx.lineTo(canvas.width/2 - shipSize/2, 0.5 + (canvas.height/2 + 1.5 * shipSize))
ctx.closePath()
ctx.stroke()


