'use strict';

var flux = require('../flux.js');
var actions = flux.actions;
var getters = flux.getters;
var ReactMixin = flux.ReactMixin;

var React = require('react-native');
var NavigatorIOS = React.NavigatorIOS;

var CameraScreen = require('./CameraScreen.js');
var SiteListScreen = require('./SiteListScreen.js');

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

var CameraScreenContainer = React.createClass({
  displayName: 'CameraScreenContainer',
  render: function render() {
    return React.createElement(CameraScreen, {
      tookPicture: actions.tookPicture
    });
  }
});

var SiteListScreenContainer = React.createClass({
  displayName: 'SiteListScreenContainer',
  mixins: [ReactMixin],
  getDataBindings: function getDataBindings() {
    return {
      sites: getters.sites
    };
  },
  render: function render() {
    function rowPushed(navigator, row) {
      actions.selectSite(row.path);
      navigator.push({
        title: row.path,
        component: CameraScreenContainer
      });
    }

    return React.createElement(SiteListScreen, {
      listData: this.state.sites,
      rowPushed: rowPushed
    });
  }
});

module.exports = React.createClass({
  displayName: 'MainNavigator',
  render: function render() {
    return React.createElement(NavigatorIOS, {
      style: styles.container,
      initialRoute: {
        title: 'Sites',
        component: SiteListScreenContainer
      }
    });
  }
});