/**
 * Module relative to shorten the URLs
 *
 * @module submitHandler
 * @see module:displays
 */
import { displayShortlyResult, displayError } from './displays.js'

const form = document.querySelector('.shortly__form')
const formBlock = form.querySelector('.shortly__form__block')

/** @type {Array} The URLs stored in localStorage */
export let urlSaved = JSON.parse(localStorage.getItem('savedURLs')) || []

/** @type {HTMLUListElement} The container that will store the shorten links on the page */
export const shortlyResultContainer = document.querySelector('.shortly__result')
/** @type {HTMLButtonElement} The button for submitting the form */
export const btnForm = form.querySelector('.btn--form')
/** @type {HTMLInputElement} The input text used by the user to shorten the URL */
export const inputForm = form.urlToShorten
/** @type {HTMLSpanElement} Element used to show some feedback when something went wrong */
export const errorForm = inputForm.nextElementSibling

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  // Then check if the value submitted is a valid URL
  if (validURL(inputForm.value.trim())) shortly(inputForm.value.trim())
  else displayError('Please enter a valid link')
})

/**
 * Function to shorten the URL submitted using the API
 * @param  {string} inputValue The URL to shorten
 */
const shortly = async (inputValue) => {
  // We check if the submitted was not previously shorten by the API
  if (checkDuplicateURL(inputValue)) {
    displayError('You already submitted this link')
    return
  }
  // We add a spinner to the input when we're fetching the results
  formBlock.classList.add('loading')
  btnForm.disabled = true

  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
  const data = await response.json()

  if (!data.ok) {
    displayError(data.error)
    return
  } else {
    // We remove the spinner to the input when the data is loaded
    formBlock.classList.remove('loading')
    btnForm.disabled = false

    // We save to short links to the localStorage of the browser
    const result = {
      normalLink: inputValue,
      shortenLink: data.result.full_short_link,
    }
    urlSaved.push(result)
    localStorage.setItem('savedURLs', JSON.stringify(urlSaved))

    // we display the data to the page
    displayShortlyResult(result, shortlyResultContainer)

    // We reset the form
    form.reset()
  }
}

/**
 * Validate URLs submitted by the user
 * 
 * @function
 * @param  {string}  url    The URL to validate
 * @return {(null|Array)}
 */
const validURL = (url) => {
  const regexURL = /^(http(s)?:\/\/)?(www.)?(\w+(-\w*)*)\.\w+(:\d*)?\/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$/

  return url.match(regexURL)
}

/**
 * Check duplicate links on the localStorage
 * 
 * @function
 * @param  {string} myUrl) [description]
 * @return {(undefined|Object)}
 */
const checkDuplicateURL = (myUrl) => urlSaved.find((url) => url.normalLink === myUrl)

// ================================================================

// Logic for clearing the results by using the MutationObserver API
const shortlyClearResults = document.querySelector('.shortly__clear .btn--transparent')
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes)
      shortlyClearResults.classList.add('active')
    
    if (mutation.removedNodes.length >= 1)
      shortlyClearResults.classList.remove('active')
  })
})

observer.observe(shortlyResultContainer, { childList: true })

shortlyClearResults.addEventListener('click', () => {
  const results = shortlyResultContainer.childNodes
  localStorage.clear()
  urlSaved = []
  results.forEach((result) => {
    result.classList.add('remove')
    setTimeout(() => shortlyResultContainer.removeChild(result), 800)
  })
})
