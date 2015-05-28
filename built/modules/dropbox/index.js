'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var React = require('react-native');
var LinkingIOS = React.LinkingIOS;
var NativeModules = React.NativeModules;
var FileTransfer = NativeModules.FileTransfer;

FileTransfer = thenifyAll(FileTransfer, {}, ['upload']);

var thenifyAll = require('thenify');
var qs = require('query-string');
var RNFS = require('react-native-fs');

exports.oauth = function oauth(app_key, redirect_uri) {
  return regeneratorRuntime.async(function oauth$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new Promise(function (resolve, reject) {
          var state = Math.random() + '';

          LinkingIOS.addEventListener('url', handleUrl);

          LinkingIOS.openURL(['https://www.dropbox.com/1/oauth2/authorize', '?response_type=token', '&client_id=' + app_key, '&redirect_uri=' + redirect_uri, '&state=' + state].join(''));
          function handleUrl(event) {
            var _event$url$match = event.url.match(/\#(.*)/);

            var _event$url$match2 = _slicedToArray(_event$url$match, 2);

            var query_string = _event$url$match2[1];

            var query = qs.parse(query_string);

            if (state === query.state) {
              resolve(query.access_token, query.uid);
            } else {
              reject(new Error('Oauth2 security error'));
            }

            LinkingIOS.removeEventListener('url', handleUrl);
          }
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// `file://${path}`
// `https://api-content.dropbox.com/1/files_put/auto/${dest_path}`

exports.uploadAndDelete = function uploadAndDelete(path, uploadUrl) {
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
        return RNFS.unlink(path);

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
};

exports.getFolders = function getFolders(access_token) {
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
};