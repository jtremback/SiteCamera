var flux = require('../flux.js')
var getters = require('../getters.js')
var actions = require('../actions.js')
var React = require('react-native')
var { NavigatorIOS, PropTypes } = React
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
        tookPhoto={actions.tookPhoto}
      />
    )
  }
})



const SiteListScreenContainer = React.createClass({
  displayName: 'SiteListScreenContainer',
  propTypes: {
    navigator: PropTypes.function,
  },
  mixins: [flux.ReactMixin],

  getDataBindings () {
    return {
      sites: getters.sites,
      photosToUpload: getters.photosToUpload,
      photosCurrentlyUploading: getters.photosCurrentlyUploading
    }
  },

  rowPressed (row) {
    actions.selectSite(row.name)
    this.props.navigator.push({
      title: row.name,
      component: CameraScreenContainer,
    });
  },

  render () {
    return (
      <SiteListScreen
        rowPressed={this.rowPressed}
        listData={this.state.sites}
        uploadPhotosPressed={actions.uploadPhotos}
        photosToUpload={this.state.photosToUpload}
        photosCurrentlyUploading={this.state.photosCurrentlyUploading}
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
          component: SiteListScreenContainer,
          backButtonTitle: '',
        }}
      />
    )
  }
})
