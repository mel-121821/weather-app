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
import { test } from './test.js'

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

// may need to change - depending on how data is provided by VC
// const visualAssets = {
// day_sun: ["img", "emoji"],
// day_rain: ["img", "emoji"],
// night_clear: ["img", "emoji"],
// night_rain: ["img", "emoji"]
// ...etc...
// }

// _________________________________________________

// Pseudocode - Fetch class

// const originalUrl =
//     'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barrie?unitGroup=us&key=V2N5C4KCZ38YRSDW84MDRYRR5&contentType=json'

class fetchWeatherData {
    static baseUrl =
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    static paramsObj = {
        unitGroup: 'metric',
        key: 'V2N5C4KCZ38YRSDW84MDRYRR5',
        contentType: 'json',
    }

    static params = new URLSearchParams(this.paramsObj)

    static testUrl = `${this.baseUrl}London,CA?${this.params}`

    static test() {
        console.log(this.params)
        console.log(this.paramsObj)
        console.log(this.testUrl)
    }

    static async fetch_CurrentWeather() {
        // fetchData.getLocation
        try {
            const response = await fetch(this.testUrl, { mode: 'cors' })
            const jsonData = await response.json()
            console.log(jsonData)
            return jsonData
        } catch (error) {
            console.log('Fetch failed', error)
        }
    }

    // TODO: If you want to include local time, need to use the url that is updated by minute
    // or see if there is a public api for timezones

    // weather object keys:

    // function async getJsonData()
    // return await fetch_CurrentWeather()

    // function fetch_CurrentWeather(location)
    // fetch response
    // convert to json
    // check for errors
    // return obj with the desired data

    // function fetch_7DayForcast(location)
    // fetch response
    // convert to json
    // check for errors
    // return obj with the desired data
}

fetchWeatherData.test()
fetchWeatherData.fetch_CurrentWeather()

// Notes and Research links:

// public instance fields are recreated on every instance (use these if each instance has its own unique data)

// static fields only exist on the class, but can be accessed on instances (use these if the data used throughout the class doesn't change).

// Async methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions

// (1) in order to call a static method or property within another static method of the same class, you can use the <this> keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

// _________________________________________________

// Pseudocode - Data obj constructor

// class weatherData

// function isolateData()
// jsonData = fetchWeatherData.getJsonData
// use .find() method to access the following keys:
// jsonData.currentConditions.conditions
// jsonData.currentConditions.icon
// jsonData.currentConditions.sunrise
// jsonData.currentConditions.sunset
// jsonData.currentConditions.temp
// jsonData.currentConditions.precip
// jsonData.currentConditions.precipprob
// jsonData.currentConditions.preciptype
// jsonData.alerts
// jsonData.description
// Use these to calculate the time zone
// jsonData.timezone

// Location: city, country

// Local time

// Alerts??

// _________________________________________________

// Pseudocode - Init class

// function initRender()
//  call fetch_CurrentWeather(location)
//  call fetch_7DayForecast(location)

// _________________________________________________

// Pseudocode - Get/set info class

// let units = "metric"
// let location = "Ottawa"

// function getUnits()
// return units

// function setUnits()
// ternary statement - if F ? C : F

// function getLocation()
// return location

// function setLocation(input) {
//     location = `${String(input).charAt(0).toUpperCase() + String(input.slice(1).toLowerCase())}?`
//     console.log(location)
// }

// _________________________________________________

// Pseudocode - Pubsub class

// function pubsub()
// copy from todo

// _________________________________________________

// Pseudocode - DOM class

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

// _________________________________________________

// Pseudocode - Event Handler

// input.addEventListener(submit, () =>
// fetchData.setLocation

// toggle.addEventListener(click, () =>
// fetchData.setUnits)
