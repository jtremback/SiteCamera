const { Reactor, toImmutable } = require('nuclear-js')
const { AsyncStorage } = require('react-native')

const sites = require('./stores/sites.js')
const toUpload = require('./stores/toUpload.js')
const ui = require('./stores/ui.js')
const config = require('./stores/config.js')


let flux = new Reactor({
  debug: true
})

flux.registerStores({
  sites,
  toUpload,
  // ui,
  config,
})

async function initStateAsync () {
  const oldState = await AsyncStorage.getItem('toUpload')
  oldState = toImmutable(oldState || {})
  flux.dispatch('SET_STATE_toUpload', oldState)

  flux.observe(['toUpload'], (newState) => {
    AsyncStorage.setItem('toUpload', newState)
  })

  return 'fuckington'
}

flux.initStateAsync = initStateAsync
module.exports = flux
