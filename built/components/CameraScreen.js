'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _reactNativeCamera = require('react-native-camera');

var _reactNativeCamera2 = _interopRequireDefault(_reactNativeCamera);

var brand_color = '#FCCC32';
var black = '#222222';

var styles = _reactNative.StyleSheet.create({
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

exports['default'] = _reactNative2['default'].createClass({
  displayName: 'CameraScreen',
  propTypes: {
    tookPicture: _reactNative.PropTypes['function'],
    cameraType: _reactNative.PropTypes.string },

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

    return _reactNative2['default'].createElement(
      _reactNative.View,
      { style: styles.container },
      _reactNative2['default'].createElement(_reactNative.View, { style: styles.statusBar }),
      _reactNative2['default'].createElement(
        _reactNativeCamera2['default'],
        {
          ref: 'cam',
          style: styles.camera,
          captureTarget: 'disk',
          type: this.props.cameraType
        },
        _reactNative2['default'].createElement(
          _reactNative.View,
          { style: styles.cameraButtonContainer },
          _reactNative2['default'].createElement(
            _reactNative.TouchableHighlight,
            { style: styles.cameraButton,
              onPress: this.takePicture },
            _reactNative2['default'].createElement(_reactNative.Image, {
              source: require('image!camera_icon'),
              style: styles.cameraIcon,
              resizeMode: 'contain' })
          ),
          _reactNative2['default'].createElement(
            _reactNative.View,
            { style: styles.picCounter },
            _reactNative2['default'].createElement(
              _reactNative.Text,
              { style: styles.picCounterText },
              jankyMinWidth(10)
            )
          )
        )
      )
    );
  } });
module.exports = exports['default'];