var Nuclear = require('nuclear-js')

var sites = require('./stores/sites.js')
var ui = require('./stores/ui.js')
var config = require('./stores/config.js')


let flux = new Nuclear.Reactor({
  debug: true
})

flux.registerStores({
  sites,
  // ui,
  config,
})

module.exports = flux
