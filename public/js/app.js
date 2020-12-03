// Importing modules here
import { urlSaved, shortlyResultContainer } from './modules/submitHandler.js'
import { displayShortlyResult } from './modules/displays.js'

// On page load, we check for previous short links that we generated
// NB: For the 'clear result' button to show up on the page,
//  I had to put a setTimeout when calling the
//  'displayShortlyResult' on page load.
urlSaved.forEach((url) =>
  setTimeout(() => displayShortlyResult(url, shortlyResultContainer), 100)
)
