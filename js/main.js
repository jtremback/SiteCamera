var React = require('react-native')
var actions = require('./actions.js')
var MainNavigator = require('./components/MainNavigator.js')
var React = require('react-native')
const { StatusBarIOS } = React
require('regenerator/runtime');

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
    actions.dropboxOauth()
    StatusBarIOS.setStyle('light-content', true)
  },
  render () {
    return (
      <MainNavigator />
    )
  }
})
