var dropbox = require('./modules/dropbox')
var flux = require('./flux.js')
var getters = require('./getters.js')
var { toImmutable } = require('nuclear-js')
var moment = require('moment')
const RNFS = require('react-native-fs')
var config = require('../config.js')
const { NativeModules } = require('react-native')

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
  const photo = {
    path: path,
    site: flux.evaluate(getters.selectedSite),
    timestamp: Date.now()
  }

  flux.dispatch('TOOK_PHOTO', photo)
}


function uploadPhoto (photo) {
  const uploadUrl = encodeURI(
    photo.site +
    `/${moment(photo.get('timestamp')).format('MMMM Do YYYY')}` +
    `/${moment(photo.get('timestamp')).format('h.mm.ss.a')}.jpg`
  )

  return dropbox.uploadPhoto(
    flux.evaluate(getters.dropboxAccessToken),
    photo.get('path'),
    uploadUrl
  ).then((res) => {
    if (res.status !== '200') {
      throw new Error('Transfer Failed: ' + JSON.stringify(res))
    }
    flux.dispatch('UPLOADED_PHOTO', photo)
  })
}

exports.uploadPhotos = uploadPhotos
async function uploadPhotos () {
  flux.evaluate(getters.toUpload).forEach(uploadPhoto)
}
