// request-handler.js

class requestHandler {
    static currentUnits = 'metric'

    static currentLocation = 'Ottawa+ON+Canada'

    static get units() {
        return this.currentUnits
    }

    static setUnits() {
        this.currentUnits = this.currentUnits === 'metric' ? 'us' : 'metric'
    }

    static get location() {
        return this.currentLocation
    }

    static set location(inputs) {
        this.currentLocation = inputs.filter(Boolean).join('+')
    }
}

export { requestHandler }
