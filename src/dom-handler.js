// dom-handler.js

// Pseudocode - DOM class
// TODO: Import reqest-handler
import { requestHandler } from './request-handler'

const unitDisplay = document.querySelector('.units span')

class domHandler {
    static changeUnits() {
        console.log(unitDisplay)
        const units = requestHandler.getUnits()
        if (units === 'metric') {
            unitDisplay.innerHTML = '&#8451;'
        } else {
            unitDisplay.innerHTML = '&#8457;'
        }
    }
}

export { domHandler }

// function updateDisplay()
// have subscribed to return of the obj
// call all fns that manipulate the DOM

// function setBgImg()
// get icon name from returned obj
// use name of icon to search visual assets obj
// display corresponding img

// function displayCurrent()
// get data from currentWeather fetch obj
// populate display

// function display7DayForcast()
// get data from 7DayForcast fetch obj
// populate display

// TODO: Research dynamic imports for info on how to implement
// function emojiHandler()
// ???
