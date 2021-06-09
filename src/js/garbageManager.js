const garbageManager = {

    remove(obj, someArray) {
        const i = someArray.indexOf(obj)
        someArray.splice(i, 1)
    }


}

export default garbageManager