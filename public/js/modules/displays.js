import { btnForm, inputForm, errorForm } from './submitHandler.js'

// Function to display the short url
export const displayShortlyResult = ({ normalLink, shortenLink }, container) => {
  const resultTemplate = document.createElement('li')
  resultTemplate.classList.add('shortly__result__item')
  resultTemplate.innerHTML = `
    <li class="shortly__result__item">
      <div class="normal-link">${normalLink}</div>
      <div class="short-link">
       <a href="${shortenLink}" target="_blank">${shortenLink}</a>
       <button class="btn btn--copy">Copy</button>
       <input type='text' value="${shortenLink}" />
      </div>
    </li>
  `

  container.appendChild(resultTemplate)
}


// Function to display error message on the UI
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
