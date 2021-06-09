import controller from "./controller";
import Vector from "./Vector";
import Bullet from "./Bullet";

const ship = {
    size : 20,
    speed : null,
    heading: 0,
    location : null,
    acceleration : null,
    canvas : null,
    ctx : null,
    bulletTimer : -1, // pour ne pas avoir de décalage
    bulletTimerThreshold : 5,
    bullets : [],
    path: null,

    init(canvas, ctx) {
        controller.init()
        this.canvas = canvas
        this.ctx = ctx
        this.location = new Vector(this.canvas.width / 2,this.canvas.height / 2)
        this.speed = new Vector(0,0)
        this.shape = [0,
            -1.5 * this.size / 2,
            this.size / 2,
            0.5 + (this.size * 1.5 / 2),
            -this.size / 2,
            0.5 + (this.size * 1.5 / 2)] // les points du vaissseau
        this.path = new Path2D()
        this.createPath()
    },

    createPath() { // les objets path n'ont pas trait au contexte
        this.path.moveTo(this.shape[0], this.shape[1])
        this.path.lineTo(this.shape[2], this.shape[3])
        this.path.lineTo(this.shape[4], this.shape[5])
        this.path.closePath()
    },

    checkKeys() {
        controller.activeKeys.forEach(activeKey => {
            // évalué à 1 ou -1 | valeur de la clé <- ou ->
            //this.speedX += controller.keys[activeKey] * 0.05
            if (activeKey === 'ArrowUp') {
                this.acceleration = Vector.fromAngle(this.heading)
                this.speed.add(this.acceleration)
            } else if (activeKey === 'ArrowRight' || activeKey === 'ArrowLeft') {
                this.updateHeading(controller.keys[activeKey]) // le mettre à jour avec un certain angle
            } else if (activeKey === ' ') {
                this.bulletTimer++
                if (!(this.bulletTimer % this.bulletTimerThreshold)) { // ça tire
                    this.bullets.push(new Bullet())
                } else {
                    this.bulletTimer // = -1 ne marche pas?
                }
            }
        })
    },

    update() {
        this.checkKeys();
        this.speed.multiply(0.95) // à chaque itération, on réduit la vitesse de 5%
        //this.locationX += this.speedX
        this.location.add(this.speed)

        this.checkEdges()
        this.draw()
    },

    checkEdges() {
        if (this.location.y > this.canvas.height + this.size) { // + le centre du vaisseau
            this.location.y = -this.size // on le repositionne à gauche du canvas
        }
        if (this.location.y < -this.size) {
            this.location.y = this.canvas.height + this.size
        }
        if (this.location.x > this.canvas.width + this.size) { // + le centre du vaisseau
            this.location.x = -this.size // on le repositionne à gauche du canvas
        }
        if (this.location.x < -this.size) {
            this.location.x = this.canvas.width + this.size
        }
    },

    updateHeading(angle) {
      this.heading += angle
    },

    draw() { // Dessin du vaisseau
        this.ctx.save()
        this.ctx.translate(this.location.x , this.location.y)
        this.ctx.rotate(this.heading)
        //this.ctx.beginPath()

        this.ctx.stroke(this.path)
        this.ctx.restore()
}


}

export default ship