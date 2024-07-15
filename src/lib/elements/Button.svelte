<script lang="ts">
	import { onMount } from 'svelte'

	export let disabled = false
	export let text = ''
	export let classNames = ''
	export let type: 'button' | 'submit' | 'reset' = 'button'

	let buttonRef: HTMLButtonElement

	onMount(() => {
		if (buttonRef) {
			buttonRef.type = type
		}
	})
</script>

<button
	bind:this={buttonRef}
	{disabled}
	{type}
	class="border border-gray-400 rounded-md text-teal-600 font-semibold px-3 py-1 w-fit disabled:text-opacity-60 {classNames}"
	on:click
>
	{text}
</button>
