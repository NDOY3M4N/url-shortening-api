// Importing modules here
import { urlSaved, shortlyResultContainer } from './modules/submitHandler.js'
import { displayShortlyResult } from './modules/displays.js'

// On page load, we check for previous short links that we generated

urlSaved.forEach((url) => displayShortlyResult(url, shortlyResultContainer))
