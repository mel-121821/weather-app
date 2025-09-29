// Weather App - index.js

// Imports

import './styles.css'
import { pubSub } from './pubsub.js'
import { requestHandler } from './request-handler.js'
import { domHandler } from './dom-handler.js'

// _________________________________________________

// Global Vars

const cityInput = document.querySelector('#city')
const regionInput = document.querySelector('#region')
const searchForm = document.querySelector('form')
const unitToggle = document.querySelector('#unit-toggle')

// _________________________________________________

// Fetch and Filter

class fetchWeather {
    static baseUrl =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    static dataKeys = {
        info: ['resolvedAddress', 'alerts', 'description', 'days'],
        conditions: [
            'conditions',
            'icon',
            'datetime',
            'temp',
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
            iconSet: 'icons2',
        }
        const params = new URLSearchParams(paramsObj)
        return params
    }

    static getUrl() {
        return `${this.baseUrl}${requestHandler.location}/next7days?${this.getParams()}`
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
        pubSub.emit('got7DayData', weatherData_7DayForecast)
    }
}

// _________________________________________________

// Init

domHandler.displayCurrentDate()
fetchWeather.fetchData()

// _________________________________________________

// Pubsubs

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
