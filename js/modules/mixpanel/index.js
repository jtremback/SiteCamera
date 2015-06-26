let Base64 = require('./base64.js').Base64

exports.people = function (config, update) {
  if (!config.time && !config.$time) {
    config.time = Date.now()
  }

  const message = Object.keys(config).reduce((acc, key) => {
    if (key === 'token' ||
        key === 'distinct_id' ||
        key === 'time') {
      key = '$' + key
    }
    acc[key] = config[key]
  }, {})

  return transmit('https://api.mixpanel.com/engage/', Object.assign(message, update))
}

exports.events = function (config, event, properties) {
  if (!config.time) {
    config.time = Date.now()
  }

  let message = {
    event: event,
    properties: Object.assign(config, properties)
  }

  return transmit('https://api.mixpanel.com/track/', message)
}

function transmit (baseUrl, message) {
  return fetch(`${baseUrl}?data=${Base64.encode(message)}`)
}
