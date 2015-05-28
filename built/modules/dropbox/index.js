'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.oauth = oauth;
exports.uploadAndDelete = uploadAndDelete;
exports.getFolders = getFolders;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var _reactNative = require('react-native');

var _thenify = require('thenify');

var _thenify2 = _interopRequireDefault(_thenify);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactNativeFs = require('react-native-fs');

var _reactNativeFs2 = _interopRequireDefault(_reactNativeFs);

var _mock_dataJs = require('./mock_data.js');

var _mock_dataJs2 = _interopRequireDefault(_mock_dataJs);

var FileTransfer = _reactNative.NativeModules.FileTransfer;

FileTransfer = (0, _thenify2['default'])(FileTransfer, {}, ['upload']);

function oauth(app_key, redirect_uri) {
  return regeneratorRuntime.async(function oauth$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new Promise(function (resolve, reject) {
          var state = Math.random() + '';

          _reactNative.LinkingIOS.addEventListener('url', handleUrl);

          _reactNative.LinkingIOS.openURL(['https://www.dropbox.com/1/oauth2/authorize', '?response_type=token', '&client_id=' + app_key, '&redirect_uri=' + redirect_uri, '&state=' + state].join(''));
          function handleUrl(event) {
            var _event$url$match = event.url.match(/\#(.*)/);

            var _event$url$match2 = _slicedToArray(_event$url$match, 2);

            var query_string = _event$url$match2[1];

            var query = _queryString2['default'].parse(query_string);

            if (state === query.state) {
              resolve(query.access_token, query.uid);
            } else {
              reject(new Error('Oauth2 security error'));
            }

            _reactNative.LinkingIOS.removeEventListener('url', handleUrl);
          }
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

// `file://${path}`
// `https://api-content.dropbox.com/1/files_put/auto/${dest_path}`

function uploadAndDelete(path, uploadUrl) {
  var res;
  return regeneratorRuntime.async(function uploadAndDelete$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return FileTransfer.upload({
          path: 'file://' + path,
          uploadUrl: uploadUrl
        });

      case 2:
        res = context$1$0.sent;

        if (!(res.status === '200')) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return _reactNativeFs2['default'].unlink(path);

      case 6:
        context$1$0.next = 9;
        break;

      case 8:
        throw new Error('Transfer Failed: ' + res.status);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getFolders(access_token) {
  var res;
  return regeneratorRuntime.async(function getFolders$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return fetch('https://api.dropbox.com/1/metadata/auto/', {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        });

      case 2:
        res = context$1$0.sent;

        console.log(res);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}