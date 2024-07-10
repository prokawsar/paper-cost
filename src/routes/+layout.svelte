<script lang="ts">
	import '$lib/app.css'
	import '@fontsource/jost'
</script>

<main class="h-[100svh] flex flex-col">
	<nav>
		<div class="flex justify-center py-2">
			<p class="text-center text-3xl font-semibold">Molla Printing & Packaging</p>
		</div>
		<div
			class="w-full max-w-6xl mx-auto bg-gradient-to-r from-transparent via-orange-800/40 to-transparent p-[1px]"
		/>
	</nav>
	<slot />

	<div class="absolute bottom-0 w-full">
		<p class="text-center text-gray-400">
			&#x1F4BB;Developed by <a href="https://github.com/prokawsar" target="_blank">Kawsar</a
			>&#x1F60E;
		</p>
	</div>
</main>
