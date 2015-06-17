const test = require('tape')
const Nuclear = require('nuclear-js')

const sites = require('../stores/sites.js')
const ui = require('../stores/ui.js')
const config = require('../stores/config.js')

let flux = new Nuclear.Reactor({
  debug: true
})

flux.registerStores({
  sites,
  // ui,
  config,
})

test('sites', function (t) {
  const orig_sites = {
    'Garden Shed': {
      path: 'Garden Shed',
      other: 'stuff'
    }
  }

  flux.dispatch('REPLACE_SITES', orig_sites)

  const sites = flux.evaluateToJS(['sites', 'sites'])

  t.equals(sites, orig_sites)
  t.end()
})
