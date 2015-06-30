exports.selectedSite = [
  ['locations', 'selected'],
  ['locations', 'locations'],
  (selected, locations) => locations.get(selected)
]

exports.locations = [
  ['locations', 'locations'],
  (locations) => locations
]

exports.deviceId = ['config', 'deviceId']

exports.mixpanelConfig = [
  ['config', 'mixpanelToken'],
  exports.deviceId,
  ['user', 'dropboxProfile', 'uid'],
  (mixpanelToken, deviceId, dropboxUid) => {
    return {
      token: mixpanelToken,
      distinct_id: dropboxUid || deviceId,
      device_id: deviceId
    }
  }
]

exports.photosToUpload = ['photos', 'toUpload']

exports.photosCurrentlyUploading = ['photos', 'currentlyUploading']

exports.dropboxAccessToken = ['user', 'dropboxAccessToken']
