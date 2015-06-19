const mock = require('mock')
const test = require('tape')

let fakeStorage = {}

const toUpload = mock(require.resolve('../stores/toUpload.js'), {
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

const flux = mock(require.resolve('../flux.js'), {
  [require.resolve('../stores/toUpload.js')]: toUpload
})

test('sites', function (t) {
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
})

test('toUpload', function (t) {
  const photo = {
    path: 'foo',
    timestamp: 3
  }

  flux.dispatch('TOOK_PHOTO', photo)
  flux.reset()
  flux.setPersistedState().then(() => {
    const photosToUpload = flux.evaluateToJS(['toUpload', 'photos'])
    t.equals([photo], photosToUpload)
    console.log('fakeStorage', fakeStorage)
    t.end()
  })
})
