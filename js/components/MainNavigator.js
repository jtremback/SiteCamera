var flux = require('../flux.js')
var getters = require('../getters.js')
var actions = require('../actions.js')
var React = require('react-native')
var { NavigatorIOS, PropTypes, Text } = React
var CameraScreen = require('./CameraScreen.js')
var SiteListScreen = require('./SiteListScreen.js')
var SettingsScreen = require('./SettingsScreen.js')
var AddSiteScreen = require('./AddSiteScreen.js')

var colors = require('../styles/colors.js')

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
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
    navigator: PropTypes.object,
    getNavigator: PropTypes.function
  },
  mixins: [flux.ReactMixin],

  componentWillMount () {
    this.props.getNavigator(this.props.navigator)
  },

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



const AddSiteScreenContainer = React.createClass({
  displayName: 'AddSiteScreenContainer',
  propTypes: {
    navigator: PropTypes.object,
  },
  // mixins: [flux.ReactMixin],
  // getDataBindings () {
  //   return {
  //     sites: getters.sites,
  //     photosToUpload: getters.photosToUpload,
  //     photosCurrentlyUploading: getters.photosCurrentlyUploading
  //   }
  // },

  addSite (path) {
    actions.addSite(path)
    this.props.navigator.pop()
  },

  render () {
    return (
      <AddSiteScreen
        addSite={this.addSite}
      />
    )
  }
})



const SettingsScreenContainer = React.createClass({
  displayName: 'SettingsScreenContainer',
  propTypes: {
    navigator: PropTypes.object,
  },
  mixins: [flux.ReactMixin],
  getDataBindings () {
    return {
      sites: getters.sites,
      photosToUpload: getters.photosToUpload,
      photosCurrentlyUploading: getters.photosCurrentlyUploading
    }
  },

  render () {
    return <SettingsScreen />
  }
})



module.exports = React.createClass({
  displayName: 'MainNavigator',

  getNavigator (navigator) {
    this.navigator = navigator
  },

  onLeftButtonPress () {
    this.navigator.push({
      title: 'Settings',
      component: SettingsScreenContainer,
    })
  },

  onRightButtonPress () {
    this.navigator.push({
      title: 'Add Site',
      component: AddSiteScreenContainer,
    })
  },

  render () {
    return (
      <NavigatorIOS
        barTintColor={colors.black}
        titleTextColor={colors.brand}
        style={styles.container}
        initialRoute={{
          title: 'Job Sites',
          component: SiteListScreenContainer,
          // leftButtonTitle: 'Settings',
          // onLeftButtonPress: this.onLeftButtonPress,
          rightButtonIcon: require('image!NavBarButtonPlus'),
          onRightButtonPress: this.onRightButtonPress,
          passProps: {
            getNavigator: this.getNavigator
          }
        }}
      />
    )
  }
})
