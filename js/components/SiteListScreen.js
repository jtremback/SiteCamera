var React = require('react-native')
var {
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text,
  PropTypes,
} = React

const styles = StyleSheet.create({
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
  }
})

module.exports = React.createClass({
  displayName: 'SiteListScreen',
  propTypes: {

    // An array of rows
    listData: PropTypes.array,

    // rowPressed is passed the row that was pressed
    rowPressed: PropTypes.function,

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
                numberOfLines={1}>{row.path}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  },

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
    )
  }
})
