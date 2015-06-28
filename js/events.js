module.exports = eventMap([
  'set config property',
  'new device id',
  'initialize photos.toUpload',
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
