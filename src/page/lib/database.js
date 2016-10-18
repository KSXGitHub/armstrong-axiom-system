'use strict'

const Universe = require('./universe.js')
const Relationship = require('./relationship.js')

function Database () {
  const universe = new Universe()
  const relationship = new Relationship(universe)
  const createDisplay = set => panel => {
    const document = panel.ownerDocument
    const namespace = panel.namespaceURI
    const empty = panel.querySelector('.empty').classList
    const content = panel.querySelector('.content')
    const {firstElementChild} = content
    firstElementChild && content.removeChild(firstElementChild)
    if (set.size) {
      empty.add('hidden')
      const span = document.createElementNS(namespace, 'span')
      span.textContent = set
      content.appendChild(span)
    } else {
      empty.remove('hidden')
    }
  }
  const displayUniverse = createDisplay(universe)
  const displayRelationship = createDisplay(relationship)
  return {
    universe,
    relationship,
    createDisplay,
    displayUniverse,
    displayRelationship,
    __proto__: this
  }
}

module.exports = class extends Database {}
