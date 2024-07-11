<script lang="ts">
	import { page } from '$app/stores'
	import Input from '$lib/elements/Input.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { paperHistoryStore, type PaperHistory } from '$lib/stores'
	import dayjs from 'dayjs'

	const data: PaperHistory[] = $paperHistoryStore.history.filter(
		(history) => history.id == $page.params.id
	)
</script>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">History Details</h1>
	<h1 class="text-lg text-center text-gray-500">
		{dayjs(data[0].date).format('DD-MM-YYYY hh:mmA')}
	</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div class="flex flex-col overflow-y-auto w-full max-w-3xl py-2">
			{#if data.length}
				{#each data as history, i}
					<div
						class="grid grid-cols-4 w-full gap-1 text-gray-500 text-center items-center overflow-x-auto p-1"
					>
						<p>height</p>
						<p>width</p>
						<p>thickness</p>
						<p>rate</p>
					</div>
					{#each history.papers as { height, width, thickness, rate }, i}
						<div class="flex flex-col gap-1 items-center w-full p-2 border border-dashed rounded">
							<div class="grid grid-cols-4 w-full gap-1 items-center overflow-x-auto p-1">
								<Input bind:value={height} disabled />
								<Input bind:value={width} disabled />
								<Input bind:value={thickness} disabled />
								<Input bind:value={rate} disabled />
								<!-- <div class="flex justify-start">
								<p>
									= {finalPrice.toFixed(2)}
								</p>
							</div> -->
							</div>
						</div>
					{/each}

					<div class="font-bold text-lg mt-2 flex w-full">
						{#if history.finalPrice}
							<Result total={history.finalPrice} />
						{/if}
					</div>
				{/each}
			{:else}
				<p class="text-center text-gray-500">No history details</p>
			{/if}
		</div>
	</div>
</section>
