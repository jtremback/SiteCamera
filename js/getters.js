exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'sites'],
  (selected, sites) => sites.get(selected)
]

exports.sites = [
  ['sites', 'sites'],
  (sites) => sites
]

exports.photosToUpload = ['photos', 'toUpload']

exports.photosCurrentlyUploading = ['photos', 'currentlyUploading']

exports.dropboxAccessToken = ['config', 'dropbox_access_token']
