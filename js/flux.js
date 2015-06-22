const { Reactor, toImmutable } = require('nuclear-js')
const { AsyncStorage } = require('react-native')

const sites = require('./stores/sites.js')
const toUpload = require('./stores/toUpload.js')
const config = require('./stores/config.js')


let flux = new Reactor({
  debug: true
})

flux.registerStores({
  sites,
  toUpload,
  config,
})

async function initState () {
  const oldState = await AsyncStorage.getItem('toUpload')
  oldState = toImmutable(oldState || {})
  flux.dispatch('initialize toUpload store', JSON.parse(oldState))

  flux.observe(['toUpload'], (newState) => {
    AsyncStorage.setItem('toUpload', newState.toJSON())
  })
}

flux.initState = initState
module.exports = flux
