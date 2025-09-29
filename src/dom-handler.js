// dom-handler.js
import { format } from 'date-fns'
import { requestHandler } from './request-handler'

// Query selectors

// General
const currentDate = document.querySelector('.date > p')
const allUnitDisplays = document.querySelectorAll(
    'span.units, span.toggle-label',
)
const main = document.querySelector('.main')

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
const forcast_Temp = document.querySelectorAll('.group-2 .temp .val')
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

    // TODO: Do some more research on try/catch blocks

    static async updateBgImg(data) {
        const iconName = data.icon
        try {
            const bgImg = await import(`../img/${iconName}.jpg`)
            // const bgImg = await import(`../img/showers-night.jpg`)
            // console.log(bgImg.default)
            main.style.backgroundImage = `url("${bgImg.default}")`
        } catch {
            console.log(`404 ${iconName} not found. Use default image instead`)
            const defaultImg = await import(`../img/fog.jpg`)
            main.style.backgroundImage = `url("${defaultImg.default}")`
        }
    }

    static displayCurrent(data) {
        current_Location.textContent = data.resolvedAddress
        current_Temp.textContent = data.temp
        current_Conditions.textContent = data.conditions
        current_PrecipPercentage.textContent = data.precipprob
        current_Description.textContent = data.description
    }

    static async displayCurrentIcon(data) {
        const iconType = 'preciptype'
        // console.log('Setting precip icon on current')
        current_PrecipIcon.innerHTML = ''
        current_PrecipIcon.appendChild(
            await domHandler.setIcon(iconType, data.preciptype),
        )
    }

    static displayForcast(data) {
        data.forEach((day, index) => {
            // console.log(`Day ${index} = ${day.datetime}`)
            dayOfWeek[index].textContent = domHandler.getWeekday(day.datetime)
            forcast_Temp[index].textContent = day.temp
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
            forcast_ConditionsIcon[index].innerHTML = ''
            forcast_ConditionsIcon[index].appendChild(conditionsIcon)
            forcast_PrecipIcon[index].innerHTML = ''
            forcast_PrecipIcon[index].appendChild(precipIcon)
        })
    }

    static async setIcon(iconType, iconName) {
        const img = document.createElement('img')
        iconName = this.getIconFromArray(iconName)
        console.log(iconName)
        // let iconSrc
        try {
            const icon = await import(`../icon/${iconType}/${iconName}.svg`)
            // const icon = await import(`../icon/conditions/sleet.svg`)
            img.src = icon.default
        } catch {
            console.log('No matching icon, use default')
            const defaultIcon = await import(`../icon/${iconType}/rain.svg`)
            img.src = defaultIcon.default
        }
        return img
    }

    static getIconFromArray(iconName) {
        if (Array.isArray(iconName)) {
            return iconName[0]
        } else {
            return iconName
        }
    }

    static getCurrentDate() {
        const today = format(new Date(new Date()), "EEEE', ' MMMM d', ' yyyy")
        return today
    }

    static displayCurrentDate() {
        currentDate.textContent = domHandler.getCurrentDate()
    }

    static getWeekday(data) {
        const formattedDate = domHandler.formatDateData(data)
        const date = format(new Date(formattedDate), 'EEEE')
        // console.log(date)
        return date
    }

    static formatDateData(data) {
        // console.log(data)
        let formattedDate = this.formatDD(this.formatMM(data))
        // console.log(formattedDate)
        return formattedDate
    }

    static formatMM(date) {
        let formatted = date
        if (formatted.charAt(5) === '0') {
            formatted = formatted
                .split('')
                .slice(0, 5)
                .join('')
                .concat(formatted.split('').slice(-4).join(''))
        }
        return formatted
    }

    static formatDD(date) {
        let formatted = date
        if (formatted.at(-2) === '0') {
            formatted = formatted
                .split('')
                .slice(0, -2)
                .join('')
                .concat(formatted.split('').slice(-1).join(''))
        }
        return formatted
    }
}

export { domHandler }
