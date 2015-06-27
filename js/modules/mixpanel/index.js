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

exports.transmit = transmit
function transmit (baseUrl, message) {
  const promise = fetch(`${baseUrl}?data=${btoa(JSON.stringify(message))}&verbose=1`).then((res) => {
    return res.text()
  })
  return promise
}
