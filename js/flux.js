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
  let oldState = await AsyncStorage.getItem('toUpload')
  oldState = JSON.parse(oldState || '{}')
  oldState = toImmutable(oldState)

  flux.dispatch('initialize toUpload store', oldState)

  flux.observe(['toUpload'], (newState) => {
    AsyncStorage.setItem('toUpload', JSON.stringify(newState.toJS() || {}))
  })
}

flux.initState = initState
module.exports = flux
