const http = require('http')
const url = require('url')
// const User = require('./user')
// const db = require('./db')

function run () {

  const server = new http.Server()
  server.listen(8888, '127.0.0.1')

  server.on('request', (req, res) => {
    let urlParsed  = new url.URL(req.url, 'http://' + req.headers.host + '/')
    console.log(req.headers)

    res.setHeader('Cache-control', 'no-cache')
    res.setHeader('Content-Type', ' text/html; charset=utf-8')

    
    if(urlParsed.pathname === '/echo') {
      res.statusCode = 200
      res.end(urlParsed.searchParams.get('message'))
    } else{
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
