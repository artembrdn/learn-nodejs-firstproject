const phrases = require('./ru')
// exports
class User {
  constructor (name) {
    this.name = name
  }

  hi () {
    console.log(`${phrases.hello} ${this.name}`)
  }
}
module.exports = User
