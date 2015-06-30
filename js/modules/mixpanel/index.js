const base64 = require('../base64/index.js')

exports.people = function people (config, update) {
  if (!config.time && !config.$time) {
    config.time = Date.now()
  }

  const message = Object.keys(config).reduce((acc, key) => {
    if (key === 'token' ||
        key === 'distinct_id' ||
        key === 'time')
    {
      acc['$' + key] = config[key]
    } else {
      acc[key] = config[key]
    }

    return acc
  }, {})

  return transmit('https://api.mixpanel.com/engage/', Object.assign(message, update))
}

exports.events = function events (config, event, properties) {
  if (!config.time) {
    config.time = Date.now()
  }

  let message = {
    event: event,
    properties: Object.assign({}, config, properties)
  }

  return transmit('https://api.mixpanel.com/track/', message)
}

exports.transmit = transmit
function transmit (baseUrl, message) {
  console.log('mixpanel', baseUrl, message)
  const promise = fetch(`${baseUrl}?data=${base64.encode(JSON.stringify(message))}&verbose=1`).then((res) => {
    return res.text()
  })
  return promise
}
