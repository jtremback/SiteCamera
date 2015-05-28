'use strict';

var React = require('react-native');
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TouchableHighlight = React.TouchableHighlight;
var Image = React.Image;
var PropTypes = React.PropTypes;

var Camera = require('react-native-camera');

var brand_color = '#FCCC32';
var black = '#222222';

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    backgroundColor: black,
    height: 22
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  bottomBar: {
    justifyContent: 'center',
    backgroundColor: black,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8
  },
  bottomBarText: {
    color: brand_color,
    textAlign: 'center',
    fontSize: 16
  },

  cameraButtonContainer: {
    marginBottom: 20
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand_color,
    borderRadius: 20,
    width: 75,
    height: 75
  },
  cameraIcon: {
    width: 50,
    height: 40
  },
  picCounter: {
    backgroundColor: black,
    borderRadius: 5,
    borderColor: brand_color,
    borderWidth: 2,
    position: 'absolute',
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 2,
    paddingBottom: 2,
    bottom: -5,
    right: -5 },
  picCounterText: {
    color: brand_color,
    fontSize: 16,
    fontWeight: 'bold' }
});

module.exports = React.createClass({
  displayName: 'CameraScreen',
  propTypes: {
    tookPicture: PropTypes['function'],
    cameraType: PropTypes.string },

  getDefaultProps: function getDefaultProps() {
    return {
      cameraType: 'front'
    };
  },

  takePicture: function takePicture() {
    this.refs.cam.capture(this.props.tookPicture);
  },

  render: function render() {
    function jankyMinWidth(input) {
      input = input + '';
      if (input.length === 1) {
        return ' ' + input + ' ';
      } else {
        return input;
      }
    }

    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(View, { style: styles.statusBar }),
      React.createElement(
        Camera,
        {
          ref: 'cam',
          style: styles.camera,
          captureTarget: 'disk',
          type: this.props.cameraType
        },
        React.createElement(
          View,
          { style: styles.cameraButtonContainer },
          React.createElement(
            TouchableHighlight,
            { style: styles.cameraButton,
              onPress: this.takePicture },
            React.createElement(Image, {
              source: require('image!camera_icon'),
              style: styles.cameraIcon,
              resizeMode: 'contain' })
          ),
          React.createElement(
            View,
            { style: styles.picCounter },
            React.createElement(
              Text,
              { style: styles.picCounterText },
              jankyMinWidth(10)
            )
          )
        )
      )
    );
  } });