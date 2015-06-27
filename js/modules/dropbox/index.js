const React = require('react-native')
const {
  LinkingIOS,
  NativeModules
} = React

const qs = require('query-string')

const promisify = require('es6-promisify')
const { FileUpload } = NativeModules
const upload = promisify(FileUpload.upload)

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

exports.uploadPhoto = uploadPhoto
function uploadPhoto (access_token, path, upload_path) {
  // if (Math.random() > .5) {
  //   return upload({
  //     file: {
  //       filepath: path, // require, file absoluete path
  //       filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
  //     },
  //     headers: {
  //       'Authorization': `Bearer ${access_token}3`
  //     },
  //     uploadUrl: 'https://api-content.dropbox.com/1/files_put/auto/' + upload_path,
  //   })
  // }

  return upload({
    file: {
      filepath: path, // require, file absoluete path
      filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
    },
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    uploadUrl: 'https://api-content.dropbox.com/1/files_put/auto/' + upload_path,
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
    return json.contents
  })
}

exports.addFolder = addFolder
function addFolder (access_token, path) {
  return fetch(`https://api.dropbox.com/1/fileops/create_folder` +
  `?root=auto` + `&path=${path}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
  })
}

exports.getAccountInfo = getAccountInfo
function getAccountInfo (access_token) {
  return fetch('https://api.dropbox.com/1/account/info', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  .then(res => res.json())
}
