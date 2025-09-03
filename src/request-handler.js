// request-handler.js

class requestHandler {
    // (DONE) units already exist in searchParams - may move getter/setter to fetchWeather class or have setter set the units from here

    static units = 'metric'

    static location = 'Ottawa'

    static getUnits = () => this.units

    static setUnits() {
        this.units = this.units === 'metric' ? 'us' : 'metric'
        console.log(this.units)
    }

    static getLocation = () => this.location

    static setLocation(input) {
        // TODO: fix to accept city/provice/country
        this.location = `${String(input).charAt(0).toUpperCase() + String(input.slice(1).toLowerCase())}`
        console.log(this.location)
    }
}

export { requestHandler }
