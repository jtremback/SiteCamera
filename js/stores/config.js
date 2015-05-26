import Nuclear from 'nuclear-js'
const toImmutable = Nuclear.toImmutable

module.exports = new Nuclear.Store({
  getInitialState () {
    return toImmutable({
      dropbox_access_token: null
    })
  },

  initialize () {
    this.on('SET_CONFIG_OPTION', (state, { k, v }) => {
      return state.set(k, v)
    })
  }
})
