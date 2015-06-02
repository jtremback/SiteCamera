exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'list'],
  (selected, list) => list[selected]
]

exports.sites = [
  ['sites', 'list']
]

exports.dropboxAccessToken = ['config', 'dropbox_access_token']
