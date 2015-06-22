exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'sites'],
  (selected, sites) => sites.get(selected)
]

exports.sites = [
  ['sites', 'sites'],
  (sites) => sites
]

exports.photosToUpload = ['toUpload', 'photos']

exports.uploadingPhotos = ['toUpload', 'uploadingPhotos']

exports.dropboxAccessToken = ['config', 'dropbox_access_token']
