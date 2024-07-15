<script lang="ts">
	import { focusedInputStore } from '$lib/stores'
	import { makeid } from '$lib/utils/tools'
	import { onMount } from 'svelte'

	export let id: string = makeid(3)
	export let value: string
	export let type: string = 'number'
	export let placeholder: string = ''
	export let disabled: boolean = false
	export let classNames: string = ''

	let inputRef: HTMLInputElement

	onMount(() => {
		if (inputRef) {
			inputRef.type = type
		}
	})
</script>

<input
	bind:this={inputRef}
	{id}
	{disabled}
	class="input-field focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none {classNames}"
	{placeholder}
	bind:value
	on:keydown
	on:focus
	on:focus={() => ($focusedInputStore = inputRef)}
/>

<style lang="postcss">
	.input-field {
		@apply border border-gray-400 w-12 p-1 rounded;
	}
</style>
