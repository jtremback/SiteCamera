const Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable
const event = require('../events.js')

module.exports = new Nuclear.Store({
  getInitialState () {
    // {
    //   selected: 'Garden Shed',
    //   locations: {
    //     'Garden Shed': {
    //       path: 'Garden Shed',
    //       other: 'stuff'
    //     }
    //   }
    // }
    return toImmutable({
      selected: null,
      locations: {}
    })
  },

  initialize () {
    // all action handlers are pure functions that take the current state and payload
    // and the returned value gets set as the new state
    this.on(event('get locations'), replaceLocations)
    this.on(event('add location'), addLocation)
    this.on(event('select current location'), selectLocation)
  }
})

function replaceLocations (state, locations) {
  return state.set('locations', locations)
}

function addLocation (state, name) {
  return state.setIn(['locations', name], toImmutable({ name: name }))
}

function selectLocation (state, location) {
  return state.set('selected', location)
}
