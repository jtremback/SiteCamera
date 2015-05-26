import {
  LinkingIOS,
  NativeModules
} from 'react-native'

let { FileTransfer } = NativeModules
FileTransfer = thenifyAll(FileTransfer, {}, [ 'upload' ])

import thenifyAll from 'thenify'
import qs from 'query-string'
import RNFS from 'react-native-fs'

import calls from './mock_data.js'


export async function oauth (app_key, redirect_uri) {
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

export async function uploadAndDelete (path, uploadUrl) {
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

export async function getFolders (access_token) {
  let res = await fetch(`https://api.dropbox.com/1/metadata/auto/`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })

  console.log(res)
}
