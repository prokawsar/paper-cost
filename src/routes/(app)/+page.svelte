<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import PaperItem from '$lib/elements/PaperItem.svelte'
	import Result from '$lib/elements/Result.svelte'
	import { focusedInputStore, totalHistoryStore } from '$lib/stores'
	import { MAX_HISTORY, MAX_PAPER, paperFields } from '$lib/utils/constants'
	import { addHistory, calculateCost, getTotalHistory, type Paper } from '$lib/utils/services'
	import { makeid } from '$lib/utils/tools'
	import mixpanel from '$lib/utils/mixpanel'
	import { toast } from 'svelte-sonner'
	import { SvelteMap } from 'svelte/reactivity'
	import { onMount, tick } from 'svelte'
	import SingleLine from '$lib/elements/SingleLine.svelte'

	let { data } = $props()

	let paperCount: Paper[] = $state([{ ...paperFields, id: makeid(5) }])
	let perPaperResult: SvelteMap<string, number> = new SvelteMap()
	let finalPrice: number = $state(0)
	let inputs: NodeListOf<HTMLInputElement> | [] = $state([])
	let inputGroupRef: HTMLDivElement
	let focusedIndex = $state(0)
	let product_name = $state('')
	let inputsArray: HTMLInputElement[] = $state([])
	let isSavingHistory = $state(false)

	const addPaper = async () => {
		paperCount.push({ ...paperFields, id: makeid(5) })
		getAllInputs()
	}

	const removePaper = async (idx: string) => {
		paperCount = paperCount.filter((field) => field.id != idx)
		if (perPaperResult.has(idx)) perPaperResult.delete(idx)
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
				id: '',
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
		inputsArray = Array.from(inputs)
	}

	const setFocus = (element?: HTMLInputElement) => {
		if (inputs.length) {
			$focusedInputStore = element || inputs[0]
			$focusedInputStore?.focus()
		}
	}

	const hasNullValue = $derived(
		paperCount &&
			paperCount.find((paper) => {
				return !paper.length || !paper.width || !paper.thickness || !paper.rate
			})
	)

	const showSaveHistory = $derived(perPaperResult.size == paperCount.length)

	// Handling and maintaining focused input index
	const focusedInputID = $derived($focusedInputStore && $focusedInputStore.getAttribute('id'))
	$effect(() => {
		if (focusedInputID && inputsArray && inputsArray.length) {
			focusedIndex = inputsArray
				.map((input) => input.getAttribute('id'))
				.findIndex((id) => focusedInputID == id)
		}
	})

	const handleKeyDown = (event: KeyboardEvent) => {
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

	onMount(() => {
		getAllInputs()
		setFocus()
		getTotalHistory().then((totalHistory) => ($totalHistoryStore = totalHistory))
	})
</script>

<svelte:head>
	<title>Paper Cost Calculator</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[85%] flex-col gap-3 px-4 py-3">
	<h1 class="text-xl text-center text-teal-500 font-semibold">Paper Cost</h1>
	<SingleLine />

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
					onclick={saveHistory}
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
					bind:paper={paperCount[index]}
					{perPaperResult}
					totalPaper={paperCount.length}
					onkeydown={(event) => handleKeyDown(event)}
					onremove={() => removePaper(paper.id)}
				/>
			{/each}
		</div>

		<!-- Button and result section -->
		<div class="flex flex-col justify-center max-w-3xl w-full gap-4">
			<!-- button section -->
			<div class="flex flex-row justify-between w-full mt-3">
				<Button
					classNames="text-sm"
					onclick={addPaper}
					disabled={paperCount.length == MAX_PAPER}
					text="Add paper"
				/>
				{#if finalPrice}
					<button
						class="border border-red-200 rounded-md px-3 py-1 text-red-400 w-fit"
						onclick={clearAll}
					>
						Clear
					</button>
				{/if}
				{#if paperCount.length}
					<Button onclick={calculatePaperCost} disabled={!!hasNullValue} text="Calculate" />
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
