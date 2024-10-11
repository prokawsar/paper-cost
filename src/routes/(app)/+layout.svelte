<script lang="ts">
	import '$lib/app.css'
	import '@fontsource/jost'
	import { navigating } from '$app/stores'
	import Loader from '$lib/elements/Loader.svelte'
	import mixpanel from '$lib/utils/mixpanel'
	import { Toaster } from 'svelte-sonner'
	import Modal from '$lib/elements/Modal.svelte'
	import BrandTitle from '$lib/elements/BrandTitle.svelte'
	import About from '$lib/elements/About.svelte'
	import FullPageLoader from '$lib/elements/FullPageLoader.svelte'
	import Footer from '$lib/elements/Footer.svelte'

	export let data

	let showSettings = false
	let showAbout = false
	let loading = false

	mixpanel.identify(data.user?.id)
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
		duration={3000}
		richColors
		position="bottom-center"
		toastOptions={{
			class: 'py-2 mb-8'
		}}
	/>

	<!-- Footer menu section -->
	<Footer bind:showAbout bind:showSettings bind:loading />
</main>
