// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register, getLocaleFromNavigator, locale } from 'svelte-i18n'
import { get } from 'svelte/store'

const defaultLocale = 'en'

register('en', () => import('./languages/en.json'))
register('de', () => import('./languages/de.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: get(locale)
})

export const langSwitcher = () => {
	const l = get(locale)
	localStorage.setItem('lang', l || 'en')
}
