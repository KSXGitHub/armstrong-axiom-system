'use strict'
const subset = (container, iterable) =>
  [...iterable].every(item => container.has(item))
module.exports = subset
