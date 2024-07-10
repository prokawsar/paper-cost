<script lang="ts">
	import Input from '$lib/elements/Input.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { MAX_PAPER, PAPER_FIXED, type Paper } from '$lib/utils/services'
	import { makeid } from '$lib/utils/tools'
	import Icon from '@iconify/svelte'

	const paperFields = {
		id: '',
		height: '',
		width: '',
		thickness: '',
		rate: ''
	}

	let paperCount: Paper[] = []
	let finalPrice: number = 0

	const addPaper = () => {
		paperCount.push({ ...paperFields, id: makeid(5) })
		paperCount = paperCount
	}

	const removePaper = (idx: string) => {
		paperCount = paperCount.filter((field) => field.id != idx)
	}

	const calculatePaperCost = () => {
		if (!paperCount.length) return

		finalPrice = 0

		paperCount.forEach((paper) => {
			const paperSize =
				parseFloat(paper.height) * parseFloat(paper.width) * parseFloat(paper.thickness)
			const result = paperSize / PAPER_FIXED
			finalPrice += result * parseFloat(paper.rate)
		})
	}

	const clearAll = () => {
		paperCount = []
		finalPrice = 0
	}

	const fields = Object.keys(paperFields).filter((key) => key !== 'id')
</script>

<svelte:head>
	<title>Paper calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full flex-col gap-4 p-5">
	<h1 class="text-2xl text-center">Paper Cost</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full gap-4 items-center">
		{#each paperCount as paper, i}
			<div class="flex flex-col gap-1 items-center">
				<div class="flex flex-row justify-between w-full">
					<p class="font-bold w-fit">
						Paper {i + 1}
					</p>

					<button
						class="border border-gray-200 rounded-md p-2 text-red-400 w-fit"
						on:click={() => removePaper(paper.id)}
					>
						<Icon icon="ph:trash-light" width="16px" />
					</button>
				</div>
				<div class="grid grid-cols-4 w-full gap-1">
					{#each fields as field}
						<Input bind:value={paper[field]} placeholder={field} />
					{/each}
				</div>
			</div>
		{/each}
		<!-- Calculate result section -->
		<div class="font-bold text-lg flex w-full">
			{#if finalPrice}
				<Result total={finalPrice} />
			{/if}
		</div>

		<!-- Button section -->
		<div
			class:justify-between={paperCount.length}
			class="flex flex-row justify-center w-full max-w-3xl"
		>
			<button
				disabled={paperCount.length == MAX_PAPER}
				class="border border-slate-300 rounded-md text-sm px-3 py-1 w-fit disabled:text-slate-400"
				on:click={addPaper}
			>
				Add paper
			</button>
			{#if finalPrice}
				<button
					class="border border-red-200 rounded-md px-3 py-1 text-red-400 w-fit"
					on:click={clearAll}
				>
					Clear
				</button>
			{/if}
			{#if paperCount.length}
				<button
					class="border font-semibold border-gray-200 rounded-md px-3 py-1 text-teal-600 w-fit"
					on:click={calculatePaperCost}
				>
					Calculate
				</button>
			{/if}
		</div>
	</div>
</section>
