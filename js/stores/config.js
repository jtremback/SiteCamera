const Nuclear = require('nuclear-js')
const toImmutable = Nuclear.toImmutable
const config = require('../../config.js')
const event = require('../events.js')

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      mixpanelToken: config.mixpanelToken,
      deviceId: null
    })
  },

  initialize () {
    this.on(event('set config property'), function (state, [k, v]) {
      return state.set(k, v)
    })

    this.on(event('new device id'), (state, id) => state.set('deviceId', id))
    this.on(event('initialize config.deviceId'), (state, id) => {
      return state.set('deviceId', id)
    })
  }
})
