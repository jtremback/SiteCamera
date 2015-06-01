var dropbox = require('./modules/dropbox')
var flux = require('./flux.js')
var { getters } = flux
var { toImmutable } = require('nuclear-js')
var moment = require('moment')

exports.storeSites = storeSites
function storeSites(sites) {
  flux.dispatch('STORE_SITES', toImmutable(sites));
}

exports.getSites = async function getSites () {
  dropbox.getFolders().then((sites) => {
    storeSites(sites)
  })
}

exports.selectSite = selectSite
function selectSite(path) {
  flux.dispatch('SELECT_SITE', path)
}

exports.tookPicture = tookPicture
function tookPicture (path) {
  dropbox.uploadAndDelete(
    path,
    flux.evaluate(getters.selectedSite) +
      `/${moment().format('MMMM Do YYYY')}` +
      `/${moment().format('h:mm:ss a')}.jpg`
  ).then(() => {
    console.log('hyphy')
  })
}
