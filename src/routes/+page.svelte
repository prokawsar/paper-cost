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
	let perPaperResult: Map<string, number> = new Map()
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
		perPaperResult.clear()
		finalPrice = 0

		paperCount.forEach((paper) => {
			const paperSize =
				parseFloat(paper.height) * parseFloat(paper.width) * parseFloat(paper.thickness)
			const result = paperSize / PAPER_FIXED
			const totalPerPaper = result * parseFloat(paper.rate)

			perPaperResult.set(paper.id, totalPerPaper)
			finalPrice += totalPerPaper
		})
		perPaperResult = perPaperResult
	}

	const clearAll = () => {
		paperCount = []
		finalPrice = 0
	}

	const fields = Object.keys(paperFields).filter((key) => key !== 'id')

	$: hasNullValue =
		paperCount &&
		paperCount.find((paper) => {
			return !paper.height || !paper.width || !paper.thickness || !paper.rate
		})
	$: paperCount.length == 0 ? clearAll() : ''
</script>

<svelte:head>
	<title>Paper calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-2xl text-center">Paper Cost</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-5 h-[90%] items-center">
		<div class="flex flex-col gap-4 overflow-y-auto max-h-[85%]">
			{#each paperCount as paper, i}
				<div class="flex flex-col gap-1 items-center p-1">
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
					<div class="grid grid-cols-5 w-full gap-1 items-center overflow-x-auto p-1">
						{#each fields as field}
							<Input bind:value={paper[field]} placeholder={field} />
						{/each}
						<div class="flex justify-center">
							<p
								class="w-10 text-end {perPaperResult.get(paper.id)
									? 'font-semibold'
									: 'font-light text-gray-400'}"
							>
								{perPaperResult.get(paper.id)?.toFixed(2) || 'total'}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Button and result section -->
		<div class="flex flex-col justify-center max-w-3xl w-full gap-4">
			<!-- result section -->
			<div class="font-bold text-lg flex w-full">
				{#if finalPrice}
					<Result total={finalPrice} />
				{/if}
			</div>
			<!-- button section -->
			<div
				class:justify-between={paperCount.length}
				class="flex flex-row justify-center w-full mt-3"
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
						disabled={!!hasNullValue}
						class="border font-semibold border-gray-200 rounded-md px-3 py-1 text-teal-600 w-fit disabled:cursor-not-allowed disabled:text-opacity-60"
						on:click={calculatePaperCost}
					>
						Calculate
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>
