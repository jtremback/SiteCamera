const React = require('react-native')
const colors = require('../styles/colors.js')
const dropbox = require('../modules/dropbox')
const {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  WebView,
  ActivityIndicatorIOS,
  PropTypes,
} = React

const qs = require('query-string')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.softBlack,
  },
  webView: {
    flex: 1,
  },
})


module.exports = React.createClass({
  displayName: 'SettingsScreen',
  propTypes: {
    appKey: PropTypes.string,
    redirectUrl: PropTypes.string,
    onCredentials: PropTypes.func,
  },
  getInitialState () {
    const secret = Math.random() + ''
    return {
      url: dropbox.generateOauthUrl(
        this.props.appKey,
        this.props.redirectUrl,
        secret
      ),
      secret: secret,
      show: true
    }
  },

  onNavigationStateChange (navState) {
    const match = navState.url.match(new RegExp(this.props.redirectUrl + '#(.*)'))
    if (match) {
      const [, query_string] = match
      const query = qs.parse(query_string)

      if (query.state === this.state.secret) {
        this.props.onCredentials(query.access_token, query.uid)
        this.setState({ show: false })
      }
    }
  },

  render () {
    return (
      <View style={styles.container}>
        { this.state.show ?
          <WebView
            style={styles.webView}
            url={this.state.url}
            startInLoadingState={true}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        :
          null
        }
      </View>
    )
  }
})
