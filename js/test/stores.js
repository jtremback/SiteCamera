const mock = require('mock')
const test = require('tape')
const { toImmutable } = require('nuclear-js')

let fakeStorage = {}

const flux = mock(require.resolve('../flux.js'), {
  'react-native': {
    AsyncStorage: {
      async getItem (key) {
        return fakeStorage[key]
      },
      async setItem (key, item) {
        fakeStorage[key] = item
        return null
      }
    }
  }
})

test('toUpload', function (t) {
  flux.reset()
  flux.init().then(() => {
    let photo = toImmutable({
      path: 'foo',
      timestamp: 3
    })

    flux.dispatch('took photo', photo)
    flux.reset()
    flux.init().then(() => {
      const photosToUpload = flux.evaluateToJS(['photos', 'toUpload'])
      photo = photo.toJS()
      t.deepEquals({[photo.path]: photo}, photosToUpload)
      t.end()
    })
  })
})
