const flux = require('../flux.js')
const getters = require('../getters.js')
const actions = require('../actions.js')
const React = require('react-native')
const config = require('../../config.js')
const {
  NavigatorIOS,
  PropTypes,
  Text,
  WebView,
} = React

const CameraScreen = require('./CameraScreen.js')
const LocationListScreen = require('./LocationListScreen.js')
const SettingsScreen = require('./SettingsScreen.js')
const AddLocationScreen = require('./AddLocationScreen.js')
const DropboxOauthSignInScreen = require('./DropboxOauthSignInScreen.js')

const colors = require('../styles/colors.js')

const styles = React.StyleSheet.create({
  container: {
    flex: 1,
  }
})



const DropboxOauthSignInScreenContainer = React.createClass({
  displayName: 'DropboxOauthSignInScreenContainer',

  onCredentials (accessToken) {
    actions.onCredentials(accessToken)
    this.props.navigator.pop()
  },

  render () {
    return (
      <DropboxOauthSignInScreen
        appKey={config.app_key}
        redirectUrl={config.redirect_url}
        onCredentials={this.onCredentials}
      />
    )
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



const LocationListScreenContainer = React.createClass({
  displayName: 'LocationListScreenContainer',
  propTypes: {
    navigator: PropTypes.object,
    getNavigator: PropTypes.func
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
    })
  },

  signIn () {
    this.props.navigator.push({
      title: 'Sign In',
      component: DropboxOauthSignInScreenContainer,
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
        signIn={this.signIn}
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
      dropboxAccessToken: getters.dropboxAccessToken
    }
  },

  signIn () {
    this.props.navigator.push({
      title: 'Sign In',
      component: DropboxOauthSignInScreenContainer,
    });
  },

  render () {
    return (
      <SettingsScreen
        signOut={actions.signOut}
        signIn={this.signIn}
        dropboxAccessToken={this.state.dropboxAccessToken}
      />
    )
  }
})



module.exports = React.createClass({
  displayName: 'MainNavigator',
  mixins: [flux.ReactMixin],

  getDataBindings () {
    return {
      dropboxAccessToken: getters.dropboxAccessToken
    }
  },

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
          leftButtonTitle: 'Settings',
          onLeftButtonPress: this.onLeftButtonPress,
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
