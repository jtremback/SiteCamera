const events = eventMap([
  'initialize photos.toUpload',
  'initialize config.deviceId',
  'initialize user.dropboxAccessToken',
  'set config property',
  'new device id',
  'took photo',
  'started photo upload',
  'successful photo upload',
  'failed photo upload',
  'get locations',
  'add location',
  'select current location',
  'get dropbox user profile',
  'get dropbox access token',
  'sign out of dropbox',
])

function eventMap (array) {
  return array.reduce((acc, item) => {
    acc[item] = item
    return acc
  }, {})
}

module.exports = function (eventName) {
  const event = events[eventName]
  if (event === undefined) { throw new Error(`event "${eventName}" does not exist`)}
  return event
}
