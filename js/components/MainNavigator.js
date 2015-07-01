var flux = require('../flux.js')
var getters = require('../getters.js')
var actions = require('../actions.js')
var React = require('react-native')
var {
  NavigatorIOS,
  PropTypes,
  Text,
  WebView,
} = React
var CameraScreen = require('./CameraScreen.js')
var LocationListScreen = require('./LocationListScreen.js')
var SettingsScreen = require('./SettingsScreen.js')
var AddLocationScreen = require('./AddLocationScreen.js')

var colors = require('../styles/colors.js')

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
  }
})



// const WebViewScreenContainer = React.createClass({
//   displayName: 'WebViewScreenContainer',
//   render () {
//     return (
//       <WebView
//         url={this.props.url}
//       />
//     )
//   }
// })



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



const LocationListScreenContainer = React.createClass({
  displayName: 'LocationListScreenContainer',
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
      locations: getters.locations,
      photosToUpload: getters.photosToUpload,
      photosCurrentlyUploading: getters.photosCurrentlyUploading
    }
  },

  rowPressed (row) {
    actions.selectLocation(row.name)
    this.props.navigator.push({
      title: row.name,
      component: CameraScreenContainer,
    });
  },

  render () {
    return (
      <LocationListScreen
        rowPressed={this.rowPressed}
        listData={this.state.locations}
        uploadPhotosPressed={actions.uploadPhotos}
        photosToUpload={this.state.photosToUpload}
        photosCurrentlyUploading={this.state.photosCurrentlyUploading}
      />
    )
  }
})



const AddLocationScreenContainer = React.createClass({
  displayName: 'AddLocationScreenContainer',
  propTypes: {
    navigator: PropTypes.object,
  },

  addLocation (name) {
    actions.addLocation(name)
    this.props.navigator.pop()
  },

  render () {
    return (
      <AddLocationScreen
        addLocation={this.addLocation}
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
      locations: getters.locations,
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
      title: 'Add Location',
      component: AddLocationScreenContainer,
    })
  },

  render () {
    return (
      <NavigatorIOS
        barTintColor={colors.black}
        titleTextColor={colors.brand}
        style={styles.container}
        initialRoute={{
          title: 'Locations',
          component: LocationListScreenContainer,
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
