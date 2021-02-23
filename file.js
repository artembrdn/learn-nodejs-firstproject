const path = require('path')
const fs = require('fs')
const mime = require('mime')
const PUBLIC_DIR = path.join(__dirname, 'public')

exports.send = function (filePath, res) {
  let fileName
  try {
    fileName = decodeURIComponent(path.basename(filePath))
  } catch (error) {
    res.statusCode = 400
    res.setHeader('Content-Type', ' text/html; charset=utf-8')
    res.end('Bad request')
  }
  const pathDir = path.dirname(filePath)
  let fileLocation
  let attachment = false
  if (pathDir.indexOf('/download') === 0) {
    fileLocation = `./files/${fileName}`
    attachment = true
  } else {
    fileLocation = path.normalize(path.join(PUBLIC_DIR, filePath))
    if (fileLocation.indexOf(PUBLIC_DIR) !== 0) {
      res.statusCode = 400
      res.setHeader('Content-Type', ' text/html; charset=utf-8')
      res.end('Bad request')
    }
  }

  try {
    sendFile(fileLocation, fileName, attachment, res)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', ' text/html; charset=utf-8')
    res.end('Bad request')
  }
}

function sendFile (filePath, fileName, attachment, res) {
  const file = new fs.ReadStream(filePath)

  file.pipe(res)
  file.on('open', () => {
    console.log('open')
    const fileMime = mime.getType(filePath)
    res.writeHead(200, {
      'Content-Type': fileMime + '; charset=utf-8'
    })
    if (attachment) {
      res.writeHead(200, {
        'Content-Disposition': 'attachment; filename=' + fileName
      })
    }
  })
  file.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.statusCode = 404
      res.setHeader('Content-Type', ' text/html; charset=utf-8')
      res.end(`File ${fileName} not found`)
      console.log(err.code)
    } else {
      res.statusCode = 500
      res.end('Server Error')
      console.log(err.code)
    }
  })
  file.on('close', () => {
    console.log('file close')
  })
  res.on('close', () => {
    console.log('res close')
    file.destroy()
  })
  res.on('error', () => {
    console.log('res error')
    file.destroy()
  })
}
