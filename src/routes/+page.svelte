<script lang="ts">
	import { makeid } from '$lib/utils/tools'

	type Paper = {
		id: string
		height: string
		width: string
		thickness: string
		rate: string
	}

	const PAPER_FIXED = 1550000

	let paperCount: Paper[] = []
	let finalPrice: number = 0

	let paperFields = {
		id: '',
		height: '',
		width: '',
		thickness: '',
		rate: ''
	}

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
</script>

<svelte:head>
	<title>Paper calculator</title>
</svelte:head>

<section class="max-w-6xl my-10 mx-auto flex w-full flex-col gap-5 p-5">
	<h1 class="text-4xl font-bold text-center">Paper Cost</h1>
	<div class="flex flex-col w-full gap-4 items-center">
		{#each paperCount as field, i}
			<div class="flex flex-col gap-1 items-center">
				<div class="flex flex-row justify-between w-full">
					<p class="text-teal-600 font-bold w-fit">
						Paper {i + 1}
					</p>

					<button
						class="border border-gray-200 rounded-md px-3 py-1 text-red-400 w-fit"
						on:click={() => removePaper(field.id)}
					>
						Remove
					</button>
				</div>
				<div class="grid grid-cols-2 w-full gap-x-2 gap-y-2">
					<input class="input-field" type="number" placeholder="height" bind:value={field.height} />
					<input class="input-field" type="number" placeholder="width" bind:value={field.width} />
					<input
						class="input-field"
						type="number"
						placeholder="thickness"
						bind:value={field.thickness}
					/>
					<input class="input-field" type="number" placeholder="rate" bind:value={field.rate} />
				</div>
			</div>
		{/each}
		<div class="font-bold text-xl text-center">
			{#if finalPrice}
				{finalPrice}
			{/if}
		</div>
		<div class="flex flex-row justify-between w-full max-w-3xl">
			<button
				class="border border-slate-300 rounded-md text-sm px-3 py-1 w-fit"
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

<style lang="postcss">
	.input-field {
		@apply border border-gray-200 px-3 py-1 w-full;
	}
</style>
