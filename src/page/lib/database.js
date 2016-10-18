'use strict'

const TypedSet = require('./typed-set')
const Universe = TypedSet(String)
const Relationship = TypedSet(String)

function Database () {
  const universe = new Universe()
  const relationship = new Relationship()
  const createDisplay = set => panel => {
    const document = panel.ownerDocument
    const namespace = panel.namespaceURI
    const empty = panel.querySelector('.empty').classList
    const content = panel.querySelector('.content')
    if (set.size) {
      empty.add('hidden')
      const span = document.createElementNS(namespace, 'span')
      span.textContent = '{ ' + [...set].join(', ') + ' }'
      content.appendChild(span)
    } else {
      empty.remove('hidden')
      content.textContent = ''
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
