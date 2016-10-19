'use strict'
const TypedSet = require('./typed-set.js')
const convert = item => {
  const str = String(item)
  if (str) return str
  throw new RangeError('Must not be empty')
}
const Universe = TypedSet(convert)
module.exports = Universe
