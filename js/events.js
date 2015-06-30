const events = eventMap([
  'set config property',
  'new device id',
  'initialize photos.toUpload',
  'initialize config.deviceId',
  'took photo',
  'started photo upload',
  'successful photo upload',
  'failed photo upload',
  'get sites',
  'add site',
  'select current site',
  'get dropbox user profile',
  'get dropbox access token'
])

function eventMap (array) {
  return array.reduce((acc, item) => {
    acc[item] = item
    return acc
  }, {})
}

module.exports = function (eventName) {
  const event = events[eventName]
  if (event === undefined) { throw new Error('event does not exist')}
  return event
}
