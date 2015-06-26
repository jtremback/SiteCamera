var Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      dropbox_access_token: null,
      deviceId: null
    })
  },

  initialize () {
    this.on('set config property', function (state, [k, v]) {
      return state.set(k, v)
    })

    this.on('set device id', (state, id) => state.set('deviceId', id))
  }
})
