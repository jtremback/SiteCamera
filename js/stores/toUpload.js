const { Store, toImmutable } = require('nuclear-js')

module.exports = new Store({
  initialize () {
    this.on('initialize toUpload store', (state, newState) => {
      return newState
    })
    this.on('started uploading photos', (state) => state.set('uploadingPhotos', true))
    this.on('finished uploading photos', (state) => state.set('uploadingPhotos', false))
    this.on('took photo', tookPhoto)
    this.on('uploaded photo', uploadedPhoto)
  }
})

function tookPhoto (state, photo) {
  return state.setIn(['photos', photo.get('path')], photo)
}

function uploadedPhoto (state, photo) {
  return state.deleteIn(['photos', photo.get('path')])
}
