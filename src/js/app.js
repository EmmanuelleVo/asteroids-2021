import ship from './ship'

const app = {
    mainElt : null,
    canvasElt : null,
    canvasEltDimension : {
        width : 640,
        height : 480
    },
    ctx : null,
    init() {
        this.mainElt = document.getElementById('asteroids')
        document.body.removeChild(this.mainElt)

        this.canvasElt = document.createElement('canvas')
        document.body.insertAdjacentElement("afterbegin", this.canvasElt)
        this.canvasElt.width = this.canvasEltDimension.width
        this.canvasElt.height = this.canvasEltDimension.height

        this.ctx = this.canvasElt.getContext('2d')
        this.ctx.strokeStyle = '#fff'
        this.ctx.fillStyle = '#fff'

        ship.init(this.canvasElt, this.ctx)
        this.animate()
    },

    animate() { //boucle de rendu
        window.requestAnimationFrame(() => {
            this.animate()
        })
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
        ship.update()
        ship.bullets.forEach((bullet) => {
            bullet.update()
        })
    }
}

const asteroidSize = 20

function asteroidDraw() { // Dessin de l'astéroide
    ctx.save()
    ctx.rotate(0.1)
    ctx.translate(50,50) // par rapport au dernier contexte, donc au centre
    ctx.strokeRect(-asteroidSize / 2, -asteroidSize / 2, asteroidSize, asteroidSize)
    ctx.restore()
}

app.init()
