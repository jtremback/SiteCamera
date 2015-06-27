const { Store, toImmutable } = require('nuclear-js')

// {
//   toUpload: { <path>: { ... } },
//   currentlyUploading: { <path>: { ... } },
//   failedUploads: { <path>: { ... } },
// }

module.exports = new Store({
  initialize () {
    this.on('initialize photos.toUpload', (state, storedState) => state.set('toUpload', storedState))
    this.on('took photo', tookPhoto)

    this.on('started photo upload', startedUpload)
    this.on('successful photo upload', successfulUpload)
    this.on('failed photo upload', failedUpload)
  }
})

function tookPhoto (state, photo) {
  return state.setIn(['toUpload', photo.get('path')], photo)
}

function startedUpload (state, photo) {
  return state.setIn(['currentlyUploading', photo.get('path')], photo)
}

function successfulUpload (state, photo) {
  return state
    .deleteIn(['currentlyUploading', photo.get('path')])
    .deleteIn(['toUpload', photo.get('path')])
}

function failedUpload (state, photo) {
  return state
    .deleteIn(['currentlyUploading', photo.get('path')])
}
