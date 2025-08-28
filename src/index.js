// index.js

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

import './styles.css'
import { test } from './test.js'

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

// Pseudocode - Url params

const originalUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Barrie?unitGroup=us&key=V2N5C4KCZ38YRSDW84MDRYRR5&contentType=json'

const baseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

const paramsObj = {
    unitGroup: 'metric',
    key: 'V2N5C4KCZ38YRSDW84MDRYRR5',
    contentType: 'json',
}

const params = new URLSearchParams(paramsObj)
const defaultLocation = 'Ottawa?'

console.log(`${baseUrl}${defaultLocation}${params}`)

// Pseudocode - Fn()s:

// function setDefault()
//  choose default location
//  call fetch_CurrentWeather(location)
//  call fetch_7DayForecast(location)

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

// function toggleUnits()
// ternary statement - if F ? C : F

// function updateDisplay()
// have subscribed to return of the obj
// call fns that manipulate the DOM

// function pubsub()
// copy from todo

// Pseudocode - DOM fn()s

// function setBgImg()
// get icon name from returned obj
// use
