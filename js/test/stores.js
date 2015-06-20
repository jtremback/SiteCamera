const mock = require('mock')
const test = require('tape')

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


test('sites', function (t) {
  flux.initStateAsync().then(() => {
    const origSites = {
      'Garden Shed': {
        path: 'Garden Shed',
        other: 'stuff'
      }
    }

    flux.dispatch('REPLACE_SITES', origSites)

    const sites = flux.evaluateToJS(['sites', 'sites'])

    t.equals(sites, origSites)
    t.end()
  }).catch((e) => { throw e })
})

test('toUpload', function (t) {
  flux.reset()
  flux.initStateAsync().then(() => {
    const photo = {
      path: 'foo',
      timestamp: 3
    }

    flux.dispatch('TOOK_PHOTO', photo)
    flux.reset()
    flux.initStateAsync().then(() => {
      const photosToUpload = flux.evaluateToJS(['toUpload', 'photos'])
      t.deepEquals({ [photo.path]: photo}, photosToUpload)
      t.end()
    })
  })
})
