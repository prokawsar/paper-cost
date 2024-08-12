<script lang="ts">
	import Icon from '@iconify/svelte'
	import Input from './Input.svelte'
	import { receive, send } from '$lib/utils/tools'
	import { fields, placeholders } from '$lib/utils/constants'
	import { createEventDispatcher } from 'svelte'
	import type { Paper } from '$lib/utils/services'

	export let paper: Paper
	export let index: number
	export let totalPaper: number
	export let perPaperResult: Map<string, number>

	const dispatch = createEventDispatcher()
</script>

<div
	id={paper.id}
	class="flex flex-row items-center justify-between rounded"
	in:receive={{ key: paper.id, duration: 250 }}
	out:send={{ key: paper.id, duration: 250 }}
>
	<div class="flex flex-row gap-[3px] items-center overflow-x-auto">
		<button
			disabled={totalPaper == 1 && index == 0}
			class="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
			on:click={() => dispatch('remove')}
		>
			<Icon icon="ph:trash-light" width="16px" />
		</button>
		{#each fields as field}
			<Input bind:value={paper[field]} placeholder={placeholders[field]} on:keydown />
		{/each}
	</div>
	<div class="flex flex-grow justify-center px-1">
		<p
			class="{perPaperResult.get(paper.id) ? 'font-semibold' : 'font-light text-gray-400'} pr-[2px]"
		>
			= {perPaperResult.get(paper.id)?.toFixed(2) || 'total'}
		</p>
	</div>
</div>
