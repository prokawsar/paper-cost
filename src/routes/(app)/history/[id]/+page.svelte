<script lang="ts">
	import Input from '$lib/elements/Input.svelte'
	import Result from '$lib/elements/Result.svelte'
	import dayjs from 'dayjs'
	import { calculateCost, type CostHistoryType } from '$lib/utils/services'
	import Icon from '@iconify/svelte'

	export let data

	let history: CostHistoryType | null = data.history
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-3 px-4 pt-3">
	<h1 class="text-xl text-center">Cost Details</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	{#if history}
		<div class="flex flex-row justify-between px-1 gap-2 items-center">
			<div class="flex flex-row gap-1 justify-between flex-grow">
				<p class="truncate max-w-44">{history.name || ''}</p>
				<!-- <button class="border rounded p-[2px]">
					<Icon icon="ic:outline-edit" />
				</button> -->
			</div>
			<h1 class="text-sm text-center flex text-gray-500">
				{dayjs(history.created_at).format('DD-MM-YYYY hh:mmA')}
			</h1>
		</div>

		<div class="flex flex-col w-full justify-between gap-3 h-[85%] items-center">
			<div class="flex flex-col overflow-y-auto w-full max-w-3xl py-2">
				{#if history.papers.length}
					{#each history.papers as { length, width, thickness, rate, id }}
						<div class="w-full">
							<div
								class="flex flex-row w-full gap-1 items-center justify-between overflow-y-auto p-[2px]"
							>
								<Input bind:value={length} disabled />
								<Input bind:value={width} disabled />
								<Input bind:value={thickness} disabled />
								<Input bind:value={rate} disabled />
								<div class="flex justify-center">
									<p class="font-semibold">
										= {calculateCost({ length, width, thickness, rate, id }).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					{/each}

					<div class="font-bold text-lg mt-2 flex w-full">
						{#if history.final_price}
							<Result total={history.final_price} />
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<p class="text-center text-gray-500">No cost history details</p>
	{/if}
</section>
