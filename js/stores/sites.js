const Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable
const event = require('../events.js')

module.exports = new Nuclear.Store({
  getInitialState () {
    // {
    //   selected: 'Garden Shed',
    //   sites: {
    //     'Garden Shed': {
    //       path: 'Garden Shed',
    //       other: 'stuff'
    //     }
    //   }
    // }
    return toImmutable({
      selected: null,
      sites: {}
    })
  },

  initialize () {
    // all action handlers are pure functions that take the current state and payload
    // and the returned value gets set as the new state
    this.on(event['set sites'], replaceSites)
    this.on(event['add site'], addSite)
    this.on(event['select current site'], selectSite)
  }
})

function replaceSites (state, sites) {
  return state.set('sites', sites)
}

function addSite (state, name) {
  return state.setIn(['sites', name], toImmutable({ name: name }))
}

function selectSite (state, site) {
  return state.set('selected', site)
}
