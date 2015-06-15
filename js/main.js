var React = require('react-native')
var actions = require('./actions.js')
var MainNavigator = require('./components/MainNavigator.js')
var React = require('react-native')

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
    actions.dropboxOauth()
  },
  render () {
    return (
      <MainNavigator />
    )
  }
})
