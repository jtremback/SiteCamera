exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'list'],
  (selected, list) => list[selected].toJS()
]

exports.sites = [
  ['sites', 'sites'],
  (sites) => sites.toJS()
]

exports.dropboxAccessToken = ['config', 'dropbox_access_token']
