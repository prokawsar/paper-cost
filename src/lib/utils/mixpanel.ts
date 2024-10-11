import { browser, dev } from '$app/environment'
import mixpanel from 'mixpanel-browser'

mixpanel.init('4f9140ba92bf9817723887501ce35853', {
	track_pageview: true,
	persistence: 'localStorage'
})
if (dev) mixpanel.disable()

export default mixpanel
