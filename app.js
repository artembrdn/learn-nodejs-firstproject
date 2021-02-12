const server = require('./server.js')
const log = require('./logger.js')(module)
const util = require('util')
server.run()

let test = {
  val:1,
  test:function tess(val){
    console.log(val)
  },
  inspect: function () {
    return 123
  }
}
console.log(util.inspect(test))
console.log(util.format('%s %d %j', 'str', 5345, test))