var dropbox = require('./modules/dropbox')
var flux = require('./flux.js')
var getters = require('./getters.js')
var { toImmutable } = require('nuclear-js')
var moment = require('moment')
const RNFS = require('react-native-fs')
var config = require('../config.js')

exports.storeSites = storeSites
function storeSites(sites) {
  flux.dispatch('REPLACE_SITES', toImmutable(sites));
}

exports.getSites = getSites
function getSites () {
  const access_token = flux.evaluate(getters.dropboxAccessToken)
  return dropbox.getFolders(access_token)
  .then(folders => {
    return folders.reduce((acc, item) => {
      const path = item.path
      const name = path.slice(1)
      acc[name] = { name, path }
      return acc
    }, {})
  })
  .then(storeSites)
}

exports.dropboxOauth = dropboxOauth
function dropboxOauth () {
  // dropbox.oauth(config.app_key, config.redirect_url)
  // .then((access_token) => {
  //   console.log(access_token)
  //   setConfig('dropbox_access_token', access_token)
    // getSites()
  // })

  // Temporary!
  setConfig('dropbox_access_token', 'eFEcGxgInLIAAAAAAAAWLBDbWdhsJ-_yQbmOo84eD6_GOuULZ62ZSIbydYYMzCLE')
  getSites()
}

exports.setConfig = setConfig
function setConfig (k, v) {
  flux.dispatch('SET_CONFIG', [k, toImmutable(v)])
}

exports.selectSite = selectSite
function selectSite (path) {
  flux.dispatch('SELECT_SITE', path)
}

exports.tookPhoto = tookPhoto
function tookPhoto (path) {
  const uploadUrl = encodeURI(flux.evaluate(getters.selectedSite).path +
    `/${moment().format('MMMM Do YYYY')}` +
    `/${moment().format('h.mm.ss.a')}.jpg`
  )

  return dropbox.uploadPhoto(
    flux.evaluate(getters.dropboxAccessToken),
    path,
    uploadUrl
  ).then((res) => {
    if (res.status !== '200') {
      throw new Error('Transfer Failed: ' + JSON.stringify(res))
    } else {
      return RNFS.unlink(path)
        .then(console.log)
        .catch((err) => console.log(err))
    }
  })
  .catch(() => {
    checkFailedUploads()
  })
}

exports.checkFailedUploads = checkFailedUploads
function checkFailedUploads () {
  RNFS.readDir(RNFS.MainBundle)
    .then(result => console.log(result))
}
