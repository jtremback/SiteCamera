import { actions } from './flux.js'
import config from '../config.js'
import MainNavigator from 'MainNavigator.js'
import dropbox from './modules/dropbox'

export default React.createClass({
  displayName: 'SiteCamera',
  componentDidMount () {
    (async function () {
      let access_token = await dropbox.oauth(config.app_key, config.redirect_url)
      actions.setConfig('dropbox_access_token', access_token)
      actions.getSites()
    })()
  },

  render () {
    return (
      <MainNavigator />
    )
  }
})
