<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import PaperItem from '$lib/elements/PaperItem.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { focusedInputStore, totalHistoryStore } from '$lib/stores'
	import { MAX_HISTORY, MAX_PAPER, paperFields } from '$lib/utils/constants'
	import { addHistory, calculateCost, getTotalHistory, type Paper } from '$lib/utils/services'
	import { makeid } from '$lib/utils/tools'
	import mixpanel from '$lib/utils/mixpanel'
	import { onMount, tick } from 'svelte'
	import { toast } from 'svelte-sonner'

	export let data

	let paperCount: Paper[] = [{ ...paperFields, id: makeid(5) }]
	let perPaperResult: Map<string, number> = new Map()
	let finalPrice: number = 0
	let inputs: NodeListOf<HTMLInputElement> | null
	let inputGroupRef: HTMLDivElement
	let focusedIndex = 0
	let product_name = ''
	let isSavingHistory = false

	const addPaper = async () => {
		paperCount.push({ ...paperFields, id: makeid(5) })
		paperCount = paperCount
		getAllInputs()
	}

	const removePaper = async (idx: string) => {
		paperCount = paperCount.filter((field) => field.id != idx)
		if (perPaperResult.has(idx)) perPaperResult.delete(idx)
		perPaperResult = perPaperResult
		setTimeout(() => {
			getAllInputs()
		}, 300)
	}

	const calculatePaperCost = async () => {
		if (hasNullValue) return
		perPaperResult.clear()
		finalPrice = 0
		paperCount.forEach((paper) => {
			const totalPerPaper = calculateCost(paper)

			perPaperResult.set(paper.id, totalPerPaper)
			finalPrice += totalPerPaper
		})
		perPaperResult = perPaperResult

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

	const saveHistory = async () => {
		if (!product_name) {
			toast.warning('Product name is required!')
			return
		}
		if ($totalHistoryStore < MAX_HISTORY) {
			isSavingHistory = true
			const response = await addHistory({
				name: product_name,
				final_price: finalPrice,
				papers: paperCount,
				user: data.user.id
			})

			if (response && response?.message.indexOf('TypeError') != -1) {
				toast.error('Failed to save history, you are offline!')
				isSavingHistory = false
				return
			}
			$totalHistoryStore = await getTotalHistory()
			isSavingHistory = false
			toast.success('Cost details saved successfully')
		}
	}

	const clearAll = () => {
		paperCount = [{ ...paperFields, id: makeid(5) }]
		finalPrice = 0
		focusedIndex = 0
		product_name = ''
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
	$: showSaveHistory = perPaperResult.size == paperCount.length
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
			event.preventDefault()
			focusedIndex++
			focusedIndex = Math.min(focusedIndex, inputs.length)
			// Calculate on final input field
			if (focusedIndex == inputs.length) {
				calculatePaperCost()
				return
			}
			const nextInput = inputs[focusedIndex]
			if (nextInput) {
				setFocus(nextInput)
			}
		}
	}

	onMount(async () => {
		await getAllInputs()
		setFocus()
		$totalHistoryStore = await getTotalHistory()
	})
</script>

<svelte:head>
	<title>Paper Cost Calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-3 px-4 py-3">
	<h1 class="text-xl text-center text-teal-500 font-semibold">Paper Cost</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-2 h-[90%] items-center">
		{#if $totalHistoryStore >= MAX_HISTORY}
			<p class="text-sm text-yellow-600 animate-pulse">
				Maximum history reached, delete some history!
			</p>
		{/if}
		<div class="flex w-full gap-1 items-start">
			<input
				data-testid="product_name"
				bind:value={product_name}
				type="text"
				placeholder="Product name"
				class="border-b py-[2px] border-dashed w-full h-full px-2 focus:outline-none focus:border-teal-500"
			/>
			{#if showSaveHistory}
				<Button
					disabled={isSavingHistory}
					on:click={saveHistory}
					text="Save cost"
					classNames="text-sm animate-pulse !w-[30%] !px-1"
				/>
			{/if}
		</div>
		<div
			class="flex flex-col gap-[2px] overflow-y-auto max-w-3xl max-h-[85%] py-2 w-full"
			bind:this={inputGroupRef}
		>
			{#each paperCount as paper, index (paper.id)}
				<PaperItem
					{index}
					bind:paper
					{perPaperResult}
					totalPaper={paperCount.length}
					on:keydown={(event) => handleKeyDown(event)}
					on:remove={() => removePaper(paper.id)}
				/>
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
