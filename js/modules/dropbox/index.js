var React = require('react-native')
var {
  LinkingIOS,
  NativeModules
} = React

let { FileTransfer } = NativeModules
FileTransfer = thenifyAll(FileTransfer, {}, [ 'upload' ])

var thenifyAll = require('thenify')
var qs = require('query-string')
var RNFS = require('react-native-fs')

exports.oauth = async function oauth (app_key, redirect_uri) {
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

exports.uploadAndDelete = async function uploadAndDelete (path, uploadUrl) {
  let res = await FileTransfer.upload({
    path: `file://${path}`,
    uploadUrl: uploadUrl
  })

  if (res.status === '200') {
    await RNFS.unlink(path)
  } else {
    throw new Error('Transfer Failed: ' + res.status)
  }
}

exports.getFolders = async function getFolders (access_token) {
  let res = await fetch(`https://api.dropbox.com/1/metadata/auto/`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  console.log(res)
}
