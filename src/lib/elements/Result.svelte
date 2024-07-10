<script lang="ts">
	export let total: number = 0

	let _40Percentage = (total * 40) / 100
</script>

<div class="flex flex-col gap-1 w-full">
	<div class="flex flex-row justify-between">
		<p class="text-teal-600">Total:</p>
		<p>
			{total.toFixed(2)}
		</p>
	</div>
	<div class="flex flex-row justify-between">
		<p class="text-teal-600">Total with (40%):</p>
		<p>
			{(total + _40Percentage).toFixed(2)}
		</p>
	</div>
</div>
