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

  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
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

  notice: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  innerNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.setAlpha(colors.black, 0.85),
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
  displayName: 'SiteListScreen',
  propTypes: {

    // An array of rows
    listData: PropTypes.object,

    // rowPressed is passed the row that was pressed
    rowPressed: PropTypes.function,

    // a number of photos that still need to be uploaded
    photosToUpload: PropTypes.number,

    // what happens when you press the photosToUpload popup
    uploadPhotosPressed: PropTypes.function,

    // Are there currently photos being uploaded?
    photosCurrentlyUploading: PropTypes.boolean
  },

  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (old, next) => old.path !== next.path
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />

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
      </View>
    )
  }
})
