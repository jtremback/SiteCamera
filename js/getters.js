exports.selectedSite = [
  ['sites', 'selected'],
  ['sites', 'sites'],
  (selected, sites) => sites.get(selected)
]

exports.sites = [
  ['sites', 'sites'],
  (sites) => sites
]

exports.mixpanelConfig = [
  ['config', 'mixpanelToken'],
  ['config', 'deviceId'],
  ['user', 'dropboxProfile', 'uid'],
  (mixpanelToken, deviceId, dropboxUid) => {
    return {
      token: mixpanelToken,
      distinct_id: dropboxUid || deviceId,
      device_id: deviceId
    }
  }
]

exports.deviceId = ['config', 'deviceId']

exports.photosToUpload = ['photos', 'toUpload']

exports.photosCurrentlyUploading = ['photos', 'currentlyUploading']

exports.dropboxAccessToken = ['user', 'dropboxAccessToken']
