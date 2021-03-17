const controller = {
    keys : { // le nom de la touche et son effet
        //'ArrowRight' : 1,
        //'ArrowLeft' : -1,
        'ArrowUp' : -1,
        //'ArrowDown' : 1
    },
    activeKeys : [],

    init() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            e.stopPropagation()
            // si la touche qu'on a pressée est inclue dans keys (on a extrait les clés de l'objet keys)
            // Càd qu'on limite la touche du clavier à <- et ->
            // + et que la touche n'est pas déjà dans le tableau
            if(Object.keys(this.keys).includes(e.key) && !this.activeKeys.includes(e.key)) {
                this.activeKeys.push(e.key)
            }
        })
        document.addEventListener('keyup', (e) => {
            e.preventDefault()
            e.stopPropagation()
            // si la touche est dans la tableau activeKeys, on la supprime du tableau
            if(this.activeKeys.includes(e.key)) {
                // indice de la touche qui a été pressée dans le tableau activeKeys
                const i = this.activeKeys.indexOf(e.key)
                this.activeKeys.splice(i, 1)
            }
        })

    }

}
export default controller