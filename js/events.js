module.exports = eventMap([
  'set config property',
  'set device id',
  'initialize photos.toUpload',
  'took photo',
  'started photo upload',
  'successful photo upload',
  'failed photo upload',
  'set sites',
  'add site',
  'select current site',
  'set dropbox user profile',
  'set dropbox access token'
])

function eventMap (array) {
  return array.reduce((acc, item) => {
    acc[item] = item
    return acc
  }, {})
}
