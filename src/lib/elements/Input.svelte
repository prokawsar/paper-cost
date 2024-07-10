<script lang="ts">
	export let value: string
	export let placeholder: string = ''
</script>

<input
	class="input-field focus:outline focus:outline-gray-600"
	type="number"
	{placeholder}
	bind:value
/>

<style lang="postcss">
	.input-field {
		@apply border border-dashed border-gray-200 px-3 py-1 rounded w-full outline-offset-1;
	}
</style>
