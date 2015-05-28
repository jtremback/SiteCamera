'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nuclearJs = require('nuclear-js');

var _nuclearJs2 = _interopRequireDefault(_nuclearJs);

var _actionsJs = require('./actions.js');

var actions = _interopRequireWildcard(_actionsJs);

var _gettersJs = require('./getters.js');

var getters = _interopRequireWildcard(_gettersJs);

var _storesSitesJs = require('./stores/sites.js');

var _storesSitesJs2 = _interopRequireDefault(_storesSitesJs);

var _storesUiJs = require('./stores/ui.js');

var _storesUiJs2 = _interopRequireDefault(_storesUiJs);

var flux = new _nuclearJs2['default'].Reactor({
  debug: true
});

flux.registerStores({
  sites: _storesSitesJs2['default'],
  ui: _storesUiJs2['default']
});

flux.actions = actions;
flux.getters = getters;

exports['default'] = flux;
module.exports = exports['default'];