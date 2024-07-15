<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { focusedInputStore } from '$lib/stores'
	import { addHistory, calculateCost, MAX_PAPER, type Paper } from '$lib/utils/services'
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
	let inputs: NodeListOf<HTMLInputElement> | null
	let inputGroupRef: HTMLDivElement
	let focusedIndex = 0
	let customer_name = ''

	const addPaper = async () => {
		paperCount.push({ ...paperFields, id: makeid(5) })
		paperCount = paperCount
		getAllInputs()
	}

	const removePaper = async (idx: string) => {
		paperCount = paperCount.filter((field) => field.id != idx)
		getAllInputs()
	}

	const calculatePaperCost = () => {
		if (!paperCount.length || hasNullValue) return
		perPaperResult.clear()
		finalPrice = 0
		paperCount.forEach((paper) => {
			const totalPerPaper = calculateCost(paper)

			perPaperResult.set(paper.id, totalPerPaper)
			finalPrice += totalPerPaper
		})
		perPaperResult = perPaperResult

		// Saving to history
		addHistory({
			name: customer_name,
			final_price: finalPrice,
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
		focusedIndex = 0
		perPaperResult.clear()
		getAllInputs()
		setFocus()
	}

	const getAllInputs = async () => {
		await tick()
		inputs = inputGroupRef.querySelectorAll('input')
	}

	const setFocus = (element?: HTMLInputElement) => {
		if (inputs) {
			$focusedInputStore = element || inputs[0]
			$focusedInputStore.focus()
		}
	}

	$: hasNullValue =
		paperCount &&
		paperCount.find((paper) => {
			return !paper.length || !paper.width || !paper.thickness || !paper.rate
		})

	// Handling and maintaining focused input index
	$: inputsArray = inputs && Array.from(inputs)
	$: focusedInputID = $focusedInputStore && $focusedInputStore.getAttribute('id')
	$: if (focusedInputID && inputsArray && inputsArray.length) {
		focusedIndex = inputsArray
			.map((input) => input.getAttribute('id'))
			.findIndex((id) => focusedInputID == id)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && inputs) {
			focusedIndex++
			event.preventDefault()
			const nextInput = inputs[focusedIndex]
			if (nextInput) {
				setFocus(nextInput)
			}
		}
	}

	onMount(() => {
		inputs = inputGroupRef.querySelectorAll('input')
		setFocus()
	})
</script>

<svelte:head>
	<title>Paper Cost Calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-3 px-4 py-3">
	<h1 class="text-xl text-center text-teal-500 font-semibold">Paper Cost</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-2 h-[90%] items-center">
		<div class="flex w-full items-start">
			<input
				bind:value={customer_name}
				type="text"
				placeholder="Customer name"
				class="border-b border-dashed w-full px-2 focus:outline-none focus:border-teal-500"
			/>
		</div>
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
					<div class="flex flex-grow justify-center px-1">
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
			<div class="flex flex-row justify-between w-full mt-3">
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
