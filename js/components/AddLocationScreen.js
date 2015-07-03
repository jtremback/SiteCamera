const React = require('react-native')
const colors = require('../styles/colors.js')
const {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ActivityIndicatorIOS,
  PropTypes,
} = React

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 84
  },
  input: {
    height: 52,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: colors.gray,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: colors.brand,
    alignSelf: 'center'
  },
  button: {
    height: 52,
    backgroundColor: colors.softBlack,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

module.exports = React.createClass({
  displayName: 'AddLocationScreen',
  propTypes: {
    addLocation: PropTypes.func
  },
  addLocationPressed () {
    this.props.addLocation(this.state.input)
  },
  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Location name'}
          autoCorrect={false}
          onChangeText={(text) => this.setState({ input: text })}
        />
        <TouchableHighlight style={styles.button}
          onPress={this.addLocationPressed}
          underlayColor={colors.brand}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
})
