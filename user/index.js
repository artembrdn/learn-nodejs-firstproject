const db = require('../db')

class User {
  constructor (name) {
    this.name = name
  }

  hi () {
    console.log(`${db.getPhrase('hi')} ${this.name}`)
  }
}
module.exports = User
