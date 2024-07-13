<script lang="ts">
	export let value: string
	export let placeholder: string = ''
	export let disabled: boolean = false
</script>

<input
	{disabled}
	class="input-field focus:!border-teal-500"
	type="number"
	{placeholder}
	bind:value
/>

<style lang="postcss">
	.input-field {
		@apply border border-gray-500 w-16 p-1 rounded;
	}
</style>
