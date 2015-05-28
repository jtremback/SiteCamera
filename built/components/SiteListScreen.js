'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var styles = _reactNative.StyleSheet.create({
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

exports['default'] = _reactNative2['default'].createClass({
  displayName: 'SiteListScreen',
  propTypes: {
    rowPressed: _reactNative.PropTypes['function'],
    listData: _reactNative.PropTypes.array
  },

  getInitialState: function getInitialState() {
    return {
      dataSource: new _reactNative.ListView.DataSource({
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

    return _reactNative2['default'].createElement(
      _reactNative.TouchableHighlight,
      {
        onPress: function () {
          return _this.props.rowPressed(row);
        },
        underlayColor: '#dddddd'
      },
      _reactNative2['default'].createElement(
        _reactNative.View,
        null,
        _reactNative2['default'].createElement(
          _reactNative.View,
          { style: styles.rowContainer },
          _reactNative2['default'].createElement(
            _reactNative.View,
            { style: styles.textContainer },
            _reactNative2['default'].createElement(
              _reactNative.Text,
              { style: styles.title,
                numberOfLines: 1 },
              row.title
            )
          )
        ),
        _reactNative2['default'].createElement(_reactNative.View, { style: styles.separator })
      )
    );
  },

  render: function render() {
    return _reactNative2['default'].createElement(_reactNative.ListView, {
      dataSource: this.state.dataSource,
      renderRow: this.renderRow });
  }
});
module.exports = exports['default'];