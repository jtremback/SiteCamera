var React = require('react-native')
var {
  LinkingIOS,
  NativeModules
} = React

var qs = require('query-string')
var RNFS = require('react-native-fs')

var promisify = require('es6-promisify')
let { FileTransfer } = NativeModules
var upload = promisify(FileTransfer.upload)

exports.oauth = oauth
function oauth (app_key, redirect_uri) {
  return new Promise((resolve, reject) => {
    const state = Math.random() + ''

    LinkingIOS.addEventListener('url', handleUrl)

    LinkingIOS.openURL([
      'https://www.dropbox.com/1/oauth2/authorize',
      '?response_type=token',
      '&client_id=' + app_key,
      '&redirect_uri=' + redirect_uri,
      `&state=${state}`
    ].join(''))

    function handleUrl (event) {
      const [, query_string] = event.url.match(/\#(.*)/)
      const query = qs.parse(query_string)

      if (state === query.state) {
        resolve(query.access_token, query.uid)
      } else {
        reject(new Error('Oauth2 security error'))
      }

      LinkingIOS.removeEventListener('url', handleUrl)
    }
  })
}

// `file://${path}`
// `https://api-content.dropbox.com/1/files_put/auto/${dest_path}`

exports.uploadAndDelete = uploadAndDelete
function uploadAndDelete (path, uploadUrl) {
  return upload({
    path: `file://${path}`,
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
  }).then((res) => {
    console.log(res)
  })
}
