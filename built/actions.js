'use strict';

var dropbox = require('./modules/dropbox');
var flux = require('./flux.js');
var getters = flux.getters;

var _require = require('nuclear-js');

var toImmutable = _require.toImmutable;

var moment = require('moment');

exports.storeSites = storeSites;
function storeSites(sites) {
  flux.dispatch('STORE_SITES', toImmutable(sites));
}

exports.getSites = function getSites() {
  var sites;
  return regeneratorRuntime.async(function getSites$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return dropbox.getFolders();

      case 2:
        sites = context$1$0.sent;

        storeSites(sites);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports.selectSite = selectSite;
function selectSite(path) {
  flux.dispatch('SELECT_SITE', path);
}

exports.tookPicture = function tookPicture(path) {
  return regeneratorRuntime.async(function tookPicture$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return dropbox.uploadAndDelete(path, flux.evaluate(getters.selectedSite) + ('/' + moment().format('MMMM Do YYYY')) + ('/' + moment().format('h:mm:ss a') + '.jpg'));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};