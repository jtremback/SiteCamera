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
    this.on(event['set dropbox user profile'], (state, profile) => {
      return state.set('dropboxProfile', toImmutable(profile))
    })
    this.on(event['set dropbox access token'], (state, token) => {
      return state.set('dropboxAccessToken', token)
    })
  }
})
