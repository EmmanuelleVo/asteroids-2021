export default  class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(vector) { //modifie le vecteur courant
        this.x += vector.x
        this.y += vector.y
    }
    multiply(factor) {
        this.x *= factor
        this.y *= factor
    }

}