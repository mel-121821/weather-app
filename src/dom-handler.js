// dom-handler.js

// Pseudocode - DOM class
// TODO: Import reqest-handler
import { requestHandler } from './request-handler'
// import img from '../img/partly-cloudy-day.jpg'

const allUnitDisplays = document.querySelectorAll('span.units')
const main = document.querySelector('.main')
const currentTemp = document.querySelector('.temp > p > span.val')
const currentLocation = document.querySelector('.location')
const currentDescription = document.querySelector('.description')

class domHandler {
    static changeUnits() {
        const units = requestHandler.units
        console.log(allUnitDisplays)
        if (units === 'metric') {
            for (const disp of allUnitDisplays) {
                disp.innerHTML = '&#8451;'
            }
        } else {
            for (const disp of allUnitDisplays) {
                disp.innerHTML = '&#8457;'
            }
        }
    }

    // Note: assigning a string to textConten erases the existing content of hthe element, including the span.

    static displayCurrent(currentData) {
        console.log(currentTemp)
        currentTemp.textContent = currentData.temp
        currentLocation.firstChild.textContent = currentData.resolvedAddress
        currentDescription.firstChild.textContent = currentData.description
    }

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
