let Base64 = require('./base64.js').Base64

exports.people = function (token, distinctId, update) {
  let message = {
    $token: token,
    $distinct_id: distinctId,
    $time: Date.now(),
  }

  return transmit('https://api.mixpanel.com/engage/', Object.assign(message, update))
}

exports.events = function (token, distinctId, event, properties) {
  let message = {
    event: event,
    properties: Object.assign({
      token: token,
      distinct_id: distinctId,
      time: Date.now()
    }, properties)
  }

  return transmit('https://api.mixpanel.com/track/', message)
}

function transmit (baseUrl, message) {
  return fetch(`${baseUrl}?data=${Base64.encode(message)}`)
}
