const http = require('http')
const User = require('./user')
const db = require('./db')

function run () {
  // db.connect()
  // const a = new User('Петя')
  // a.hi()

  const server = new http.Server()
  server.listen(8888, '127.0.0.1')

  let counter = 0
  let emit = server.emit
  server.emit = function (ev) {
    console.log(ev)
    emit.apply(server, arguments)
  }

  server.on('request', (req, res) => {
    res.end('Привет в ' + counter++ + ' раз')
  })
}

if (module.parent) {
  module.exports.run = run
} else {
  run()
}
