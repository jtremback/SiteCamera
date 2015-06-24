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
    paddingTop: 80,
  }
})

module.exports = React.createClass({
  displayName: 'SettingsScreen',
  render () {
    return (
      <View style={styles.container}>
        <Text>Wait for wifi connection to upload photos</Text>
        <SwitchIOS />
      </View>
    )
  }
})
