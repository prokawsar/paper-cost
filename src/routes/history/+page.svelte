<script lang="ts">
	import Input from '$lib/elements/Input.svelte'
	import { paperHistoryStore } from '$lib/stores'
	import days from 'dayjs'
	import Icon from '@iconify/svelte'
</script>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">History</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<div class="flex flex-col w-full justify-between gap-4 h-[90%] items-center">
		<div class="flex flex-col gap-2 overflow-y-auto w-full max-w-3xl py-2">
			{#if $paperHistoryStore.history.length}
				{#each $paperHistoryStore.history as { finalPrice, papers, date }, i}
					<div
						class="flex flex-col gap-1 items-center w-full p-2 border border-dashed rounded shadow-sm"
					>
						<div class="flex flex-row items-center pl-1 justify-between w-full">
							<p class="w-fit">
								{days(date).format('DD-MM-YYYY')}
							</p>
							<p>
								{finalPrice.toFixed(2)}
							</p>
						</div>
						<!-- <div class="grid grid-cols-5 w-full gap-1 items-center overflow-x-auto p-1">
							{#each papers as field}
								<Input bind:value={field.height} disabled />
								<Input bind:value={field.width} disabled />
								<Input bind:value={field.thickness} disabled />
								<Input bind:value={field.rate} disabled />
							{/each}
							<div class="flex justify-start">
								<p>
									= {finalPrice.toFixed(2)}
								</p>
							</div>
						</div> -->
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
