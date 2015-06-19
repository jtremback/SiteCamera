const { Reactor, toImmutable } = require('nuclear-js')

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

async function setPersistedState () {
  const toUpload = await toUpload.getPersistedState()
  flux.dispatch('SET_STATE', toImmutable({
    toUpload: toUpload
  }))

  return null
}

setPersistedState()

flux.setPersistedState = setPersistedState

module.exports = flux
