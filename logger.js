module.exports = function (module) {
  return function () {
    console.log(`${module.filename} ${[].slice.call(arguments)}`)
  }
}