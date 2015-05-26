import * as dropbox from '../modules/dropbox'
import { getters, default as flux } from '../Flux.js'
import { toImmutable } from 'nuclear-js'
import moment from 'moment'

export function storeSites (sites) {
  flux.dispatch('STORE_SITES', toImmutable(sites));
}

export async function getSites () {
  const sites = await dropbox.getFolders()
  storeSites(sites)
}

export function selectSite (path) {
  flux.dispatch('SELECT_SITE', path)
}

export async function tookPicture (path) {
  await dropbox.uploadAndDelete(
    path,
    flux.evaluate(getters.selectedSite) +
    `/${moment().format('MMMM Do YYYY')}` +
    `/${moment().format('h:mm:ss a')}.jpg`
  )
}
