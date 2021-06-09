import ship from './ship'
import Asteroid from "./Asteroid";
import collisionDetector from "./collisionDetector";
import garbageManager from "./garbageManager";

const app = {
    mainElt: null,
    canvasElt: null,
    canvasEltDimension: {
        width: 640,
        height: 480
    },
    ctx: null,
    asteroids: [],
    asteroidsCount: 4,
    requestId: 0,

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

        for (let i = 0; i < this.asteroidsCount; i++) {
            this.asteroids.push(new Asteroid(this.canvasElt, this.ctx))
        }

        ship.init(this.canvasElt, this.ctx)
        this.animate()
    },

    animate() { //boucle de rendu
        this.requestId = window.requestAnimationFrame(() => {
            this.animate()
        })
        this.ctx.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
        ship.update()
        ship.bullets.forEach((bullet) => {
            bullet.update()
        })
        this.asteroids.forEach(asteroid => {
            asteroid.update()
        })
        if (ship.bullets.length && this.asteroids.length) { //collision + suppression
            const collidingPair = collisionDetector.detectBulletAsteroidCollision(this.ctx, ship, this.asteroids)
            if (collidingPair) {
                garbageManager.remove(collidingPair.bullet, ship.bullets)
                if (collidingPair.asteroid.size > 4) {
                    // créer de nouveaux astéroides à partir de l'astéroide touchée par la balle puis supprimer l'astéroide
                    this.generateSmallAsteroids(collidingPair.asteroid)
                }
                garbageManager.remove(collidingPair.asteroid, this.asteroids)
            }
        }
        if (ship && this.asteroids.length) {
            if(collisionDetector.detectShipAsteroidCollision(this.ctx, ship, this.asteroids)) {
                // arrêter l'animation
                window.cancelAnimationFrame(this.requestId)
            }
        }
    },

    generateSmallAsteroids(parentAsteroid) {
        const childrenCount = Math.floor(2 + Math.random() * 3)
        for (let i = 0; i < childrenCount; i++) {
            this.asteroids.push(new Asteroid(this.canvasElt, this.ctx, parentAsteroid))
        }
    }
}

app.init()
