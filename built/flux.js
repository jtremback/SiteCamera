'use strict';

var Nuclear = require('nuclear-js');
var actions = require('./actions.js');
var getters = require('./getters.js');

var sites = require('./stores/sites.js');
var ui = require('./stores/ui.js');

var flux = new Nuclear.Reactor({
  debug: true
});

flux.registerStores({
  sites: sites,
  ui: ui
});

flux.actions = actions;
flux.getters = getters;

module.exports = flux;