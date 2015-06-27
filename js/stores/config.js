const Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable
const config = require('../../config.js')

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      mixpanelToken: config.mixpanelToken,
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
