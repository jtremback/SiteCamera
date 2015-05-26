import Nuclear from 'nuclear-js'
import * as actions from './actions.js'
import * as getters from './getters.js'

import sites from './stores/sites.js'
import ui from './stores/ui.js'


let flux = new Nuclear.Reactor({
  debug: true
})

flux.registerStores({
  sites,
  ui
})

flux.actions = actions
flux.getters = getters

export default flux
