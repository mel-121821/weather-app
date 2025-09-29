// Weather App - index.js

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
// Sunrise/set ??
// Chance of precipitation
// Alerts??
// Icon
// (need to create a notice if no data is present for a given category)

// _________________________________________________

// Global Vars

const cityInput = document.querySelector('#city')
const regionInput = document.querySelector('#region')
const searchForm = document.querySelector('form')
const unitToggle = document.querySelector('#unit-toggle')

// _________________________________________________

// Fetch class

class fetchWeather {
    static baseUrl =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    // Done: use the date api to get the day of the week from datetime - needed for the 7 day forecast cards

    static dataKeys = {
        info: ['resolvedAddress', 'alerts', 'description', 'days'],
        conditions: [
            'conditions',
            'icon',
            'datetime',
            'temp',
            // 'tempmin',
            // 'tempmax',
            'precip',
            'precipprob',
            'preciptype',
        ],
    }

    static getParams() {
        const paramsObj = {
            unitGroup: requestHandler.units,
            key: 'V2N5C4KCZ38YRSDW84MDRYRR5',
            contentType: 'json',
        }
        const params = new URLSearchParams(paramsObj)
        return params
    }

    static getUrl() {
        return `${this.baseUrl}${requestHandler.location}/next7days?${this.getParams()}`
    }

    // DONE: VC doesn't include the country in its data unless you add it yourself. Create a blurb under the input to inform the user

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

    static filterWeather_Current(data) {
        const jsonData = data
        const weatherData_Current = {}
        fetchWeather.dataKeys.info.forEach((key) => {
            Object.assign(weatherData_Current, { [key]: jsonData[key] })
        })
        fetchWeather.dataKeys.conditions.forEach((key) => {
            Object.assign(weatherData_Current, {
                [key]: jsonData.currentConditions[key],
            })
        })
        console.log('Object of current weather:')
        console.log(weatherData_Current)
        pubSub.emit('gotCurrentData', weatherData_Current)
    }

    static filterWeather_7DayForecast(data) {
        const jsonData = data
        const weatherData_7DayForecast = []
        for (let i = 1; i < jsonData.days.length; i++) {
            const day = {}
            fetchWeather.dataKeys.conditions.forEach((key) => {
                Object.assign(day, {
                    [key]: jsonData.days[i][key],
                })
            })
            weatherData_7DayForecast.push(day)
        }
        console.log('Array of 7 day forcast:')
        console.log(weatherData_7DayForecast)
        pubSub.emit('got7DayData', weatherData_7DayForecast)
    }
}

domHandler.displayCurrentDate()
fetchWeather.test()
fetchWeather.fetchData()

pubSub.on('fetchData', fetchWeather.filterWeather_Current)
pubSub.on('fetchData', fetchWeather.filterWeather_7DayForecast)

pubSub.on('gotCurrentData', domHandler.updateBgImg)
pubSub.on('gotCurrentData', domHandler.displayCurrent)
pubSub.on('gotCurrentData', domHandler.displayCurrentIcon)

pubSub.on('got7DayData', domHandler.displayForcast)
pubSub.on('got7DayData', domHandler.displayForcastIcons)

// _________________________________________________

// Event Handlers

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Note: will throw an error if you call requestHandler.location(inputVal) because getters and setters behave like variables, not functions. To assign a new value to location, see below
    requestHandler.location = [cityInput.value, regionInput.value]
    requestHandler.location
    fetchWeather.fetchData()
    searchForm.reset()
})

unitToggle.addEventListener('click', () => {
    requestHandler.setUnits()
    domHandler.changeUnits()
    fetchWeather.fetchData()
})
