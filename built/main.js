'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fluxJs = require('./flux.js');

var _configJs = require('../config.js');

var _configJs2 = _interopRequireDefault(_configJs);

var _MainNavigatorJs = require('MainNavigator.js');

var _MainNavigatorJs2 = _interopRequireDefault(_MainNavigatorJs);

var _modulesDropbox = require('./modules/dropbox');

var _modulesDropbox2 = _interopRequireDefault(_modulesDropbox);

exports['default'] = React.createClass({
  displayName: 'SiteCamera',
  componentDidMount: function componentDidMount() {
    (function callee$1$0() {
      var access_token;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _modulesDropbox2['default'].oauth(_configJs2['default'].app_key, _configJs2['default'].redirect_url);

          case 2:
            access_token = context$2$0.sent;

            _fluxJs.actions.setConfig('dropbox_access_token', access_token);
            _fluxJs.actions.getSites();

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    })();
  },

  render: function render() {
    return React.createElement(_MainNavigatorJs2['default'], null);
  }
});
module.exports = exports['default'];