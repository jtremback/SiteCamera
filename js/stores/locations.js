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
    this.on(event('get locations'), replaceSites)
    this.on(event('add location'), addSite)
    this.on(event('select current location'), selectSite)
  }
})

function replaceSites (state, locations) {
  return state.set('locations', locations)
}

function addSite (state, name) {
  return state.setIn(['locations', name], toImmutable({ name: name }))
}

function selectSite (state, location) {
  return state.set('selected', location)
}
