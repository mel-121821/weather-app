// request-handler.js

class requestHandler {
    // (DONE) units already exist in searchParams - may move getter/setter to fetchWeather class or have setter set the units from here

    static currentUnits = 'metric'

    static currentLocation = 'Ottawa, ON, Canada'

    // Note: getters/setters behave like variables, not functions. Do not try to call them or you will get an error!
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

    static set location(inputs) {
        // TODO: fix to accept city/provice/country
        // TODO: add code to handle undefined values
        console.log(inputs)
        this.currentLocation = inputs.filter(Boolean).join(', ')
        console.log(this.currentLocation)
    }
}

export { requestHandler }
