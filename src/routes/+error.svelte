<script>
	import '$lib/app.css'
	import '@fontsource/jost'

	import BrandTitle from '$lib/elements/BrandTitle.svelte'
</script>

<div class="flex flex-col max-w-6xl mx-auto w-full">
	<nav class="max-w-6xl mx-auto w-full">
		<div class="flex justify-center py-2">
			<BrandTitle />
		</div>
		<div class="bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]" />
	</nav>
	<p class="text-center text-3xl py-10 text-red-600">Something went error</p>
	<a href="/" class="text-center text-xl pt-5">Back to home</a>
</div>
