'use strict';

var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;

module.exports = new Nuclear.Store({
  getInitialState: function getInitialState() {
    return toImmutable({
      dropbox_access_token: null
    });
  },

  initialize: function initialize() {
    this.on('SET_CONFIG_OPTION', function (state, _ref) {
      var k = _ref.k;
      var v = _ref.v;

      return state.set(k, v);
    });
  }
});