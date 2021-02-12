const User = require('./user')
const db = require('./db')

function run () {
  db.connect()
  const a = new User('Петя')
  a.hi()
}

if (module.parent) {
  module.exports.run = run
} else {
  run()
}
