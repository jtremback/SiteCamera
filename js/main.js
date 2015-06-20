var React = require('react-native')
var actions = require('./actions.js')
var MainNavigator = require('./components/MainNavigator.js')
var React = require('react-native')
const { StatusBarIOS } = React

// async function showAppleStockPriceAsync() {
//   let url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=AAPL';
//   let response = await fetch(url);
//   let body = await response.json();
//   let { AlertIOS } = require('react-native');
//   AlertIOS.alert(body.Symbol, '$' + body.LastPrice);
// }
// showAppleStockPriceAsync();

module.exports = React.createClass({
  displayName: 'Frame',
  componentDidMount () {
    actions.dropboxOauth()
    StatusBarIOS.setStyle('light-content', true)
  },
  render () {
    return (
      <MainNavigator />
    )
  }
})
