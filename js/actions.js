const dropbox = require('./modules/dropbox')
const flux = require('./flux.js')
const getters = require('./getters.js')
const { toImmutable } = require('nuclear-js')
const moment = require('moment')
const RNFS = require('react-native-fs')
const config = require('../config.js')
const mixpanel = require('./modules/mixpanel/index.js')
const event = require('./events.js')

exports.initApp = initApp
async function initApp () {
  await flux.init()

  if (!flux.evaluate(getters.deviceId)) {
    flux.dispatch(event('new device id'), Number(String(Math.random()).slice(2)))
  }

  mpEvents('startup')

  await dropboxOauth()
  mpRegisterProfile().catch(console.error)
  await getSites()
}

exports.mpEvents = mpEvents
function mpEvents (event, properties) {
  mixpanel.events(flux.evaluate(getters.mixpanelConfig), event, properties).catch(console.error)
}

exports.mpPeople = mpPeople
function mpPeople (update) {
  mixpanel.people(flux.evaluate(getters.mixpanelConfig), update).catch(console.error)
}

exports.mpRegisterProfile = mpRegisterProfile
async function mpRegisterProfile () {
  const profile = await getProfile()
  mpPeople({ $set: {
    $name: profile.display_name,
    dropboxProfile: profile
  }})
  mpEvents('$create_alias', {
    alias: profile.uid
  })
}

exports.getSites = getSites
async function getSites () {
  const folders = await dropbox.getFolders(flux.evaluate(getters.dropboxAccessToken))
  const sites = folders.reduce((acc, item) => {
    const name = item.path.slice(1)
    acc[name] = { name }
    return acc
  }, {})

  flux.dispatch(event('get sites'), toImmutable(sites))
  return sites
}

exports.getProfile = getProfile
async function getProfile () {
  const profile = await dropbox.getAccountInfo(flux.evaluate(getters.dropboxAccessToken))

  flux.dispatch(event('get dropbox user profile'), profile)
  return profile
}

exports.dropboxOauth = dropboxOauth
async function dropboxOauth () {
  const accessToken = await dropbox.oauth(config.app_key, config.redirect_url)

  flux.dispatch(event('get dropbox access token'), accessToken)
  return accessToken
}

exports.selectSite = selectSite
function selectSite (path) {
  flux.dispatch(event('select current site'), path)
}

exports.tookPhoto = tookPhoto
function tookPhoto (path) {
  const photo = toImmutable({
    path: path,
    site: flux.evaluate(getters.selectedSite),
    timestamp: Date.now()
  })

  mpEvents('took photo', photo.toJS())

  flux.dispatch(event('took photo'), photo)
  uploadPhoto(photo)
}

async function uploadPhoto (photo) {
  flux.dispatch(event('started photo upload'), photo)
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
    flux.dispatch(event('successful photo upload'), photo)
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
async function addSite (name) {
  flux.dispatch(event('add site'), name)
}
