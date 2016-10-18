'use strict'

const DONOTHING = () => {}

function create (convert = DONOTHING, base = Set) {
  class TypedSet extends base {
    constructor (...superiterable) {
      super()
      for (const iterable of superiterable) {
        this.add(...iterable)
      }
    }
    add (...iterable) {
      for (const item of iterable) {
        super.add(convert(item))
      }
    }
    delete (...iterable) {
      for (const item of iterable) {
        super.delete(convert(item))
      }
    }
  }
  return TypedSet
}

module.exports = create
