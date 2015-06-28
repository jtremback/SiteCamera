const React = require('react-native')
const actions = require('./actions.js')
const MainNavigator = require('./components/MainNavigator.js')
const { StatusBarIOS } = React

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
    actions.initApp().catch(console.error)
    StatusBarIOS.setStyle('light-content', true)
  },
  render () {
    return (
      <MainNavigator />
    )
  }
})

