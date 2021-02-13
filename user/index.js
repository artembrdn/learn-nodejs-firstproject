const db = require('../db')
const Error_ = require('../error')

class User {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  static readUser (jsonStr) {
    try {
      const user = JSON.parse(jsonStr)
      if (!user.name) {
        throw new Error_.PropertyRequiredError('name')
      }
      if (!user.age) {
        throw new Error_.PropertyRequiredError('age')
      }
      return new this(user.name, user.age)
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error_.ReadError(err.message, err)
      } else if (err instanceof Error_.ValidationError) {
        throw new Error_.ReadError(err.message, err)
      } else {
        throw err
      }
    }
  }

  hi () {
    console.log(`${db.getPhrase('hi')} ${this.name}`)
  }
}
module.exports = User
