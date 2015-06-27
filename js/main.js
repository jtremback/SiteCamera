const React = require('react-native')
const flux = require('./flux.js')
const actions = require('./actions.js')
const getters = require('./getters.js')
const MainNavigator = require('./components/MainNavigator.js')
const React = require('react-native')
const { StatusBarIOS } = React
const uuid = require('node-uuid')

flux.initPersistence(['photos', 'toUpload'])
flux.initPersistence(['config', 'deviceId']).then(() => {
  if (!flux.evaluate(getters.deviceId)) {
    flux.dispatch('set device id', uuid.v4())
  }
})

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
    actions.mpEvents()
    actions.dropboxOauth().then(async () => {
      actions.getSites()
      const profile = await actions.getProfile()
      actions.mpPeople({ $set: {
        $name: profile.display_name,
        dropboxProfile: profile
      }})
      actions.mpEvents('$create_alias', {
        alias: profile.uid
      })
    })
    StatusBarIOS.setStyle('light-content', true)
  },
  render () {
    return (
      <MainNavigator />
    )
  }
})
