import { shortlyResultContainer } from './submitHandler.js'

// Logic for copying the shorten url (based on Event Delegation)
shortlyResultContainer.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('btn--copy')) return

  const targetElement = evt.target
  targetElement.innerText = 'Copied'
  targetElement.classList.add('active')

  setTimeout(() => {
    targetElement.innerText = 'Copy'
    targetElement.classList.remove('active')
  }, 3000)

  // const shortUrl = targetElement.previousElementSibling.innerText
  const textToCopy = targetElement.nextElementSibling
  textToCopy.select()
  document.execCommand('copy')
})
