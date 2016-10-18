'use strict'

const Universe = require('./universe.js')
const {SPACE_REGEX} = require('./regexes.js')

const closure = (value, relationship) => {
  const result = new Universe([value])
  let loop = true
  while (loop) {
    for (const {from, to} of relationship) {
      let subset = true
      const list = from.split(SPACE_REGEX)
      for (const item of list) {
        if (!result.has(item)) {
          subset = false
          break
        }
      }
      if (subset) {
        result.add(...list)
      } else {
        loop = false
      }
    }
  }
}

module.exports = closure
