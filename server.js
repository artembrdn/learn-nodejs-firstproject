const http = require('http')
const url = require('url')
const file = require('./file')
// const User = require('./user')
// const db = require('./db')

function run () {
  const server = new http.Server()
  server.listen(8888, '127.0.0.1')

  server.on('request', (req, res) => {
    const urlParsed = new url.URL(req.url, 'http://' + req.headers.host + '/')

    if (urlParsed.pathname === '/echo') {
      res.setHeader('Cache-control', 'no-cache')
      res.setHeader('Content-Type', ' text/html; charset=utf-8')
      res.statusCode = 200
      res.end(urlParsed.searchParams.get('message'))
    } else if (urlParsed.pathname.indexOf('/download/') === 0) {
      file.send(urlParsed.pathname, res)
    } else {
      res.statusCode = 404
      res.end('Страница не найдена')
    }
  })
}

if (module.parent) {
  module.exports.run = run
} else {
  run()
}
