// dom-handler.js
import { format } from 'date-fns'
import { requestHandler } from './request-handler'

// Query selectors

// General
const currentDate = document.querySelector('.date > p')
const allUnitDisplays = document.querySelectorAll('span.units')
const main = document.querySelector('.main')
const allWeatherIcons = document.querySelectorAll('.weather-icon')

// Current weather display
const current_Location = document.querySelector('.location > p')
const current_Temp = document.querySelector('.temp > p > span.val')
const current_Conditions = document.querySelector('.conditions .para > p')
const current_PrecipPercentage = document.querySelector(
    '.current .precip .percent .val',
)
const current_PrecipIcon = document.querySelector('.current .weather-icon')
const current_Description = document.querySelector('.description > p')

// 7 day forcast display
const dayOfWeek = document.querySelectorAll('.weekday p')
const forcast_ConditionsIcon = document.querySelectorAll(
    '.group-1 .conditions-icon',
)
const forcast_PrecipIcon = document.querySelectorAll('.group-2 .precip-icon')
const forcast_PrecipPercentage = document.querySelectorAll(
    '.group-2 .precip .val',
)
const forcast_ConditionsPara = document.querySelectorAll('.forcast .conditions')

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

    static async updateBgImg(data) {
        const iconName = data.icon
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

    // Note: assigning a string to textContent erases the existing content of the element, including the span. https://stackoverflow.com/questions/75430221/im-not-seeing-span-tags-in-dom-when-adding-them-via-javascript-loop

    static async displayCurrent(data) {
        console.log(current_Temp)
        const iconType = 'preciptype'
        currentDate.textContent = domHandler.getCurrentDate()
        current_Location.textContent = data.resolvedAddress
        current_Temp.textContent = data.temp
        current_Conditions.textContent = data.conditions
        current_PrecipPercentage.textContent = data.precip
        console.log('Setting precip icon on current')
        current_PrecipIcon.innerHTML = ''
        current_PrecipIcon.appendChild(
            await domHandler.setIcon(iconType, data.preciptype),
        )
        current_Description.textContent = data.description
    }

    static displayForcast(data) {
        data.forEach((day, index) => {
            // console.log(`Day ${index} = ${day.datetime}`)
            dayOfWeek[index].textContent = domHandler.getWeekday(day.datetime)
            forcast_PrecipPercentage[index].textContent = day.precipprob
            forcast_ConditionsPara[index].textContent = day.conditions
        })
    }

    static async displayForcastIcons(data) {
        const iconTypes = ['conditions', 'preciptype']
        data.forEach(async (day, index) => {
            const conditionsIcon = await domHandler.setIcon(
                iconTypes[0],
                day.icon,
            )
            const precipIcon = await domHandler.setIcon(
                iconTypes[1],
                day.preciptype,
            )
            console.log(forcast_ConditionsIcon[index])
            forcast_ConditionsIcon[index].innerHTML = ''
            forcast_ConditionsIcon[index].appendChild(conditionsIcon)
            forcast_PrecipIcon[index].innerHTML = ''
            forcast_PrecipIcon[index].appendChild(precipIcon)
        })
    }

    static async setIcon(iconType, iconName) {
        // add logic to check if icon name is an array
        const img = document.createElement('img')
        console.log(iconName)
        // let iconSrc
        try {
            const icon = await import(`../icon/${iconType}/${iconName}.svg`)
            img.src = icon.default
        } catch {
            console.log('No matching icon, use default')
            const defaultIcon = await import(`../icon/${iconType}/default.svg`)
            console.log(defaultIcon)
            img.src = defaultIcon.default
        }
        console.log(img)
        return img
    }

    static clearAllIcons() {}

    static getCurrentDate() {
        const today = format(new Date(new Date()), "EEEE', ' MMMM d', ' yyyy")
        return today
    }

    // Note: code doesn't work properly when the first character in the month is a '0' it causes the outputted day to be decreased by 1
    // Ex. 1: Date submitted: "2025-09-19" becomes "2025-09-18"
    // Ex. 2: Date submitted: "2025-04-07" becomes "2025-04-06"
    // This does not seem to be an issue with day characters

    static getWeekday(data) {
        const formattedDate = domHandler.formatDateData(data)
        const date = format(new Date(formattedDate), 'EEEE')
        return date
    }

    static formatDateData(data) {
        let formattedDate = data
        if (data.charAt(5) === '0') {
            formattedDate = data
                .split('')
                .slice(0, 5)
                .join('')
                .concat(data.split('').slice(-4).join(''))
        } else {
            console.log('date was not modified')
        }
        return formattedDate
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
