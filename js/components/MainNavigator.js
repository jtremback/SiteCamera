var flux = require('../flux.js')
var { actions, getters, ReactMixin } = flux
var React = require('react-native')
var { NavigatorIOS } = React
var CameraScreen = require('./CameraScreen.js')
var SiteListScreen = require('./SiteListScreen.js')

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
})

const CameraScreenContainer = React.createClass({
  displayName: 'CameraScreenContainer',
  render () {
    return (
      <CameraScreen
        tookPicture={actions.tookPicture}
      />
    )
  }
})

const SiteListScreenContainer = React.createClass({
  displayName: 'SiteListScreenContainer',
  mixins: [ReactMixin],
  getDataBindings () {
    return {
      sites: getters.sites
    }
  },
  render () {
    function rowPushed (navigator, row) {
      actions.selectSite(row.path)
      navigator.push({
        title: row.path,
        component: CameraScreenContainer
      })
    }

    return (
      <SiteListScreen
        listData={this.state.sites}
        rowPushed={rowPushed}
      />
    )
  }
})

module.exports = React.createClass({
  displayName: 'MainNavigator',
  render () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Sites',
          component: SiteListScreenContainer
        }}
      />
    )
  }
})
