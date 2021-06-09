import asteroidShapes from "./asteroidShapes";
import Vector from "./Vector";

export default class Asteroid {
    constructor(canvas, ctx, parent = null) {
        this.canvas = canvas
        this.ctx = ctx
        this.rotation = 0
        if (!parent) {
            this.rotationSpeed = Math.random() / 30
            this.size = 7 + Math.random() * 5
            this.location = new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
        } else { // astéroide enfant
            this.rotationSpeed = parent.rotationSpeed * 2
            this.size = parent.size / 2
            this.location = new Vector(parent.location.x, parent.location.y)
            console.log(parent.location.x)
        }
        this.heading = Math.random() * Math.PI * 2 // entre 0° et 360°
        this.speed = new Vector(0,0)
        this.acceleration = Vector.fromAngle(this.heading, 2 + Math.random() * 2)
        this.speed.add(this.acceleration)
        const asCount = asteroidShapes.length
        const i = Math.floor(Math.random() * asCount) // indice entre 0 et asCount-1
        this.shape = asteroidShapes[i]
        this.path = new Path2D()
        this.createPath()

    }

    createPath() {
        this.path.moveTo(this.shape[0] * this.size, this.shape[1] * this.size)
        let i = 2
        const shapePointsCount = this.shape.length
        while(i <= shapePointsCount - 2) {
            this.path.lineTo(this.shape[i] * this.size, this.shape[++i] * this.size) // on incrémente d'abord puis on la consomme
            i++
        }
        this.ctx.closePath()
    }

    update() {
        this.location.add(this.speed)
        this.rotation += this.rotationSpeed
        this.checkEdges()
        this.draw()

    }

    checkEdges() {
        const offset = 50 //pour que les astéroides ne disparraissent pas dès que leurs centres touchent le bord
        if (this.location.y > this.canvas.height + offset) {
            this.location.y = -offset
        }
        if (this.location.y < -offset) {
            this.location.y = this.canvas.height + offset
        }
        if (this.location.x > this.canvas.width + offset) {
            this.location.x = -offset
        }
        if (this.location.x < -offset) {
            this.location.x = this.canvas.width + offset
        }
    }

    draw() {
        this.ctx.save()
        this.ctx.translate(this.location.x, this.location.y)
        this.ctx.rotate(this.rotation)
        //this.ctx.beginPath()

        this.ctx.fill(this.path)
        this.ctx.restore()
    }

}