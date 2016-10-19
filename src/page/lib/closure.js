'use strict'

const Universe = require('./universe.js')
const {SPACE_REGEX} = require('./regexes.js')

const closure = (value, relationship) =>
  __closure(value.trim().split(SPACE_REGEX), relationship)

const __closure = ([...iterable], [...relationship]) => {
  const result = new Universe(iterable)
  for (const from of iterable) {
    const xfrom = new Set(from.trim().split(SPACE_REGEX))
    const xrel = relationship
      .find(({from}) => xfrom.has(from))
    if (xrel) {
      result.add(xrel.to.trim().split(SPACE_REGEX))
      return __closure(result, relationship.filter(x => x !== xrel))
    }
  }
  return result
}

module.exports = closure
