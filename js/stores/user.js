const Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable
const event = require('../events.js')

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      dropboxProfile: null,
      dropboxAccessToken: null
    })
  },

  initialize () {
    this.on(event('get dropbox user profile'), (state, profile) => {
      return state.set('dropboxProfile', toImmutable(profile))
    })
    this.on(event('get dropbox access token'), (state, token) => {
      return state.set('dropboxAccessToken', token)
    })
    this.on(event('sign out of dropbox'), (state) => {
      return state.set('dropboxProfile', null).set('dropboxAccessToken', null)
    })
    this.on(event('initialize user.dropboxAccessToken'), (state, storedState) => {
      return state.set('dropboxAccessToken', storedState)
    })
  }
})
