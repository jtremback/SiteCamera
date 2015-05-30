var Nuclear = require('nuclear-js')
var actions = require('./actions.js')
var getters = require('./getters.js')

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

flux.actions = actions
flux.getters = getters

module.exports = flux
