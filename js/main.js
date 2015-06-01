var React = require('react-native')
var { actions } = require('./flux.js')
var config = require('../config.js')
var MainNavigator = require('./components/MainNavigator.js')
var dropbox = require('./modules/dropbox')
var React = require('react-native')

console.log('arse')


module.exports = React.createClass({
  displayName: 'SiteCamera',
  componentDidMount () {
    dropbox.oauth(config.app_key, config.redirect_url).then((access_token) => {
      actions.setConfig('dropbox_access_token', access_token)
      actions.getSites()
    })
  },

  render () {
    return (
      <MainNavigator />
    )
  }
})
