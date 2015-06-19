const test = require('tape')
const flux = require('../flux.js')

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
