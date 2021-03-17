import controller from "./controller";

const ship = {

    size : 20,
    speedX : 0,
    speedY : 0,
    locationX : 0,
    locationY : 0,
    canvas : null,
    ctx : null,

    init(canvas, ctx) {
        controller.init()
        this.canvas = canvas
        this.ctx = ctx
        this.locationX = this.canvas.width / 2
        this.locationY = this.canvas.height / 2
    },
    update() {
        controller.activeKeys.forEach(activeKey => {
            // évalué à 1 ou -1 | valeur de la clé <- ou ->
            //this.speedX += controller.keys[activeKey] * 0.05
            this.speedY += controller.keys[activeKey] * 0.05
        })

        //this.locationX += this.speedX
        this.locationY += this.speedY
        /*if (this.locationX > this.canvas.width + this.size) { // + le centre du vaisseau
            this.locationX = -this.size // on le repositionne à gauche du canvas
        }*/
        if (this.locationY > this.canvas.height + this.size) {
            this.locationY = -this.size
        }
        if (this.locationY < -this.size) {
            this.locationY = this.canvas.height + this.size
        }
        this.draw()
},
    draw() { // Dessin du vaisseau
        this.ctx.save()
        this.ctx.rotate(0)
        this.ctx.translate(this.canvas.width / 2, this.locationY)
        this.ctx.beginPath()
        this.ctx.moveTo(0, -1.5 * this.size / 2)
        this.ctx.lineTo(this.size / 2, 0.5 + (this.size * 1.5 / 2))
        this.ctx.lineTo(-this.size / 2, 0.5 + (this.size * 1.5 / 2))
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.restore()
}


}

export default ship