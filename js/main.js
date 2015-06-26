const React = require('react-native')
const flux = require('./flux.js')
const actions = require('./actions.js')
const getters = require('./getters.js')
const MainNavigator = require('./components/MainNavigator.js')
const React = require('react-native')
const { StatusBarIOS } = React
const uuid = require('node-uuid')

flux.initPersistence(['photos', 'toUpload'])
flux.initPersistence(['config', 'deviceId']).then(() => {
  if (!flux.evaluate(getters.deviceId)) {
    flux.dispatch('set device id', uuid.v4())
  }
})


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
