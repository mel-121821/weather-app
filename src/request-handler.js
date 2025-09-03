// request-handler.js

class requestHandler {
    // (DONE) units already exist in searchParams - may move getter/setter to fetchWeather class or have setter set the units from here

    static currentUnits = 'metric'

    static currentLocation = 'Ottawa'

    static get units() {
        return this.currentUnits
    }

    static setUnits() {
        this.currentUnits = this.currentUnits === 'metric' ? 'us' : 'metric'
        console.log(this.currentUnits)
    }

    static get location() {
        return this.currentLocation
    }

    static set location(input) {
        // TODO: fix to accept city/provice/country
        this.currentLocation = `${String(input).charAt(0).toUpperCase() + String(input.slice(1).toLowerCase())}`
        console.log(this.currentLocation)
    }
}

export { requestHandler }
