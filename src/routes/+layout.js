// src/routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment'

import '$lib/i18n' // Import to initialize. Important
import { locale, waitLocale } from 'svelte-i18n'

export const load = async () => {
	//TODO: Need to add posthog project api key
	if (browser) {
		// posthog.init(
		//   '<ph_project_api_key>',
		//   { api_host: 'https://app.posthog.com' }
		// )
		const lang = localStorage.getItem('lang') || 'en'
		locale.set(lang)
	}
	await waitLocale()

	return
}
