<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import HistoryRow from '$lib/elements/HistoryRow.svelte'
	import InPageLoader from '$lib/elements/InPageLoader.svelte'
	import { softDeleteHistory } from '$lib/utils/services.js'
	import { sortedByCreatedAt } from '$lib/utils/tools.js'
	import Icon from '@iconify/svelte'
	import mixpanel from 'mixpanel-browser'
	import { toast } from 'svelte-sonner'

	export let data
	let isLoading = false

	mixpanel.track_pageview({
		url: '/history'
	})

	const handleDelete = async (id: string) => {
		isLoading = true
		await softDeleteHistory(id)
		await invalidateAll()
		isLoading = false
		toast.message('History moved to trash!')
	}
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 pt-5">
	<div class="flex gap-2 items-center justify-center w-full">
		<h1 class="text-xl text-center">History</h1>
		<p class="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
			{data.histories.length}
		</p>
	</div>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div class="relative flex flex-col justify-between h-full gap-3 w-full max-w-3xl py-2 z-0">
			{#if !isLoading}
				{#if data.histories.length}
					<div class="flex flex-col gap-2 overflow-y-auto">
						{#each sortedByCreatedAt(data.histories) as cost}
							<HistoryRow {cost} on:delete={(e) => handleDelete(e.detail)} />
						{/each}
					</div>
				{:else}
					<p class="text-center text-gray-500">No history yet</p>
				{/if}

				<a
					href="/history/trash"
					class="py-1 flex items-center justify-center gap-1 w-full text-center border rounded text-gray-600"
				>
					<Icon icon="ph:trash-light" width="16px" />
					History Trash</a
				>
			{:else}
				<InPageLoader />
			{/if}
		</div>
	</div>
</section>
