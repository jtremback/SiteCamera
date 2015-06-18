const { Store, toImmutable } = require('nuclear-js')
const { AsyncStorage } = require('react-native')

let store = new Store({
  getInitialState () {
    return toImmutable({
      photos: {}
    })
  },

  initialize () {
    this.on('INIT_STORES', (state, initState) => initState.toUpload)
    this.on('TOOK_PHOTO', tookPhoto)
    this.on('UPLOADED_PHOTO', uploadedPhoto)
  }
})

store.getInitData = async function () {
  const photos = await AsyncStorage.getItem('toUpload.photos')
  return toImmutable({
    photos: photos
  })
}

function tookPhoto (state, photo) {
  const newState = state.setIn(['photos', photo.path], photo)

  AsyncStorage.setItem('toUpload.photos', newState.toJS())
  return newState
}

function uploadedPhoto (state, photo) {
  const newState = state.deleteIn(['photos', photo.path])

  AsyncStorage.setItem('toUpload.photos', newState.toJS())
  return newState
}

module.exports = store
