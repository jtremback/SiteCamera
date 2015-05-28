'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nuclearJs = require('nuclear-js');

var _nuclearJs2 = _interopRequireDefault(_nuclearJs);

var toImmutable = _nuclearJs2['default'].toImmutable;

module.exports = new _nuclearJs2['default'].Store({
  getInitialState: function getInitialState() {
    // {
    //   selected: 'Garden Shed',
    //   sites: {
    //     'Garden Shed': {
    //       path: 'Garden Shed',
    //       other: 'stuff'
    //     }
    //   }
    // }
    return toImmutable({
      selected: null,
      sites: {}
    });
  },

  initialize: function initialize() {
    // all action handlers are pure functions that take the current state and payload
    // and the returned value gets set as the new state
    this.on('ADD_SITE', addSite);
    this.on('REPLACE_SITES', replaceSites);
    this.on('SELECT_SITE', selectSite);
  }
});

function addSite(state, path) {
  return state.push(toImmutable({
    path: path }));
}

function replaceSites(state, sites) {
  return state.set('list', toImmutable(sites));
}

function selectSite(state, site) {
  return state.set('selected', site);
}