'use strict';
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

async function init () {
  const toUpload = await toUpload.getInitData()
  flux.dispatch('INIT_STORES', toImmutable({
    toUpload: toUpload
  }))
}

init()

module.exports = flux
