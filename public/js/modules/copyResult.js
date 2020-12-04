/**
 * Module for copying a text in our clipboard
 *
 * @module copyResult
 * @see  module:shortlyResultContainer
 */

import { shortlyResultContainer } from './submitHandler.js'

// (Implementation based on Event Delegation)
shortlyResultContainer.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('btn--copy')) return

  const targetElement = evt.target
  targetElement.innerText = 'Copied'
  targetElement.classList.add('active')

  setTimeout(() => {
    targetElement.innerText = 'Copy'
    targetElement.classList.remove('active')
  }, 3000)

  const textToCopy = targetElement.nextElementSibling
  textToCopy.select()
  document.execCommand('copy')
  textToCopy.blur()
})
