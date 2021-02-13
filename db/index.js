const log = require('../logger.js')(module)
const Error_ = require('../error')
class Db {
  connect () {
    this.phrases = require('./phrases')
    log(this.getPhrase('connected'))
  }

  getPhrase (name) {
    try {
      return this.phrases[name]
    } catch (err) {
      throw new Error_.DbError(err.message,
        new Error('Отсутствует ключ в словаре :' + name))
    }
  }
}
module.exports = new Db()
