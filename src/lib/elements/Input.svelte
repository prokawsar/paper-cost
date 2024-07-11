<script lang="ts">
	export let value: string
	export let placeholder: string = ''
	export let disabled: boolean = false
</script>

<input
	{disabled}
	class="input-field focus:outline-dashed focus:outline-gray-600"
	type="number"
	{placeholder}
	bind:value
/>

<style lang="postcss">
	.input-field {
		@apply border border-dashed border-gray-200 p-1 rounded w-full outline-offset-1;
	}
</style>
