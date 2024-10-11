<script lang="ts">
	import '$lib/app.css'
	import BrandTitle from '$lib/elements/BrandTitle.svelte'
	import '@fontsource/jost'
</script>

<main class="h-[100svh] flex flex-col">
	<nav>
		<div class="flex justify-center py-2">
			<BrandTitle />
		</div>
		<div
			class="w-full max-w-6xl mx-auto bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]"
		/>
	</nav>
	<slot />

	<div class="absolute bottom-0 w-full">
		<p class="text-center text-gray-400">
			&#x1F4BB;Developed by <a href="https://github.com/prokawsar" target="_blank">Sheba Queue</a>
		</p>
	</div>
</main>
