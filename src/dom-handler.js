// dom-handler.js

// Pseudocode - DOM class
// TODO: Import reqest-handler
import { requestHandler } from './request-handler'
// import img from '../img/partly-cloudy-day.jpg'

const main = document.querySelector('.main')

class domHandler {
    // TODO: Create fn to read value of icon, call dynamic import with that value and assign resulting image to bg

    // pseudocode

    static async updateBgImg(currentData) {
        const iconName = currentData.icon
        console.log(iconName)
        try {
            const bgImg = await import(`../img/${iconName}.jpg`)
            console.log(bgImg.default)
            main.style.backgroundImage = `url("${bgImg.default}")`
        } catch {
            console.log(`404 ${iconName} not found. Use default image instead`)
            const defaultImg = await import(`../img/fog.jpg`)
            main.style.backgroundImage = `url("${defaultImg.default}")`
        }
    }

    static changeUnits(unitDisplay) {
        const units = requestHandler.units
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
