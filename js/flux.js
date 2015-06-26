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

async function initPersistence (keypath) {
  const identifier = keypath.join('.')

  let storedState = await AsyncStorage.getItem(identifier)
  storedState = JSON.parse(storedState || '{}')
  storedState = toImmutable(storedState)

  flux.dispatch(`initialize ${identifier}`, storedState)

  flux.observe(keypath, (newState) => {
    AsyncStorage.setItem(identifier, JSON.stringify(newState.toJS() || {}))
  })
}

flux.initPersistence = initPersistence
module.exports = flux
