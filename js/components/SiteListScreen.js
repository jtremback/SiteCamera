const React = require('react-native')
const colors = require('../styles/colors.js')
const {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text,
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
  },

  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (old, next) => old.guid !== next.guid
      })
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState(state => {
      return { dataSource: state.dataSource.cloneWithRows(nextProps.listData) }
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
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>

        <View style={styles.notice}>
          <View style={styles.innerNotice}>
            <Text style={styles.noticeText}>
              {this.props.photosToUpload}5 photos failed to upload.
            </Text>
            <Button>
              Retry
            </Button>
          </View>
        </View>
      </View>
    )
  }
})
