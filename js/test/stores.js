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
  flux.initState().then(() => {
    const origSites = {
      'Garden Shed': {
        path: 'Garden Shed',
        other: 'stuff'
      }
    }

    flux.dispatch('set sites', origSites)

    const sites = flux.evaluateToJS(['sites', 'sites'])

    t.equals(sites, origSites)
    t.end()
  }).catch((e) => { throw e })
})

test('toUpload', function (t) {
  flux.reset()
  flux.initState().then(() => {
    const photo = {
      path: 'foo',
      timestamp: 3
    }

    flux.dispatch('took photo', photo)
    flux.reset()
    flux.initState().then(() => {
      const photosToUpload = flux.evaluateToJS(['toUpload', 'photos'])
      t.deepEquals({ [photo.path]: photo}, photosToUpload)
      t.end()
    })
  })
})
