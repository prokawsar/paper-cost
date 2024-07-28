<script lang="ts">
	import Icon from '@iconify/svelte'

	export let show = false
</script>

<div class="absolute bg-black bg-opacity-20 flex h-full w-full items-center justify-center z-10">
	<div class="bg-white p-2 rounded relative flex flex-col w-3/4">
		<button
			class="absolute top-0 right-0 p-[3px] rounded-full w-fit"
			on:click|stopPropagation|preventDefault={() => (show = false)}
		>
			<Icon icon="majesticons:multiply" width="20px" />
		</button>
		<slot />
	</div>
</div>
