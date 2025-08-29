// request-handler.js

// Pseudocode - Get/set info class

class requestHandler {
    static units = 'metric'

    static location = 'Ottawa'

    static getUnits = () => this.units

    static setUnits() {
        this.units = this.units === 'metric' ? 'us' : 'metric'
    }

    static getLocation = () => this.location

    static setLocation(input) {
        // TODO: fix to accept city/provice/country
        this.location = `${String(input).charAt(0).toUpperCase() + String(input.slice(1).toLowerCase())}?`
        console.log(location)
    }
}

export { requestHandler }

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
