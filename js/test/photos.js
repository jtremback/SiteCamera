const mock = require('mock')
const tape = require('tape')
const getters = require('../getters.js')
const { toImmutable } = require('nuclear-js')

let fakeStorage = {}
let fakeFS = {}
let fakeDropbox = {}
let fakeDropboxRes = null

const locations = {
  locations: {
    'Garden Shed': {
      'name': 'Garden Shed',
      'path': '/Garden Shed'
    },
    'Vallejo Gymnasium': {
      'name': 'Vallejo Gymnasium',
      'path': '/Vallejo Gymnasium'
    }
  },
  selected: 'Vallejo Gymnasium',
}

Date.now = function () { return 0 }

process.on('unhandledRejection', function(e) {
  throw e
})


async function restartApp () {
  flux.reset()
  flux.__state = flux.__state.set('locations', toImmutable(locations))
  await flux.init()
}

function test (a, b) {
  fakeStorage = {}
  fakeFS = {}
  fakeDropbox = {}

  restartApp().then(() => {
    tape(a, b)
  })
}

const flux = mock(require.resolve('../flux.js'), {
  'react-native': {
    AsyncStorage: {
      async getItem (key) {
        return fakeStorage[key]
      },
      async setItem (key, item) {
        fakeStorage[key] = item
      }
    }
  }
})


const actions = mock(require.resolve('../actions.js'), {
  'react-native-fs': {
    unlink (path) {
      fakeFS[path] = 'deleted'
    }
  },
  [require.resolve('../flux.js')]: flux,
  [require.resolve('../modules/mixpanel/')]: {
    people: function () {
      return new Promise((resolve, reject) => {})
    },
    events: function () {
      return new Promise((resolve, reject) => {})
    }
  },
  [require.resolve('../modules/dropbox/')]: {
    async uploadPhoto (accessToken, path, uploadUrl) {
      fakeDropbox[path] = uploadUrl

      if (fakeDropboxRes) {
        return {
          status: fakeDropboxRes
        }
      }
    }
  }
})


test('successful upload', function (t) {
  const path = 'foo'
  fakeFS[path] = true
  fakeDropboxRes = 200

  actions.tookPhoto(path)

  setTimeout(() => {
    t.equal(fakeFS[path], 'deleted')
    t.equal(fakeDropbox[path], 'Vallejo%20Gymnasium/December%2031st%201969/4.00.00.pm.jpg')
    t.end()
  }, 0)
})

test('unsuccessful upload', function (t) {
  const path = 'foo'
  fakeFS[path] = true
  fakeDropboxRes = 404

  actions.tookPhoto(path)
  restartApp().then(() => {
    t.equal(fakeFS[path], true)
    t.deepEqual(flux.evaluate(getters.photosToUpload).toJS(), { foo: {
      path: 'foo',
      location: { name: 'Vallejo Gymnasium', path: '/Vallejo Gymnasium' },
      timestamp: 0 }})
    t.end()
  })
})

test('successful reupload', function (t) {
  const path = 'foo'
  fakeFS[path] = true
  fakeDropboxRes = 200

  flux.__state.setIn(['photos', 'toUpload'], { foo: {
    path: 'foo',
    location: { name: 'Vallejo Gymnasium', path: '/Vallejo Gymnasium' },
    timestamp: 0 }})

  actions.uploadPhotos()
  t.deepEqual(flux.evaluate(getters.photosCurrentlyUploading).toJS(), { foo: {
    path: 'foo',
    location: { name: 'Vallejo Gymnasium', path: '/Vallejo Gymnasium' },
    timestamp: 0 }})
  setTimeout(() => {
    t.equal(flux.evaluate(getters.photosCurrentlyUploading).size, 0)
    t.equal(fakeFS[path], 'deleted')
    t.equal(fakeDropbox[path], 'Vallejo%20Gymnasium/December%2031st%201969/4.00.00.pm.jpg')
    t.end()
  }, 0)
})
