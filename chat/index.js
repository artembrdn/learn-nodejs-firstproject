const resArray = []

function publish (reqCurrent, resCurrent) {
  let postBody = ''
  reqCurrent
    .on('data', function (data) {
      postBody += data
      if (postBody.length > 10e5) {
        reqCurrent.removeAllListeners('end')
        console.log('Post size is too large ' + postBody.length)
        resCurrent.writeHead(413, { 'Content-Type': 'text/plain' }).end()
      }
    })
    .on('end', function () {
      console.log('reqCurrent end')
      postBody = JSON.parse(postBody)
      publishMessage(postBody.message)
      resCurrent.setHeader('Content-Type', ' text/html; charset=utf-8')
      resCurrent.end('ok')
    })
}
function publishMessage (message) {
  for (let index = 0; index < resArray.length; index++) {
    const res = resArray[index]
    res.setHeader('Cache-control', 'no-cache')
    res.setHeader('Content-Type', ' text/html; charset=utf-8')
    res.statusCode = 200
    res.end(message)
  }
  resArray.length = 0
}
function subscribe (req, res) {
  resArray.push(res)
}

module.exports.publish = publish
module.exports.subscribe = subscribe
