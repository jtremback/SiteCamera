'use strict';

var React = require('react-native');
var StyleSheet = React.StyleSheet;
var View = React.View;
var TouchableHighlight = React.TouchableHighlight;
var ListView = React.ListView;
var Text = React.Text;
var PropTypes = React.PropTypes;

var styles = StyleSheet.create({
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
});

module.exports = React.createClass({
  displayName: 'SiteListScreen',
  propTypes: {
    rowPressed: PropTypes['function'],
    listData: PropTypes.array
  },

  getInitialState: function getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function rowHasChanged(old, next) {
          return old.guid !== next.guid;
        }
      })
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(function (state) {
      return { dataSource: state.dataSource.cloneWithRows(nextProps.listData) };
    });
  },

  renderRow: function renderRow(row) {
    var _this = this;

    return React.createElement(
      TouchableHighlight,
      {
        onPress: function () {
          return _this.props.rowPressed(row);
        },
        underlayColor: '#dddddd'
      },
      React.createElement(
        View,
        null,
        React.createElement(
          View,
          { style: styles.rowContainer },
          React.createElement(
            View,
            { style: styles.textContainer },
            React.createElement(
              Text,
              { style: styles.title,
                numberOfLines: 1 },
              row.title
            )
          )
        ),
        React.createElement(View, { style: styles.separator })
      )
    );
  },

  render: function render() {
    return React.createElement(ListView, {
      dataSource: this.state.dataSource,
      renderRow: this.renderRow });
  }
});