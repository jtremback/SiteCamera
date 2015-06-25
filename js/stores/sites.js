var Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable

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
    this.on('set sites', replaceSites)
    this.on('select current site', selectSite)
  }
})

function replaceSites (state, sites) {
  return state.set('sites', sites)
}

function selectSite (state, site) {
  return state.set('selected', site)
}
