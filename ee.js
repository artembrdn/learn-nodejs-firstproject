const EventEmitter = require('events')

class Job extends EventEmitter {
  constructor (jobname) {
    super()
    this.name = jobname
  }

  action (data) {
    this.emit('data', data)
  }
}

const jobParser = new Job('parser')

jobParser.addListener('data', (mess) => {
  console.log(mess)
})

jobParser.addListener('data', (mess) => {
  console.log('__' + mess)
})

jobParser.action('test data')

console.log(process.memoryUsage().heapUsed)
