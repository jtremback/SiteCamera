var Nuclear = require('nuclear-js')
var actions = require('./actions.js')
var getters = require('./getters.js')

var sites = require('./stores/sites.js')
var ui = require('./stores/ui.js')


let flux = new Nuclear.Reactor({
  debug: true
})

flux.registerStores({
  sites,
  ui
})

flux.actions = actions
flux.getters = getters

module.exports = flux
