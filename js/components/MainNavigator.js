var flux = require('../flux.js')
var getters = require('../getters.js')
var actions = require('../actions.js')
var React = require('react-native')
var { NavigatorIOS } = React
var CameraScreen = require('./CameraScreen.js')
var SiteListScreen = require('./SiteListScreen.js')

var colors = require('../styles/colors.js')

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
  mixins: [flux.ReactMixin],
  getDataBindings () {
    return {
      sites: getters.sites
    }
  },

  rowPressed (e) {
    actions.selectSite(e.path)
    this.props.navigator.push({
      title: e.path,
      component: CameraScreenContainer
    });
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
        rowPressed={this.rowPressed}
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
        barTintColor={colors.black}
        titleTextColor={colors.brand}
        style={styles.container}
        initialRoute={{
          title: 'Job Sites',
          component: SiteListScreenContainer
        }}
      />
    )
  }
})
