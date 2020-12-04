/**
 * Module for display some content to the page
 * 
 * @module displays
 * @see module:btnForm
 * @see module:inputForm
 * @see module:errorForm
 */

import { btnForm, inputForm, errorForm } from './submitHandler.js'

/**
 * Display the shortened link on the page
 * 
 * @function
 * @param  {string} options.normalLink    The actual link (before we shorten it)
 * @param  {string} options.shortenLink   The shortened link
 * @param  {HTMLUListElement} container   The container that will store the shorten links on the page
 */
export const displayShortlyResult = ({ normalLink, shortenLink }, container) => {
  const resultTemplate = document.createElement('li')
  resultTemplate.classList.add('shortly__result__item')
  resultTemplate.innerHTML =
  `<div class="normal-link">${normalLink}</div>
    <div class="short-link">
     <a rel="noopener" href="${shortenLink}" target="_blank">${shortenLink}</a>
     <button class="btn btn--copy">Copy</button>
     <input type="text" value="${shortenLink}" aria-hidden="true" tabindex="-1" />
    </div>`

  container.appendChild(resultTemplate)
}


/**
 * Display error message on the page
 *
 * @function
 * @param  {string} error_msg The message to display
 */
export const displayError = (error_msg) => {
  errorForm.innerText = error_msg
  errorForm.style.display = 'block'
  inputForm.disabled = true
  btnForm.disabled = true

  setTimeout(() => {
    errorForm.style.display = 'none'
    errorForm.innerText = ''
    inputForm.disabled = false
    btnForm.disabled = false
  }, 3000)
}
