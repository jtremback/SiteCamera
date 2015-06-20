const { Store, toImmutable } = require('nuclear-js')

module.exports = new Store({
  initialize () {
    this.on('SET_STATE_toUpload', (state, newState) => {
      return newState
    })
    this.on('TOOK_PHOTO', tookPhoto)
    this.on('UPLOADED_PHOTO', uploadedPhoto)
  }
})

function tookPhoto (state, photo) {
  return state.setIn(['photos', photo.path], photo)
}

function uploadedPhoto (state, photo) {
  return state.deleteIn(['photos', photo.path])
}
