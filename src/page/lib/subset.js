'use strict'
const subset = (iterable, container) =>
  [...iterable].every(item => container.has(item))
module.exports = subset
