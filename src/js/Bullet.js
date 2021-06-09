import ship from "./ship";
import Vector from "./Vector";
import garbageManager from "./garbageManager";

export default class Bullet {
    constructor() {
        this.ctx = ship.ctx
        // référence à la location du ship, n'est pas une nouvelle valeur
        this.location = new Vector(ship.location.x, ship.location.y) // c'est un objet (ship.location); pour ne pas modifier la location du ship si on modifie cette location via le update
        this.heading = ship.heading // valeur et non objet
        this.size = 4
        this.speed = new Vector(ship.speed.x, ship.speed.y) // car on peut tirer en se déplacant
        this.acceleration = Vector.fromAngle(this.heading, 10)
        this.speed.add(this.acceleration)
    }
    update() {
        this.location.add(this.speed)
        this.checkEdges()
        this.draw()
    }
    checkEdges() {
        if (
            (this.location.y > ship.canvas.height) ||
            (this.location.y < 0) ||
            (this.location.x > ship.canvas.width) ||
            (this.location.x < 0)
        ) {
            garbageManager.remove(this, ship.bullets)
        }
    }
    draw() {
        this.ctx.save()
        this.ctx.translate(this.location.x, this.location.y)
        this.ctx.rotate(this.heading)
        this.ctx.fillRect(-this.size / 2, -this.size *3, this.size, this.size)
        this.ctx.restore()
    }
}