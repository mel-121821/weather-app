// dom-handler.js
import { format } from 'date-fns'
import { requestHandler } from './request-handler'

const allUnitDisplays = document.querySelectorAll('span.units')
const main = document.querySelector('.main')
const currentLocation = document.querySelector('.location > p')
const currentDate = document.querySelector('.date > p')
const currentTemp = document.querySelector('.temp > p > span.val')
const currentConditions = document.querySelector('.conditions .para > p')
const currentPrecip = document.querySelector('.precip .percent .val')
const currentPrecipIcon = document.querySelector('.precip .icon img')
const currentDescription = document.querySelector('.description > p')

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

    // Note: assigning a string to textContent erases the existing content of the element, including the span. https://stackoverflow.com/questions/75430221/im-not-seeing-span-tags-in-dom-when-adding-them-via-javascript-loop

    static async displayCurrent(data) {
        console.log(currentTemp)
        currentDate.textContent = domHandler.getCurrentDate()
        currentLocation.textContent = data.resolvedAddress
        currentTemp.textContent = data.temp
        currentConditions.textContent = data.conditions
        currentPrecip.textContent = data.precip
        currentPrecipIcon.src = await domHandler.setCurrentPrecipIcon(data)
        currentDescription.textContent = data.description
    }

    static async updateBgImg(data) {
        const iconName = data.icon
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

    static async setCurrentPrecipIcon(data) {
        const iconName = data.preciptype
        let iconSrc
        console.log(iconName)
        try {
            const precipIcon = await import(
                `../icon/preciptype/${iconName[0]}.svg`
            )
            iconSrc = precipIcon.default
        } catch {
            console.log('No matching icon, use raindrop')
            const defaultPrecipIcon = await import(
                `../icon/preciptype/rain.svg`
            )
            iconSrc = defaultPrecipIcon.default
        }
        return iconSrc
    }

    static getCurrentDate() {
        const today = format(new Date(new Date()), "EEEE', ' MMMM d', ' yyyy")
        console.log(new Date().toISOString().substring(0, 10))
        return today
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
