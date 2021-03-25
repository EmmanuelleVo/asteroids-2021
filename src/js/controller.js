const controller = {
    keys : { // le nom de la touche et son effet
        'ArrowRight' : Math.PI / 180, // = 1 degré
        'ArrowLeft' : -Math.PI / 180,
        'ArrowUp' : -1,
        //'ArrowDown' : 1
    },
    activeKeys : [],

    init() {
        document.addEventListener('keydown', (e) => {
            // si la touche qu'on a pressée est inclue dans keys (on a extrait les clés de l'objet keys)
            // Càd qu'on limite la touche du clavier à <- et ->
            // + et que la touche n'est pas déjà dans le tableau
            if(Object.keys(this.keys).includes(e.key) && !this.activeKeys.includes(e.key)) {
                e.preventDefault()
                e.stopPropagation()
                this.activeKeys.push(e.key)
            }
        })
        document.addEventListener('keyup', (e) => {
            // si la touche est dans la tableau activeKeys, on la supprime du tableau
            if(this.activeKeys.includes(e.key)) {
                e.preventDefault()
                e.stopPropagation()
                // indice de la touche qui a été pressée dans le tableau activeKeys
                const i = this.activeKeys.indexOf(e.key)
                this.activeKeys.splice(i, 1)
            }
        })

    }

}
export default controller