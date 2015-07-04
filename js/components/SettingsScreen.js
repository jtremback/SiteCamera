const React = require('react-native')
const colors = require('../styles/colors.js')
const {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  SwitchIOS,
  ActivityIndicatorIOS,
  PropTypes,
} = React

const Button = require('react-native-button')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 17,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 13,
    color: '#888'
  },
  button: {
    borderColor: colors.button,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 4,
    fontSize: 14,
    borderRadius: 4,
    marginLeft: 10
  }
})

module.exports = React.createClass({
  displayName: 'SettingsScreen',
  render () {
    return (
      <View style={styles.container}>
        { this.props.dropboxAccessToken ?
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Signed in as:
                </Text>
                <Text style={styles.subtitle}>
                  jehan.tremback@gmail.com
                </Text>
              </View>
              <Button
                onPress={this.props.signOut}
                style={styles.button}
              >
                SIGN OUT
              </Button>
            </View>
            <View style={styles.separator}/>
          </View>
        :
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  Signed out.
                </Text>
                <Text style={styles.subtitle}>
                  Sign in with Dropbox to save your photos.
                </Text>
              </View>
              <Button
                onPress={this.props.signIn}
                style={styles.button}
              >
                SIGN IN
              </Button>
            </View>
            <View style={styles.separator}/>
          </View>
        }
      </View>
    )
  }
})
