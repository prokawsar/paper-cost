<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { paperHistoryStore } from '$lib/stores'
	import { deleteHistory } from '$lib/utils/services.js'
	import Icon from '@iconify/svelte'
	import days from 'dayjs'

	export let data

	$paperHistoryStore = data.histories

	const handleDelete = async (id: string) => {
		await deleteHistory(id)
		await invalidateAll()
	}
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<div class="flex gap-2 items-center justify-center w-full">
		<h1 class="text-xl text-center">History</h1>
		<p class="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
			{data.histories.length}
		</p>
	</div>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div class="flex flex-col gap-2 overflow-y-auto w-full max-w-3xl py-2">
			{#if data.histories.length}
				{#each data.histories.reverse() as { name, id, final_price, papers, created_at }, i}
					<div
						class="flex flex-col gap-1 items-center w-full p-1 border border-dashed rounded shadow-sm"
					>
						<a href="/history/{id}" class="flex flex-row items-center pl-1 justify-between w-full">
							<p class:hidden={!name} class="w-fit">
								{name}
							</p>
							<p class="w-fit text-gray-500">
								{days(created_at).format('DD-MM-YYYY hh:mmA')}
							</p>
							<p class="text-gray-500">
								{final_price.toFixed(2)}
							</p>
							<button
								class="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
								on:click|stopPropagation|preventDefault={() => handleDelete(id)}
							>
								<Icon icon="ph:trash-light" width="16px" />
							</button>
						</a>
					</div>
				{/each}
			{:else}
				<p class="text-center text-gray-500">No history yet</p>
			{/if}
		</div>
	</div>
</section>
