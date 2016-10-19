'use strict'

const Universe = require('./universe.js')
const subset = require('./subset.js')
const {SPACE_REGEX} = require('./regexes.js')

const closure = (value, relationship) =>
  __closure(value.trim().split(SPACE_REGEX), relationship)

const __closure = ([...iterable], relationship) => {
  const result = new Universe(iterable)
  for (const {from, to} of relationship) {
    if (subset(from.trim().split(SPACE_REGEX), result)) {
      result.add(...to.trim().split(SPACE_REGEX))
    }
  }
  return result.size === iterable.length ? result : __closure(result, relationship)
}

module.exports = closure
