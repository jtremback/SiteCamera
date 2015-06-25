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
  //   setConfig('dropbox_access_token', access_token)
  //   getSites()
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
  flux.dispatch('started photo upload', photo)
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

  if (res.status === 200) {
    flux.dispatch('successful photo upload', photo)
    RNFS.unlink(photo.get('path'))
  } else {
    flux.dispatch('failed photo upload', photo)
  }
}

exports.uploadPhotos = uploadPhotos
async function uploadPhotos () {
  const promises = flux.evaluate(getters.photosToUpload).toArray().map(photo => {
    return uploadPhoto(photo)
  })

  await Promise.all(promises)
}

exports.addSite = addSite
async function addSite (path) {
  const res = await dropbox.addFolder(
    flux.evaluate(getters.dropboxAccessToken),
    path
  )

  if (res.status === 200) {
    flux.dispatch('successful add site', path)
  } else {
    flux.dispatch('failed add site', path)
  }
}
