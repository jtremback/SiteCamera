var dropbox = require('./modules/dropbox')
var flux = require('./flux.js')
var getters = require('./getters.js')
var { toImmutable } = require('nuclear-js')
var moment = require('moment')
var config = require('../config.js')

exports.storeSites = storeSites
function storeSites(sites) {
  flux.dispatch('STORE_SITES', toImmutable(sites));
}

exports.getSites = getSites
function getSites () {
  return dropbox.getFolders().then((sites) => {
    storeSites(sites)
  })
}

exports.dropboxOauth = dropboxOauth
function dropboxOauth () {
  dropbox.oauth(config.app_key, config.redirect_url).then((access_token) => {
    setConfig('dropbox_access_token', access_token)
    getSites()
  })
}

exports.setConfig = setConfig
function setConfig (k, v) {
  flux.dispatch('SET_CONFIG', [k, toImmutable(v)])
}

exports.selectSite = selectSite
function selectSite (path) {
  flux.dispatch('SELECT_SITE', path)
}

exports.tookPicture = tookPicture
function tookPicture (path) {
  return dropbox.uploadAndDelete(
    path,
    flux.evaluate(getters.selectedSite) +
      `/${moment().format('MMMM Do YYYY')}` +
      `/${moment().format('h:mm:ss a')}.jpg`
  ).then(() => {
    console.log('hyphy')
  })
}
