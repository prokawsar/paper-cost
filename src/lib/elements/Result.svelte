<script lang="ts">
	import { get40Percent } from '$lib/utils/services'

	let { total = 0 }: { total: number } = $props()

	const _40Percent = $derived(get40Percent(total))
</script>

<div class="flex flex-col gap-1 w-full border shadow-md rounded py-1 px-2">
	<div class="flex flex-row justify-between">
		<p class="text-teal-600" data-testid="total-text">Total:</p>
		<p data-testid="total-value">
			{total.toFixed(2)}
		</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-teal-600" data-testid="total40-text">Total with (40%):</p>
		<p data-testid="total40-value">
			{(total + _40Percent).toFixed(2)}
		</p>
	</div>
</div>
