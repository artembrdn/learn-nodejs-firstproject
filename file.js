const path = require('path')
const fs = require('fs')

exports.send = function (filePath, res) {
  const fileName = path.basename(filePath)
  const file = new fs.ReadStream('./files/' + fileName)
  console.log('./files/' + fileName)

  file.pipe(res)
  file.on('open', () => {
    console.log('open')
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + fileName
    })
  })
  file.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.statusCode = 404
      res.end('File not found')
      console.log(err.code)
    } else {
      res.statusCode = 500
      res.end('Server Error')
      console.log(err.code)
    }
  })
  res.on('close', () => {
    console.log('res close')
    file.destroy()
  })
}
