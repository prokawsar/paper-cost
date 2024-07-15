<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Loader from '$lib/elements/Loader.svelte'
	import { paperHistoryStore } from '$lib/stores'
	import { deleteHistory } from '$lib/utils/services.js'
	import Icon from '@iconify/svelte'
	import days from 'dayjs'

	export let data
	let isLoading = false
	let deleteConfirm = false

	$paperHistoryStore = data.histories

	const handleDelete = async (id: string) => {
		isLoading = true
		await deleteHistory(id)
		await invalidateAll()
		isLoading = false
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
		<div class="relative flex flex-col h-full gap-2 overflow-y-auto w-full max-w-3xl py-2">
			{#if !isLoading}
				{#if data.histories.length}
					{#each data.histories.reverse() as { name, id, final_price, papers, created_at }, i}
						<div
							class="flex flex-col gap-1 items-center w-full p-1 border border-dashed rounded shadow-sm"
						>
							<a
								href="/history/{id}"
								class="flex flex-row items-center pl-1 justify-between w-full"
							>
								<p class:hidden={!name} class="w-fit truncate">
									{name}
								</p>
								<p class="w-fit text-sm text-gray-500 truncate">
									{days(created_at).format('DD-MM-YYYY hh:mmA')}
								</p>
								<p class="text-gray-500 text-sm truncate">
									{final_price.toFixed(2)}
								</p>
								<div class="flex flex-row items-center gap-[2px]">
									<button
										class:hidden={deleteConfirm}
										class="border border-red-300 rounded-md text-red-600 p-[3px] w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
										on:click|stopPropagation|preventDefault={() => (deleteConfirm = true)}
									>
										<Icon icon="ph:trash-light" width="16px" />
									</button>
									{#if deleteConfirm}
										<button
											class="border border-yellow-300 p-[3px] rounded-md text-yellow-600 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
											on:click|stopPropagation|preventDefault={() => (deleteConfirm = false)}
										>
											<Icon icon="majesticons:multiply" width="16px" />
										</button>
										<button
											class="border border-green-300 p-[3px] rounded-md text-green-700 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
											on:click|stopPropagation|preventDefault={() => handleDelete(id)}
										>
											<Icon icon="teenyicons:tick-solid" width="15px" />
										</button>
									{/if}
								</div>
							</a>
						</div>
					{/each}
				{:else}
					<p class="text-center text-gray-500">No history yet</p>
				{/if}
			{:else}
				<div class="fixed flex h-[70%] w-[90%] items-center justify-center">
					<Loader />
				</div>
			{/if}
		</div>
	</div>
</section>
