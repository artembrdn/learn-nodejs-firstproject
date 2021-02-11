class HttpEror extends Error {
    constructor (mes) {
        super(mes)
        this.name = 'HttpError'
    }
}

throw new HttpEror('123')