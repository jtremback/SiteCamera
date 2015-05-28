'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nuclearJs = require('nuclear-js');

var _nuclearJs2 = _interopRequireDefault(_nuclearJs);

var toImmutable = _nuclearJs2['default'].toImmutable;

module.exports = new _nuclearJs2['default'].Store({
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