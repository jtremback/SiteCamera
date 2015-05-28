'use strict';

var React = require('react-native');

var _require = require('./flux.js');

var actions = _require.actions;

var config = require('../config.js');
var MainNavigator = require('MainNavigator.js');
var dropbox = require('./modules/dropbox');

module.exports = React.createClass({
  displayName: 'SiteCamera',
  componentDidMount: function componentDidMount() {
    (function callee$1$0() {
      var access_token;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return dropbox.oauth(config.app_key, config.redirect_url);

          case 2:
            access_token = context$2$0.sent;

            actions.setConfig('dropbox_access_token', access_token);
            actions.getSites();

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    })();
  },

  render: function render() {
    return React.createElement(MainNavigator, null);
  }
});