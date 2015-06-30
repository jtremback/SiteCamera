const { Reactor, toImmutable, toJS } = require('nuclear-js')
const { AsyncStorage } = require('react-native')

const locations = require('./stores/locations.js')
const photos = require('./stores/photos.js')
const config = require('./stores/config.js')
const user = require('./stores/user.js')


let flux = new Reactor({
  debug: true
})

flux.registerStores({
  locations,
  photos,
  config,
  user,
})

async function initPersistence (keypath) {
  const identifier = keypath.join('.')

  let storedState = await AsyncStorage.getItem(identifier)
  storedState = JSON.parse(storedState || '{}')
  storedState = toImmutable(storedState)

  flux.dispatch(`initialize ${identifier}`, storedState)

  flux.observe(keypath, (newState) => {
    AsyncStorage.setItem(identifier, JSON.stringify(toJS(newState) || {}))
  })
}

function init () {
  return Promise.all([
    initPersistence(['photos', 'toUpload']),
    initPersistence(['config', 'deviceId'])
  ])
}

flux.init = init
module.exports = flux
