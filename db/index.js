const log = require('../logger.js')(module)
class Db {
  connect () {
    this.phrases = require('./phrases')
    log(this.getPhrase('connected'))
  }

  getPhrase (name) {
    if (this.phrases && this.phrases[name]) {
      return this.phrases[name]
    }

    return ''
  }
}
module.exports = new Db()
