const { Reactor, toImmutable } = require('nuclear-js')
const { AsyncStorage } = require('react-native')

const sites = require('./stores/sites.js')
const photos = require('./stores/photos.js')
const config = require('./stores/config.js')


let flux = new Reactor({
  debug: true
})

flux.registerStores({
  sites,
  photos,
  config,
})

async function initState () {
  let storedState = await AsyncStorage.getItem('photosToUpload')
  storedState = JSON.parse(storedState || '{}')
  storedState = toImmutable(storedState)

  flux.dispatch('initialize photos store', storedState)

  flux.observe(['photos', 'toUpload'], (newState) => {
    AsyncStorage.setItem('photosToUpload', JSON.stringify(newState.toJS() || {}))
  })
}

flux.initState = initState
module.exports = flux
