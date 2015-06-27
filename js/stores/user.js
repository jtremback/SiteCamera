var Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      dropboxProfile: null,
      dropboxAccessToken: null
    })
  },

  initialize () {
    this.on('set dropbox user profile', (state, profile) => {
      return state.set('dropboxProfile', toImmutable(profile))
    })
    this.on('set dropbox access token', (state, token) => {
      return state.set('dropboxAccessToken', token)
    })
  }
})
