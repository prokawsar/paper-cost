<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { focusedInputStore, paperHistoryStore } from '$lib/stores'
	import { MAX_PAPER, PAPER_FIXED, type Paper } from '$lib/utils/services'
	import { makeid } from '$lib/utils/tools'
	import Icon from '@iconify/svelte'
	import mixpanel from 'mixpanel-browser'
	import { onMount, tick } from 'svelte'

	const paperFields = {
		id: '',
		length: '',
		width: '',
		thickness: '',
		rate: ''
	}
	const placeholders: { [key: string]: string } = {
		length: 'L',
		width: 'W',
		thickness: 'GSM',
		rate: 'R'
	}
	const fields = Object.keys(paperFields).filter((key) => key !== 'id')

	let paperCount: Paper[] = [{ ...paperFields, id: makeid(5) }]
	let perPaperResult: Map<string, number> = new Map()
	let finalPrice: number = 0
	let inputs: NodeListOf<HTMLInputElement>
	let inputGroupRef: HTMLDivElement
	let focusedIndex = 0

	const addPaper = async () => {
		paperCount.push({ ...paperFields, id: makeid(5) })
		paperCount = paperCount
		await tick()
		inputs = inputGroupRef.querySelectorAll('input')
	}

	const removePaper = (idx: string) => {
		paperCount = paperCount.filter((field) => field.id != idx)
	}

	const calculatePaperCost = () => {
		if (!paperCount.length || hasNullValue) return
		perPaperResult.clear()
		finalPrice = 0
		paperCount.forEach((paper) => {
			const paperSize =
				parseFloat(paper.length) * parseFloat(paper.width) * parseFloat(paper.thickness)
			const result = paperSize / PAPER_FIXED
			const totalPerPaper = result * parseFloat(paper.rate)

			perPaperResult.set(paper.id, totalPerPaper)
			finalPrice += totalPerPaper
		})
		perPaperResult = perPaperResult

		// Saving to history
		$paperHistoryStore.history.push({
			id: makeid(6),
			finalPrice,
			date: new Date(),
			papers: paperCount
		})

		// mixpanel data prepare
		const perPageData: number[] = []
		perPaperResult.forEach((data) => {
			perPageData.push(data)
		})

		mixpanel.track('Calculated Paper Price', {
			perPaperResult: perPageData,
			finalPrice
		})
	}

	const clearAll = () => {
		paperCount = [{ ...paperFields, id: makeid(5) }]
		finalPrice = 0
		perPaperResult.clear()
	}

	$: hasNullValue =
		paperCount &&
		paperCount.find((paper) => {
			return !paper.length || !paper.width || !paper.thickness || !paper.rate
		})
	$: paperCount.length == 0 ? clearAll() : ''

	// Handling and maintaining focused input index
	$: inputsArray = inputs && Array.from(inputs)
	$: focusedInputID = $focusedInputStore && $focusedInputStore.getAttribute('id')
	$: if (focusedInputID && inputsArray && inputsArray.length) {
		focusedIndex = inputsArray
			.map((input) => input.getAttribute('id'))
			.findIndex((id) => focusedInputID == id)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			focusedIndex++
			event.preventDefault()
			const nextInput = inputs[focusedIndex]
			if (nextInput) {
				$focusedInputStore = nextInput
				$focusedInputStore.focus()
			}
		}
	}

	onMount(() => {
		inputs = inputGroupRef.querySelectorAll('input')
		if (inputs.length) {
			$focusedInputStore = inputs[0]
			$focusedInputStore.focus()
		}
	})
</script>

<svelte:head>
	<title>Paper Cost Calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center text-teal-500 font-semibold">Paper Cost</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div
			class="flex flex-col gap-[1px] overflow-y-auto max-w-3xl max-h-[85%] py-2 w-full"
			bind:this={inputGroupRef}
		>
			{#each paperCount as paper, i}
				<div class="flex flex-row items-center justify-between rounded">
					<div class="flex flex-row gap-[3px] items-center overflow-x-auto">
						<button
							disabled={paperCount.length == 1 && i == 0}
							class="border border-gray-400 rounded-md text-red-600 p-1 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
							on:click={() => removePaper(paper.id)}
						>
							<Icon icon="ph:trash-light" width="16px" />
						</button>
						{#each fields as field}
							<Input
								bind:value={paper[field]}
								placeholder={placeholders[field]}
								on:keydown={(event) => handleKeyDown(event)}
							/>
						{/each}
					</div>
					<div class="flex justify-start">
						<p
							class="{perPaperResult.get(paper.id)
								? 'font-semibold'
								: 'font-light text-gray-400'} pr-[2px]"
						>
							= {perPaperResult.get(paper.id)?.toFixed(2) || 'total'}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Button and result section -->
		<div class="flex flex-col justify-center max-w-3xl w-full gap-4">
			<!-- button section -->
			<div
				class:justify-between={paperCount.length}
				class="flex flex-row justify-center w-full mt-3"
			>
				<Button
					classNames="text-sm"
					on:click={addPaper}
					disabled={paperCount.length == MAX_PAPER}
					text="Add paper"
				/>
				{#if finalPrice}
					<button
						class="border border-red-200 rounded-md px-3 py-1 text-red-400 w-fit"
						on:click={clearAll}
					>
						Clear
					</button>
				{/if}
				{#if paperCount.length}
					<Button on:click={calculatePaperCost} disabled={!!hasNullValue} text="Calculate" />
				{/if}
			</div>
			<!-- result section -->
			<div class="font-bold text-lg flex w-full">
				{#if finalPrice}
					<Result total={finalPrice} />
				{/if}
			</div>
		</div>
	</div>
</section>
