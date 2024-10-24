<script lang="ts">
	import { slide } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import mixpanel from '$lib/utils/mixpanel'

	type FooterProp = { showSettings: boolean; showAbout: boolean; loading: boolean }

	let {
		showSettings = $bindable(),
		showAbout = $bindable(),
		loading = $bindable()
	}: FooterProp = $props()

	const navItems = [
		{ href: '/', label: 'Home', icon: 'clarity:home-line' },
		{ href: '/history', label: 'Cost History', icon: 'ph:read-cv-logo-light', preload: true }
	]

	function toggleSettings() {
		showSettings = !showSettings
	}
</script>

<footer
	class="relative max-w-6xl mx-auto w-full px-5 bg-slate-50 border-t border-teal-500 rounded-t-lg"
>
	<nav class="flex flex-row h-11 items-center justify-between">
		{#each navItems as { href, label, icon, preload }}
			<a
				{href}
				class="flex flex-row items-center gap-1"
				class:text-orange-500={$page.url.pathname === href}
				data-sveltekit-preload-data={preload ? 'tap' : null}
			>
				<Icon {icon} />
				{label}
			</a>
		{/each}
		<button onclick={toggleSettings} class="flex flex-row gap-1 items-center">
			<Icon icon="solar:settings-linear" /> Settings
		</button>
	</nav>

	{#if showSettings}
		<div
			transition:slide={{ axis: 'y', duration: 200 }}
			class="absolute w-20 right-3 bottom-11 flex flex-col items-start divide-y divide-orange-400 gap-1 bg-slate-50 p-2 rounded"
		>
			<button
				onclick={() => {
					showAbout = true
					toggleSettings()
				}}>About</button
			>
			<form
				method="post"
				action="/?/logout"
				use:enhance={() => {
					loading = true
					return async ({ update }) => {
						await update()
						loading = false
						mixpanel.reset()
						mixpanel.track('logout')
					}
				}}
			>
				<button type="submit">Logout</button>
			</form>
		</div>
	{/if}
</footer>
