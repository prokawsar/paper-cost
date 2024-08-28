<script lang="ts">
	import { focusedInputStore } from '$lib/stores'
	import { makeid } from '$lib/utils/tools'
	import { onMount } from 'svelte'

	export let id: string = makeid(3)
	export let value: string
	export let name: string = ''
	export let type: string = 'number'
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
	data-testid={name}
	bind:this={inputRef}
	{id}
	{name}
	{disabled}
	class="input-field focus:!border-[1.5px] focus:!border-teal-500 focus:outline-none {classNames}"
	bind:value
	on:keydown
	on:focus
	on:focus={() => ($focusedInputStore = inputRef)}
	{...$$restProps}
/>

<style lang="postcss">
	.input-field {
		@apply border border-gray-400 w-12 md:w-full p-1 rounded;
	}
</style>
