<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import HistoryRow from '$lib/elements/HistoryRow.svelte'
	import Loader from '$lib/elements/Loader.svelte'
	import { deleteHistory, restoreHistory } from '$lib/utils/services.js'
	import { sortedByCreatedAt } from '$lib/utils/tools.js'
	import mixpanel from 'mixpanel-browser'
	import { toast } from 'svelte-sonner'

	export let data
	let isLoading = false

	mixpanel.track_pageview({
		url: '/history/trash'
	})

	const handleDelete = async (id: string) => {
		isLoading = true
		await deleteHistory(id)
		await invalidateAll()
		isLoading = false
		toast.success('History deleted successfully')
	}

	const handleRestore = async (id: string) => {
		isLoading = true
		await restoreHistory(id)
		await invalidateAll()
		isLoading = false
		toast.success('History restored successfully')
	}
</script>

<svelte:head>
	<title>History</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full h-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<div class="flex gap-2 items-center justify-center w-full">
		<h1 class="text-xl text-center">History Trash</h1>
		<p class="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7">
			{data.histories.length}
		</p>
	</div>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[80%] items-center">
		<div class="relative flex flex-col h-full gap-2 overflow-y-auto w-full max-w-3xl py-2 z-0">
			{#if !isLoading}
				{#if data.histories.length}
					{#each sortedByCreatedAt(data.histories) as cost}
						<HistoryRow
							isTrash
							{cost}
							on:restore={(e) => handleRestore(e.detail)}
							on:delete={(e) => handleDelete(e.detail)}
						/>
					{/each}
				{:else}
					<p class="text-center text-gray-500">Trash is empty</p>
				{/if}
			{:else}
				<div class="fixed flex h-[70%] w-[90%] items-center justify-center">
					<Loader />
				</div>
			{/if}
		</div>
	</div>
</section>
