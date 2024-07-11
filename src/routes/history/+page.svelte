<script lang="ts">
	import { paperHistoryStore } from '$lib/stores'
	import days from 'dayjs'
	import Icon from '@iconify/svelte'
</script>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<div class="flex gap-2 items-center justify-center w-full">
		<h1 class="text-xl text-center">History</h1>
		<p class="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
			{$paperHistoryStore.history.length}
		</p>
	</div>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div class="flex flex-col gap-2 overflow-y-auto w-full max-w-3xl py-2">
			{#if $paperHistoryStore.history.length}
				{#each $paperHistoryStore.history.reverse() as { id, finalPrice, papers, date }, i}
					<div
						class="flex flex-col gap-1 items-center w-full p-2 border border-dashed rounded shadow-sm"
					>
						<a href="/history/{id}" class="flex flex-row items-center pl-1 justify-between w-full">
							<p class="w-fit">
								{days(date).format('DD-MM-YYYY hh:mmA')}
							</p>
							<p class="text-gray-500">
								{finalPrice.toFixed(2)}
							</p>
						</a>
					</div>
				{/each}
			{:else}
				<p class="text-center text-gray-500">No history yet</p>
			{/if}
		</div>
	</div>
</section>
