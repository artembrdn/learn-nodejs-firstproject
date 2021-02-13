class HttpEror extends Error {
  constructor (mes) {
    super(mes)
    this.name = 'HttpError'
  }
}

class DbError extends Error {
  constructor (message, cause) {
    super(message)
    this.cause = cause
    this.name = 'DBError'
  }
}
class ReadError extends Error {
  constructor (message, cause) {
    super(message)
    this.cause = cause
    this.name = 'ReadError'
  }
}

class ValidationError extends ReadError {}
class PropertyRequiredError extends ValidationError {
  constructor (property) {
    super('Отсутствует свойство : ' + property)
    this.property = property
    this.name = this.constructor.name
  }
}

module.exports.HttpEror = HttpEror
module.exports.DbError = DbError
module.exports.ReadError = ReadError
module.exports.ValidationError = ValidationError
module.exports.PropertyRequiredError = PropertyRequiredError
