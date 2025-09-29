// request-handler.js

class requestHandler {
    static currentUnits = 'metric'

    static currentLocation = 'Ottawa+ON+Canada'

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
        // DONE: fix to accept city/provice/country
        // DONE: add code to handle undefined values > made city and region required fields instead
        console.log(inputs)
        this.currentLocation = inputs.filter(Boolean).join('+')
        console.log(this.currentLocation)
    }
}

export { requestHandler }
