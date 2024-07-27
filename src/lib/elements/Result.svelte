<script lang="ts">
	import { get40Percent } from '$lib/utils/services'

	export let total: number = 0

	$: _40Percent = get40Percent(total)
</script>

<div class="flex flex-col gap-1 w-full border shadow-md rounded py-1 px-2">
	<div class="flex flex-row justify-between">
		<p class="text-teal-600">Total:</p>
		<p>
			{total.toFixed(2)}
		</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-teal-600">Total with (40%):</p>
		<p>
			{(total + _40Percent).toFixed(2)}
		</p>
	</div>
</div>
