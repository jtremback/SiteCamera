const React = require('react-native')
const flux = require('./flux.js')
const actions = require('./actions.js')
const getters = require('./getters.js')
const MainNavigator = require('./components/MainNavigator.js')
const { StatusBarIOS } = React

flux.initPersistence(['photos', 'toUpload']).catch(console.error)
flux.initPersistence(['config', 'deviceId']).then(() => {
  if (!flux.evaluate(getters.deviceId)) {
    flux.dispatch('set device id', Number(String(Math.random()).slice(2)))
  }

  actions.mpEvents('startup')
}).catch(console.error)

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
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
