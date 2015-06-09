const React = require('react-native')
const {
  LinkingIOS,
  NativeModules
} = React

const qs = require('query-string')
const RNFS = require('react-native-fs')

const promisify = require('es6-promisify')
const { FileTransfer } = NativeModules
const upload = promisify(FileTransfer.upload)

exports.oauth = oauth
function oauth (app_key, redirect_uri) {
  return new Promise((resolve, reject) => {
    const state = Math.random() + ''

    LinkingIOS.addEventListener('url', _handleUrl)

    LinkingIOS.openURL([
      'https://www.dropbox.com/1/oauth2/authorize',
      '?response_type=token',
      '&client_id=' + app_key,
      '&redirect_uri=' + redirect_uri,
      `&state=${state}`
    ].join(''))

    function _handleUrl (event) {
      const [, query_string] = event.url.match(/\#(.*)/)
      const query = qs.parse(query_string)

      if (state === query.state) {
        resolve(query.access_token, query.uid)
      } else {
        reject(new Error('Oauth2 security error'))
      }

      LinkingIOS.removeEventListener('url', _handleUrl)
    }
  })
}

// `file://${path}`
// `https://api-content.dropbox.com/1/files_put/auto/${dest_path}`

exports.uploadAndDelete = uploadAndDelete
function uploadAndDelete (access_token, path, uploadUrl) {
  return upload({
    path: `file://${path}`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    uploadUrl: uploadUrl
  }).then((res) => {
    if (res.status === '200') {
      RNFS.unlink(path)
    } else {
      throw new Error('Transfer Failed: ' + res.status)
    }
  })
}

exports.getFolders = getFolders
function getFolders (access_token) {
  return fetch(`https://api.dropbox.com/1/metadata/auto/`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  .then(res => res.json())
  .then(function(json) {
    return json.contents.reduce((acc, item) => {
      const name = item.path.slice(1)
      acc[name] = { name }
      return acc
    }, {})
  })
}
