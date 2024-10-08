<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_MIX_TOKEN } from '$env/static/public'
	import '$lib/app.css'
	import '@fontsource/jost'
	import { navigating } from '$app/stores'
	import Loader from '$lib/elements/Loader.svelte'
	import mixpanel from 'mixpanel-browser'
	import { slide } from 'svelte/transition'
	import { Toaster } from 'svelte-sonner'
	import Icon from '@iconify/svelte'
	import Modal from '$lib/elements/Modal.svelte'
	import BrandTitle from '$lib/elements/BrandTitle.svelte'
	import About from '$lib/elements/About.svelte'
	import { enhance } from '$app/forms'
	import FullPageLoader from '$lib/elements/FullPageLoader.svelte'

	export let data

	//Import Mixpanel SDK
	mixpanel.init(PUBLIC_MIX_TOKEN, {
		debug: false,
		track_pageview: true,
		persistence: 'localStorage'
	})

	if (PUBLIC_MIX_TOKEN == 'dev') mixpanel.disable()

	let showSettings = false
	let showAbout = false
	let loading = false

	const hideSettings = () => (showSettings = false)
</script>

<main class="h-[100svh] flex flex-col justify-between">
	{#if $navigating || loading}
		<FullPageLoader />
	{/if}
	{#if showAbout}
		<Modal bind:show={showAbout}>
			<About user={data.user} />
		</Modal>
	{/if}
	<div class="flex flex-col h-[92%]">
		<nav class="max-w-6xl mx-auto w-full">
			<div class="flex justify-center py-2">
				<BrandTitle />
			</div>
			<div class="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
		</nav>
		<slot />
	</div>

	<Toaster
		closeButton
		duration={2000}
		richColors
		toastOptions={{
			class: 'py-2 mb-8'
		}}
	/>

	<!-- Footer menu section -->
	<div
		class="relative max-w-6xl mx-auto w-full flex flex-row h-11 px-5 bg-slate-50 border-t border-teal-500 items-center justify-between rounded-t-lg"
	>
		<a
			href="/"
			class="flex flex-row items-center gap-1"
			class:text-orange-500={$page.url.pathname == '/'}
		>
			<Icon icon="clarity:home-line" /> Home
		</a>
		<a
			data-sveltekit-preload-data="tap"
			href="/history"
			class="flex flex-row items-center gap-1"
			class:text-orange-500={$page.url.pathname == '/history'}
		>
			<Icon icon="ph:read-cv-logo-light" /> Cost History
		</a>
		<button
			on:click={() => (showSettings = !showSettings)}
			class="flex flex-row gap-1 items-center"
		>
			<Icon icon="solar:settings-linear" /> Settings
		</button>
		{#if showSettings}
			<div
				transition:slide={{ axis: 'y', duration: 200 }}
				class="absolute w-20 right-3 bottom-11 flex flex-col items-start divide-y divide-orange-400 gap-1 bg-slate-50 p-2 rounded"
			>
				<button
					on:click={() => {
						hideSettings()
						showAbout = true
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
						}
					}}
				>
					<button
						type="submit"
						on:click={() => {
							hideSettings()
						}}>Logout</button
					>
				</form>
			</div>
		{/if}
	</div>
</main>
