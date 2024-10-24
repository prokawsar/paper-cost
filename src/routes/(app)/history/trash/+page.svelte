<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import HistoryRow from '$lib/elements/HistoryRow.svelte'
	import InPageLoader from '$lib/elements/InPageLoader.svelte'
	import { deleteHistory, emptyTrashData, restoreHistory } from '$lib/utils/services.js'
	import { sortedByCreatedAt } from '$lib/utils/tools.js'
	import Icon from '@iconify/svelte'
	import mixpanel from '$lib/utils/mixpanel'
	import { toast } from 'svelte-sonner'

	let { data } = $props()

	let isLoading = $state(false)

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

	const handleEmptyTrash = async () => {
		isLoading = true
		await emptyTrashData()
		await invalidateAll()
		isLoading = false
		toast.success('Great! Your trash is empty')
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
	<div
		class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]"
	></div>
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div
			class="relative flex flex-col h-full gap-2 justify-between overflow-y-auto w-full max-w-3xl py-2 z-0"
		>
			{#if !isLoading}
				{#if data.histories.length}
					<div class="flex flex-col gap-2 overflow-y-auto">
						{#each sortedByCreatedAt(data.histories) as cost}
							<HistoryRow
								isTrash
								{cost}
								onrestore={(id) => handleRestore(id)}
								ondelete={(id) => handleDelete(id)}
							/>
						{/each}
					</div>
				{:else}
					<p class="text-center text-gray-500">Trash is empty</p>
				{/if}

				<button
					disabled={!data.histories.length}
					onclick={handleEmptyTrash}
					class="py-1 text-red-500 flex items-center justify-center gap-1 w-full text-center border rounded disabled:text-opacity-70 disabled:cursor-not-allowed"
				>
					<Icon icon="ph:trash-light" width="16px" />
					Empty Trash</button
				>
			{:else}
				<InPageLoader />
			{/if}
		</div>
	</div>
</section>
