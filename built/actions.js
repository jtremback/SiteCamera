'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.storeSites = storeSites;
exports.getSites = getSites;
exports.selectSite = selectSite;
exports.tookPicture = tookPicture;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _modulesDropbox = require('./modules/dropbox');

var dropbox = _interopRequireWildcard(_modulesDropbox);

var _FluxJs = require('../Flux.js');

var _FluxJs2 = _interopRequireDefault(_FluxJs);

var _nuclearJs = require('nuclear-js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function storeSites(sites) {
  _FluxJs2['default'].dispatch('STORE_SITES', (0, _nuclearJs.toImmutable)(sites));
}

function getSites() {
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
}

function selectSite(path) {
  _FluxJs2['default'].dispatch('SELECT_SITE', path);
}

function tookPicture(path) {
  return regeneratorRuntime.async(function tookPicture$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return dropbox.uploadAndDelete(path, _FluxJs2['default'].evaluate(_FluxJs.getters.selectedSite) + ('/' + (0, _moment2['default'])().format('MMMM Do YYYY')) + ('/' + (0, _moment2['default'])().format('h:mm:ss a') + '.jpg'));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}