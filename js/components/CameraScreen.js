const React = require('react-native')
const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  PropTypes,
  NativeModules
} = React

const Camera = require('react-native-camera')
const { Accelerometer } = NativeModules

var colors = require('../styles/colors.js')
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    backgroundColor: colors.black,
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
    backgroundColor: colors.black,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8
  },
  bottomBarText: {
    color: colors.brand,
    textAlign: 'center',
    fontSize: 16
  },

  cameraButtonContainer: {
    marginBottom: 20
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    borderRadius: 20,
    width: 75,
    height: 75,
  },
  cameraButtonInner: {
    width: 65,
    borderRadius: 15,
    height: 65,
    backgroundColor: colors.black,
  },
  cameraIcon: {
    width: 50,
    height: 40
  },
  picCounter: {
    backgroundColor: colors.black,
    borderRadius: 5,
    borderColor: colors.brand,
    borderWidth: 2,
    position: 'absolute',
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 2,
    paddingBottom: 2,
    bottom: -5,
    right: -5,
  },
  picCounterText: {
    color: colors.brand,
    fontSize: 16,
    fontWeight: 'bold',
  }
})

module.exports = React.createClass({
  displayName: 'CameraScreen',
  propTypes: {
    tookPhoto: PropTypes.func,
    cameraType: PropTypes.string,
  },

  getDefaultProps () {
    return {
      cameraType: 'back'
    }
  },

  componentDidMount () {
    Accelerometer.startAccelerometerUpdates()
  },

  componentWillUnmount () {
    Accelerometer.stopAccelerometerUpdates()
  },

  takePicture () {
    const capture = (location, rotation) => {
      this.refs.cam.capture({
        metadata: { location },
        rotation: rotation
      }, (err, path) => {
        console.log(err)
        if (!err) {
          this.props.tookPhoto(path)
        }
      })
    }

    Accelerometer.getAccelerometerData((err, data) => {
      const angle = Math.atan2(data.y, -data.x)
      let rotation
      if (angle >= -2.25 && angle <= -0.75) {
        rotation = 270
      }
      else if (angle >= -0.75 && angle <= 0.75) {
        rotation = 0
      }
      else if (angle >= 0.75 && angle <= 2.25) {
        rotation = 90
      }
      else if (angle <= -2.25 || angle >= 2.25) {
        rotation = 180
      }

      navigator.geolocation.getCurrentPosition(
        location => {
          capture(location, rotation)
        },
        () => {
          capture(null)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    })

  },

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Camera
          ref='cam'
          style={styles.camera}
          captureTarget='disk'
          type={this.props.cameraType}
        >
          <View style={styles.cameraButtonContainer}>
            <TouchableHighlight style={styles.cameraButton}
            onPress={this.takePicture}>
              <View style={styles.cameraButtonInner}/>
            </TouchableHighlight>
          </View>
        </Camera>
      </View>
    )
  },
})
