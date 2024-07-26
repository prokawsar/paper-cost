<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_MIX_TOKEN } from '$env/static/public'
	import '$lib/app.css'
	import '@fontsource/jost'
	import { navigating } from '$app/stores'
	import Loader from '$lib/elements/Loader.svelte'
	import mixpanel from 'mixpanel-browser'
	import { slide } from 'svelte/transition'
	import { supabase } from '$lib/db/supabaseClient'
	import { Toaster } from 'svelte-sonner'
	import Icon from '@iconify/svelte'

	//Import Mixpanel SDK
	// mixpanel.init(PUBLIC_MIX_TOKEN, {
	// 	debug: false,
	// 	track_pageview: true,
	// 	persistence: 'localStorage'
	// })

	let showSettings = false

	const handleLogout = async () => {
		await supabase.auth.signOut()
	}
</script>

<main class="h-[100svh] flex flex-col justify-between">
	<Toaster
		richColors
		toastOptions={{
			class: 'py-2'
		}}
	/>
	{#if $navigating}
		<div
			class="absolute bg-white bg-opacity-80 flex h-full w-full items-center justify-center z-10"
		>
			<Loader />
		</div>
	{/if}
	<div class="flex flex-col h-[92%]">
		<nav class="max-w-6xl mx-auto w-full">
			<div class="flex justify-center py-2">
				<p class="text-center text-2xl text-red-600 font-semibold">Molla Printing & Packaging</p>
			</div>
			<div class="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
		</nav>
		<slot />
	</div>

	<div
		class="w-full flex flex-row h-11 px-3 bg-slate-50 border-t border-teal-500 items-center justify-between rounded-t-lg"
	>
		<!-- <p class="text-right md:text-center text-gray-400 w-3/4">
			&#x1F4BB;Developed by <a href="https://github.com/prokawsar" target="_blank">ProKawsar</a
			>&#x1F60E;
		</p> -->
		<a
			href="/"
			class="flex flex-row items-center gap-1"
			class:text-orange-500={$page.url.pathname == '/'}
		>
			<Icon icon="clarity:home-line" /> Home
		</a>
		<a
			href="/history"
			class="flex flex-row items-center gap-1"
			class:text-orange-500={$page.url.pathname == '/history'}
		>
			<Icon icon="ph:read-cv-logo-light" /> Cost History
		</a>
		<!-- <a href="/history"> Settings </a> -->
		<button
			on:click={() => (showSettings = !showSettings)}
			class="flex flex-row gap-1 items-center"
		>
			<Icon icon="solar:settings-linear" /> Settings
		</button>
	</div>
	{#if showSettings}
		<div
			transition:slide={{ axis: 'y', duration: 200 }}
			class="absolute w-16 right-2 bottom-10 flex flex-col items-start divide-y divide-orange-400 gap-1 bg-slate-50 p-2 rounded"
		>
			<!-- <button on:click={() => handleLogout()}>Logout</button> -->
			<button>About</button>
		</div>
	{/if}
</main>
