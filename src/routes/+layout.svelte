<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_MIX_TOKEN } from '$env/static/public'
	import '$lib/app.css'
	import '@fontsource/jost'

	//Import Mixpanel SDK
	import mixpanel from 'mixpanel-browser'
	mixpanel.init(PUBLIC_MIX_TOKEN, {
		debug: false,
		track_pageview: true,
		persistence: 'localStorage'
	})
</script>

<main class="h-[100svh] flex flex-col">
	<nav>
		<div class="flex justify-center py-2">
			<p class="text-center text-2xl text-red-600 font-semibold">Molla Printing & Packaging</p>
		</div>
		<div
			class="w-full max-w-6xl mx-auto bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]"
		/>
		<!-- <div class="px-4 flex w-full mt-2">
			<div
				class="flex w-full flex-row gap-3 bg-slate-100 py-1 px-2 rounded border-dashed border border-orange-400"
			>
				<a href="/" class:hidden={$page.url.pathname == '/'} class="h-full">Back</a>
				<a href="/history" class:hidden={$page.url.pathname == '/history'} class="h-full">History</a
				>
			</div>
		</div> -->
	</nav>
	<slot />

	<div class="absolute bottom-0 w-full">
		<p class="text-center text-gray-400">
			&#x1F4BB;Developed by <a href="https://github.com/prokawsar" target="_blank">ProKawsar</a
			>&#x1F60E;
		</p>
	</div>
</main>
