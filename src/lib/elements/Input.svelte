<script lang="ts">
	import { focusedInputStore } from '$lib/stores'
	import { makeid } from '$lib/utils/tools'

	type InputType = {
		id: string
		value: string
		name: string
		type: string
		disabled: boolean
		classNames: string
		onkeydown: () => void
		onfocus: () => void
	}

	let {
		id = makeid(3),
		value = $bindable(),
		name,
		classNames,
		disabled = false,
		type = 'number',
		onkeydown,
		onfocus,
		...rest
	}: InputType = $props()

	let inputRef: HTMLInputElement

	$effect(() => {
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
	{onkeydown}
	onfocus={() => {
		;($focusedInputStore = inputRef), onfocus()
	}}
	{...rest}
/>

<style lang="postcss">
	.input-field {
		@apply border border-gray-300 w-12 md:w-full p-1 rounded;
	}
</style>
