var dropbox = require('./modules/dropbox')
var flux = require('./flux.js')
var getters = require('./getters.js')
var { toImmutable } = require('nuclear-js')
var moment = require('moment')
const RNFS = require('react-native-fs')
var config = require('../config.js')

exports.storeSites = storeSites
function storeSites(sites) {
  flux.dispatch('set sites', toImmutable(sites));
}

exports.getSites = getSites
function getSites () {
  const access_token = flux.evaluate(getters.dropboxAccessToken)
  dropbox.getFolders(access_token)
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
  flux.dispatch('set config property', [k, toImmutable(v)])
}

exports.selectSite = selectSite
function selectSite (path) {
  flux.dispatch('select current site', path)
}

exports.tookPhoto = tookPhoto
function tookPhoto (path) {
  const photo = toImmutable({
    path: path,
    site: flux.evaluate(getters.selectedSite),
    timestamp: Date.now()
  })

  flux.dispatch('took photo', photo)
  uploadPhoto(photo)
}

async function uploadPhoto (photo) {
  const uploadUrl = encodeURI(
    photo.getIn(['site', 'name']) +
    `/${moment(photo.get('timestamp')).format('MMMM Do YYYY')}` +
    `/${moment(photo.get('timestamp')).format('h.mm.ss.a')}.jpg`
  )

  const res = await dropbox.uploadPhoto(
    flux.evaluate(getters.dropboxAccessToken),
    photo.get('path'),
    uploadUrl
  )

  if (res.status === '200') {
    flux.dispatch('uploaded photo', photo)
    RNFS.unlink(photo.get('path'))
  }
}

exports.uploadPhotos = uploadPhotos
async function uploadPhotos () {
  const promises = flux.evaluate(getters.photosToUpload).map(photo => {
    return uploadPhoto(photo)
  })

  flux.dispatch('started uploading photos')
  await Promise.all(promises)
  flux.dispatch('finished uploading photos')
}
