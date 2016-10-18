'use strict'

const TypedSet = require('./typed-set')
const arrow = ' → '

class Relationship {
  constructor (universe) {
    const convert = (item) => {
      const {from, to} = item
      if (universe.has(from) && universe.has(to)) return String(item)
      throw new Error('Must be in universe')
    }
    const Set = TypedSet(convert)
    const set = new Set()
    return {
      add: (from, to) => set.add(new Element(from, to)),
      delete: (from, to) => set.delete(new Element(from, to)),
      __proto__: this
    }
  }
  static get Relationship () {
    return Relationship
  }
  static get Element () {
    return Element
  }
}

class Element {
  constructor (from, to) {
    return {from, to, __proto__: this}
  }
  toString () {
    return this.from + arrow + this.to
  }
  static fromString (string) {
    return new Element(...string.split(arrow))
  }
}

module.exports = Relationship
