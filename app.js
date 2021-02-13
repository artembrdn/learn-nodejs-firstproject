const server = require('./server.js')
const User = require('./user')
const Error_ = require('./error')
// const log = require('./logger.js')(module)
server.run()

try {
  const userTest = User.readUser('{"name":"Artem","age":30}')
  console.log(userTest)
  userTest.hi()
} catch (err) {
  if (err instanceof Error_.ReadError) {
    console.log('Ошибка чтения : ' + err.cause)
  } else if (err instanceof Error_.DbError) {
    console.log('Ошибка БД : ' + err.cause)
  } else {
    throw err
  }
}
