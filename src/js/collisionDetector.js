const collisionDetector = {
    detectBulletAsteroidCollision(ctx, ship, asteroids) {
        for (let i = 0; i < ship.bullets.length; i++) {
            for (let j = 0; j < asteroids.length; j++) {
                if (ctx.isPointInPath(asteroids[j].path,
                    ship.bullets[i].location.x - asteroids[j].location.x,
                    ship.bullets[i].location.y - asteroids[j].location.y)) { // enlever de l'astéroide la position utilisée pour la translation, la coordonnée de l'astéroide
                    return {bullet: ship.bullets[i], asteroid: asteroids[j]}
                }
            }
        }
        return false
    },

    detectShipAsteroidCollision(ctx, ship, asteroids) {
        for (let j = 0; j < asteroids.length; j++) {
            for(let i = 0; i < ship.shape.length; i+=2) {
                if (ctx.isPointInPath(asteroids[j].path,
                    ship.location.x - ship.shape[i] - asteroids[j].location.x, // points avec indice pair comparés avec le path de l'astéroide
                    ship.location.y - ship.shape[i+1] - asteroids[j].location.y)) { // points avec indice impair
                    return true
                }
            }
        }
        return false
    }
}

export default collisionDetector