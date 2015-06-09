exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'sites'],
  (selected, sites) => {
    sites.get(selected).toJS()
  }
]

exports.sites = [
  ['sites', 'sites'],
  (sites) => sites.toJS()
]

exports.dropboxAccessToken = ['config', 'dropbox_access_token']
