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

	//Import Mixpanel SDK
	mixpanel.init(PUBLIC_MIX_TOKEN, {
		debug: false,
		track_pageview: true,
		persistence: 'localStorage'
	})

	let showSettings = false

	const handleLogout = async () => {
		await supabase.auth.signOut()
	}
</script>

<main class="h-[100svh] flex flex-col">
	{#if $navigating}
		<div
			class="absolute bg-white bg-opacity-80 flex h-full w-full items-center justify-center z-10"
		>
			<Loader />
		</div>
	{/if}
	<nav class="max-w-6xl mx-auto w-full">
		<div class="flex justify-center py-2">
			<p class="text-center text-2xl text-red-600 font-semibold">Molla Printing & Packaging</p>
		</div>
		<div class="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
		<div class="px-4 flex w-full mt-2">
			<div class="flex w-full flex-row justify-end gap-3 py-1 px-2 rounded border border-teal-400">
				<a href="/history" class:hidden={$page.url.pathname == '/history'} class="h-full">History</a
				>
				<a href="/" class:!block={$page.url.pathname == '/history'} class="hidden h-full">Home</a>
			</div>
		</div>
	</nav>
	<slot />

	<div class="absolute bottom-0 w-full flex">
		<p class="text-right md:text-center text-gray-400 w-3/4">
			&#x1F4BB;Developed by <a href="https://github.com/prokawsar" target="_blank">ProKawsar</a
			>&#x1F60E;
		</p>
		<!-- <button on:click={() => (showSettings = !showSettings)} class="w-1/4"> Settings </button> -->
		{#if showSettings}
			<div
				transition:slide={{ axis: 'y', duration: 200 }}
				class="absolute right-2 bottom-7 flex flex-col items-start divide-y divide-orange-400 gap-1 bg-slate-100 p-2 rounded"
			>
				<button on:click={() => handleLogout()}>Logout</button>
				<button>Change pin</button>
			</div>
		{/if}
	</div>
</main>
