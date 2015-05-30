var React = require('react-native')
var { actions } = require('./flux.js')
var config = require('../config.js')
var MainNavigator = require('MainNavigator.js')
var dropbox = require('./modules/dropbox')
var React = require('react-native')

console.log('arse')


module.exports = React.createClass({
  displayName: 'SiteCamera',
  componentDidMount () {
    (async function () {
      let access_token = await dropbox.oauth(config.app_key, config.redirect_url)
      actions.setConfig('dropbox_access_token', access_token)
      actions.getSites()
    })()
  },

  render () {
    return (
      <MainNavigator />
    )
  }
})
