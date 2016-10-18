'use strict'

const Universe = require('./universe.js')
const {SPACE_REGEX} = require('./regexes.js')

const closure = (value, relationship) => {
  const result = new Universe(value.split(SPACE_REGEX))
  let loop = true
  while (loop) {
    for (const {from, to} of relationship) {
      let subset = true
      for (const item of from.trim().split(SPACE_REGEX)) {
        if (!result.has(item)) {
          subset = false
          break
        }
      }
      if (subset) {
        result.add(...to.trim().split(SPACE_REGEX))
      } else {
        loop = false
      }
    }
  }
  return result
}

module.exports = closure
