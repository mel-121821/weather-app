// Weather App - index.js

// Instructions:

// 1. Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.

// 2. Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.

// 3. Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.

// 4. Set up a form that will let users input their location and will fetch the weather info (still just console.log() it).

// 5. Display the information on your webpage!
// While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, so have a look at the dynamic import() function. Unlike plain template strings without an import, Webpack can read dynamic imports and still bundle all the relevant assets.

// 6. Add any styling you like!

// 7. Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to simulate network speeds.

// 8. Push to GitHub and share your solution!

// _________________________________________________

// Imports

import './styles.css'
import { pubSub } from './pubsub.js'
import { requestHandler } from './request-handler.js'
import { domHandler } from './dom-handler.js'

// _________________________________________________

// Pseudocode - Desired data:

// For main display, accuracy by hour:
// Type: (ie. partly cloudy, sunny, rainy, etc.)
// Location: city, country
// Temp: F/C
// Local time
// Sunrise/set ??
// Chance of precipitation
// Alerts??
// Icon
// (need to create a notice if no data is present for a given category)

// For 7 day display: accuracy by day
// Type: (ie. partly cloudy, sunny, rainy, etc.)
// Temp: F/C
// Chance of precipitation
// Icon
// Note: on main display (current) would like the data to be accurate by hour. For the rest of the week, would like the per day setting - investigate if 2 queries are needed for this - may ammend this goal

// Pseudocode - My data

// const visualAssets = {
// day_sun: ["img", "emoji"],
// day_rain: ["img", "emoji"],
// night_clear: ["img", "emoji"],
// night_rain: ["img", "emoji"]
// ...etc...
// }

// _________________________________________________

// Global Vars

const searchInput = document.querySelector('#search')
const searchForm = document.querySelector('form')
const unitDisplay = document.querySelector('.units span')
const unitToggle = document.querySelector('#unit-toggle')
const bgImage = document.querySelector('.main')

// _________________________________________________

// Pseudocode - Fetch class

// const originalUrl =
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Borden%2C%20ON/next7days?unitGroup=metric&key=V2N5C4KCZ38YRSDW84MDRYRR5&contentType=json

class fetchWeather {
    static baseUrl =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    static dataKeys = {
        info: ['resolvedAddress', 'alerts', 'description', 'days'],
        conditions: [
            'conditions',
            'icon',
            'datetime',
            'sunrise',
            'sunset',
            'temp',
            'precip',
            'precipprob',
            'preciptype',
        ],
    }

    static getParams() {
        const paramsObj = {
            unitGroup: requestHandler.units,
            // unitGroup: 'metric',
            key: 'V2N5C4KCZ38YRSDW84MDRYRR5',
            contentType: 'json',
        }
        const params = new URLSearchParams(paramsObj)
        return params
    }

    static getUrl() {
        return `${this.baseUrl}${requestHandler.location}/next7days?${this.getParams()}`
    }

    // TODO: VC doesn't include the country in its data unless you add it yourself. Create a blurb under the input to inform the user

    static test() {
        // console.log(this.params)
        // console.log(this.paramsObj)
        // console.log(this.testUrl)
        console.log(requestHandler.units)
    }

    static async fetchData() {
        const url = this.getUrl()
        try {
            const response = await fetch(url, { mode: 'cors' })
            const jsonData = await response.json()
            pubSub.emit('fetchData', jsonData)
        } catch (error) {
            console.log('Fetch failed', error)
        }
    }

    // (DONE) instead of having filter fn()s call fetchWeather, have each one listen with pubsub and accept the same data

    static filterWeather_Current(data) {
        const jsonData = data
        const weatherData_CurrentFiltered = {}
        fetchWeather.dataKeys.info.forEach((key) => {
            Object.assign(weatherData_CurrentFiltered, { [key]: jsonData[key] })
        })
        fetchWeather.dataKeys.conditions.forEach((key) => {
            Object.assign(weatherData_CurrentFiltered, {
                [key]: jsonData.currentConditions[key],
            })
        })
        console.log('Object of current weather:')
        console.log(weatherData_CurrentFiltered)
        pubSub.emit('gotCurrentData', weatherData_CurrentFiltered)
    }

    static filterWeather_7DayForecast(data) {
        const jsonData = data
        const weatherData_7DayFiltered = []
        for (let i = 1; i < jsonData.days.length; i++) {
            const weatherDay = {}
            fetchWeather.dataKeys.conditions.forEach((key) => {
                Object.assign(weatherDay, {
                    [key]: jsonData.days[i][key],
                })
            })
            weatherData_7DayFiltered.push(weatherDay)
        }
        console.log('Array of 7 day forcast:')
        console.log(weatherData_7DayFiltered)
        pubSub.emit('got7DayData', weatherData_7DayFiltered)
    }

    // TODO: If you want to include local time, need to use the url that is updated by minute
    // or see if there is a public api for timezones
    // ^ Decided against doing this
}

fetchWeather.test()
fetchWeather.fetchData()

pubSub.on('fetchData', fetchWeather.filterWeather_Current)
pubSub.on('fetchData', fetchWeather.filterWeather_7DayForecast)

pubSub.on('gotCurrentData', domHandler.updateBgImg)

// Notes and Research links:

// public instance fields are recreated on every instance (use these if each instance has its own unique data)

// static fields only exist on the class, but can be accessed on instances (use these if the data used throughout the class doesn't change).

// Async methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions

// (1) in order to call a static method or property within another static method of the same class, you can use the <this> keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

// _________________________________________________

// Pseudocode - Init class

// function initRender()
//  call fetchWeather(location)

// _________________________________________________

// _________________________________________________

// Pseudocode - Event Handler

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Note: will throw an error if you call requestHandler.location(inputVal) because getters and setters behave like variables, not functions. To assign a new value to location, see below
    requestHandler.location = searchInput.value
    requestHandler.location
    fetchWeather.fetchData()
})

unitToggle.addEventListener('click', () => {
    requestHandler.setUnits()
    domHandler.changeUnits(unitDisplay)
    fetchWeather.fetchData()
})
