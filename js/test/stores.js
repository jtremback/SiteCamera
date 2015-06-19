const mock = require('mock')
const test = require('tape')

const toUpload = mock(require.resolve('../stores/toUpload.js'), {
  'react-native': {
    AsyncStorage: {
      getItem () {
        console.log('getItem')
      },
      setItem () {
        console.log('setItem')
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

test('toUpload', async function (t) {
  const photo = {
    path: 'foo',
    timestamp: 3
  }

  flux.dispatch('TOOK_PHOTO', photo)
  flux.reset()
  await flux.setPersistedState()
  const photosToUpload = flux.evaluateToJS(['toUpload', 'photos'])
  t.equals([photo], photosToUpload)
})
