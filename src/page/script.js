'use strict'

const Database = require('./lib/database.js')
const {universe, relationship, displayUniverse, displayRelationship} = new Database()
const {document: {documentElement}, alert} = window
const outputPanel = documentElement.querySelector('.output-panel')
const inputPanel = documentElement.querySelector('.input-panel')
const outputUniversePanel = outputPanel.querySelector('.universe')
const outputRelationshipPanel = outputPanel.querySelector('.relationship')
const inputUniversePanel = inputPanel.querySelector('.universe')
const inputRelationshipPanel = inputPanel.querySelector('.relationship')
const inputUniverseTextBox = inputUniversePanel.querySelector('input')
const inputUniverseAddConfirm = inputUniversePanel.querySelector('button.add')
const inputUniverseDeleteConfirm = inputUniversePanel.querySelector('button.delete')
const inputUniverseClearConfirm = inputUniversePanel.querySelector('button.clear')
const inputRelationshipFromTextBox = inputRelationshipPanel.querySelector('input.from')
const inputRelationshipToTextBox = inputRelationshipPanel.querySelector('input.to')
const inputRelationshipAddConfirm = inputRelationshipPanel.querySelector('button.add')
const inputRelationshipDeleteConfirm = inputRelationshipPanel.querySelector('button.delete')
const inputRelationshipClearConfirm = inputRelationshipPanel.querySelector('button.clear')
// const controlPanel = bottomPanel.querySelector('.control-panel')

const tryAlert = fn => () => {
  try {
    return fn()
  } catch (error) {
    console.log(error)
    setTimeout(alert, 0, error)
  }
}

inputUniverseAddConfirm.addEventListener('click', tryAlert(() => {
  universe.add(inputUniverseTextBox.value)
  displayUniverse(outputUniversePanel)
}), false)

inputUniverseDeleteConfirm.addEventListener('click', tryAlert(() => {
  universe.delete(inputUniverseTextBox.value)
  displayUniverse(outputUniversePanel)
}), false)

inputUniverseClearConfirm.addEventListener('click', () => {
  universe.clear()
  displayUniverse(outputUniversePanel)
}, false)

inputRelationshipAddConfirm.addEventListener('click', tryAlert(() => {
  relationship.add(inputRelationshipFromTextBox.value, inputRelationshipToTextBox.value)
  displayRelationship(outputRelationshipPanel)
}), false)

inputRelationshipDeleteConfirm.addEventListener('click', tryAlert(() => {
  relationship.delete(inputRelationshipFromTextBox.value, inputRelationshipToTextBox.value)
  displayRelationship(outputRelationshipPanel)
}), false)

inputRelationshipPanel.addEventListener('click', () => {
  relationship.clear()
  displayRelationship(outputRelationshipPanel)
}, false)
