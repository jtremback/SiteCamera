'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fluxJs = require('../flux.js');

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _CameraScreenJs = require('./CameraScreen.js');

var _CameraScreenJs2 = _interopRequireDefault(_CameraScreenJs);

var _SiteListScreenJs = require('./SiteListScreen.js');

var _SiteListScreenJs2 = _interopRequireDefault(_SiteListScreenJs);

var styles = _reactNative2['default'].StyleSheet.create({
  container: {
    flex: 1
  }
});

var CameraScreenContainer = _reactNative2['default'].createClass({
  displayName: 'CameraScreenContainer',
  render: function render() {
    return _reactNative2['default'].createElement(_CameraScreenJs2['default'], {
      tookPicture: _fluxJs.actions.tookPicture
    });
  }
});

var SiteListScreenContainer = _reactNative2['default'].createClass({
  displayName: 'SiteListScreenContainer',
  mixins: [_fluxJs.ReactMixin],
  getDataBindings: function getDataBindings() {
    return {
      sites: _fluxJs.getters.sites
    };
  },
  render: function render() {
    function rowPushed(navigator, row) {
      _fluxJs.actions.selectSite(row.path);
      navigator.push({
        title: row.path,
        component: CameraScreenContainer
      });
    }

    return _reactNative2['default'].createElement(_SiteListScreenJs2['default'], {
      listData: this.state.sites,
      rowPushed: rowPushed
    });
  }
});

exports['default'] = _reactNative2['default'].createClass({
  displayName: 'MainNavigator',
  render: function render() {
    return _reactNative2['default'].createElement(_reactNative.NavigatorIOS, {
      style: styles.container,
      initialRoute: {
        title: 'Sites',
        component: SiteListScreenContainer
      }
    });
  }
});
module.exports = exports['default'];