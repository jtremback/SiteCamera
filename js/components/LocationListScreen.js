const React = require('react-native')
const colors = require('../styles/colors.js')
const {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicatorIOS,
  PropTypes,
} = React
const Button = require('react-native-button')

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    padding: 20
  },
  title: {
    fontSize: 17
  },

  message: {
    padding: 10,
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 70,
  },

  notice: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  innerNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.softBlack,
    paddingRight: 20,
    paddingLeft: 20
  },
  noticeText: {
    color: colors.brand,
    paddingRight: 20
  },

  ActivityIndicatorIOS: {
    width: 20,
  }
})

module.exports = React.createClass({
  displayName: 'LocationListScreen',
  propTypes: {

    // An array of rows
    listData: PropTypes.object,

    // rowPressed is passed the row that was pressed
    rowPressed: PropTypes.func,

    // a number of photos that still need to be uploaded
    photosToUpload: PropTypes.number,

    // what happens when you press the photosToUpload popup
    uploadPhotosPressed: PropTypes.func,

    // Are there currently photos being uploaded?
    photosCurrentlyUploading: PropTypes.bool
  },

  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (old, next) => old !== next
      })
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState(state => {
      return { dataSource: state.dataSource.cloneWithRows(nextProps.listData.toJS()) }
    })
  },

  renderRow (row) {
    return (
      <TouchableHighlight
        onPress={() => this.props.rowPressed(row)}
        underlayColor='#dddddd'
      >
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{row.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  },

  render () {
    const photosToUpload = this.props.photosToUpload && this.props.photosToUpload.size > 0
    const photosCurrentlyUploading = this.props.photosCurrentlyUploading && this.props.photosCurrentlyUploading.size > 0
    return (
      <View style={styles.container}>
        { this.props.listData.size > 0 ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        :
          <Text style={styles.message}>Press + to create create a new location.</Text>
        }
        { photosToUpload ?
          <View style={styles.notice}>
            { photosCurrentlyUploading ?
              <View style={styles.innerNotice}>
                <Text style={styles.noticeText}>
                  {this.props.photosToUpload.size} photo{ this.props.photosToUpload.size > 1 ? 's' : '' } to upload.
                </Text>
                <ActivityIndicatorIOS
                  style={styles.ActivityIndicatorIOS}
                  size='small'
                  color={colors.brand}
                />
              </View>
            :
              <View style={styles.innerNotice}>
                <Text style={styles.noticeText}>
                  {this.props.photosToUpload.size} photo{ this.props.photosToUpload.size > 1 ? 's' : '' } did not upload.
                </Text>
                <Button onPress={this.props.uploadPhotosPressed}>
                  Retry
                </Button>
              </View>
            }
          </View>
        :
          null
        }
        <Button onPress={this.props.signIn}>
          Sign In
        </Button>
        <Text style={styles.message}>To access your saved locations.</Text>
      </View>
    )
  }
})
