'use strict'

const Database = require('./lib/database.js')
const closure = require('./lib/closure.js')
const {SPACE_REGEX} = require('./lib/regexes.js')
const {universe, relationship, displayUniverse, displayRelationship} = new Database()
const {document: {documentElement}, alert} = window
const outputPanel = documentElement.querySelector('.output-panel')
const inputPanel = documentElement.querySelector('.input-panel')
const controlPanel = documentElement.querySelector('.control-panel')
const outputUniversePanel = outputPanel.querySelector('.universe')
const outputRelationshipPanel = outputPanel.querySelector('.relationship')
const outputClosurePanel = outputPanel.querySelector('.closure')
const inputUniversePanel = inputPanel.querySelector('.universe')
const inputRelationshipPanel = inputPanel.querySelector('.relationship')
const inputClosurePanel = inputPanel.querySelector('.closure')
const inputUniverseTextBox = inputUniversePanel.querySelector('input')
const inputUniverseAddConfirm = inputUniversePanel.querySelector('button.add')
const inputUniverseDeleteConfirm = inputUniversePanel.querySelector('button.delete')
const inputUniverseClearConfirm = inputUniversePanel.querySelector('button.clear')
const inputRelationshipTextBox = inputRelationshipPanel.querySelector('input')
const inputRelationshipAddConfirm = inputRelationshipPanel.querySelector('button.add')
const inputRelationshipDeleteConfirm = inputRelationshipPanel.querySelector('button.delete')
const inputRelationshipClearConfirm = inputRelationshipPanel.querySelector('button.clear')
const inputClosureTextBox = inputClosurePanel.querySelector('input')
const inputClosureCalculateConfirm = inputClosurePanel.querySelector('button.calc')
const controlClearAllButton = controlPanel.querySelector('.clear button')
const ENTER_KEY = '\n'.charCodeAt()

const tryAlert = fn => () => {
  try {
    return fn()
  } catch (error) {
    console.log(error)
    setTimeout(alert, 0, error)
  }
}

const linkTextBoxButton = (textbox, add, del) => {
  textbox.addEventListener('keydown', ({keyCode, shiftKey}) => {
    if (keyCode === ENTER_KEY) {
      (shiftKey ? del : add).click()
    }
  }, false)
}

linkTextBoxButton(inputUniverseTextBox, inputUniverseAddConfirm, inputUniverseDeleteConfirm)
linkTextBoxButton(inputRelationshipTextBox, inputRelationshipAddConfirm, inputRelationshipDeleteConfirm)
linkTextBoxButton(inputClosureTextBox, inputClosureCalculateConfirm, inputClosureCalculateConfirm)

inputUniverseAddConfirm.addEventListener('click', tryAlert(() => {
  universe.add(...inputUniverseTextBox.value.trim().split(SPACE_REGEX))
  inputUniverseTextBox.value = ''
  displayUniverse(outputUniversePanel)
}), false)

inputUniverseDeleteConfirm.addEventListener('click', tryAlert(() => {
  universe.delete(...inputUniverseTextBox.value.trim().split(SPACE_REGEX))
  inputUniverseTextBox.value = ''
  displayUniverse(outputUniversePanel)
}), false)

inputUniverseClearConfirm.addEventListener('click', () => {
  universe.clear()
  displayUniverse(outputUniversePanel)
}, false)

inputRelationshipAddConfirm.addEventListener('click', tryAlert(() => {
  relationship.add(...inputRelationshipTextBox.value.trim().split(', '))
  inputRelationshipTextBox.value = ''
  displayRelationship(outputRelationshipPanel)
}), false)

inputRelationshipDeleteConfirm.addEventListener('click', tryAlert(() => {
  relationship.delete(...inputRelationshipTextBox.value.trim().split(','))
  inputRelationshipTextBox.value = ''
  displayRelationship(outputRelationshipPanel)
}), false)

inputRelationshipClearConfirm.addEventListener('click', () => {
  relationship.clear()
  displayRelationship(outputRelationshipPanel)
}, false)

inputClosureCalculateConfirm.addEventListener('click', () => {
  const result = closure(inputClosureTextBox.value.trim(), relationship)
  const empty = outputClosurePanel.querySelector('.empty').classList
  const content = outputClosurePanel.querySelector('.content')
  if (result.size) {
    empty.add('hidden')
    content.innerHTML = '<span>' + result + '</span>'
  } else {
    empty.remove('hidden')
    content.textContent = ''
  }
}, false)

controlClearAllButton.addEventListener('click', () => {
  inputUniverseClearConfirm.click()
  inputRelationshipClearConfirm.click()
}, false)
