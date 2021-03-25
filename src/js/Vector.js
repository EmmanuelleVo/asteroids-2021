export default  class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(vector) { //modifie le vecteur courant // méthode d'instance
        this.x += vector.x
        this.y += vector.y
    }
    multiply(factor) { // méthode d'instance
        this.x *= factor
        this.y *= factor
    }
    static fromAngle(angle, magnitude) { // longueur des vecteurs // méthode de classe
        let mag = 1
        if(typeof magnitude !== 'undefined') { // isset
             mag = magnitude
        }
        return new Vector(mag * Math.cos(angle - Math.PI /2), mag * Math.sin(angle  - Math.PI /2))
    }
}