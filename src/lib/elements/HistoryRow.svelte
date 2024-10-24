<script lang="ts">
	import { get40Percent, type CostHistoryType } from '$lib/utils/services'
	import Icon from '@iconify/svelte'
	import dayjs from 'dayjs'

	let {
		cost,
		isTrash = false,
		ondelete,
		onrestore
	}: {
		cost: CostHistoryType
		isTrash?: boolean
		ondelete: (id: string) => void
		onrestore?: (id: string) => void
	} = $props()

	let deleteConfirm = $state('')
</script>

<div class="flex flex-col gap-1 items-center w-full p-1 border border-dashed rounded shadow-sm">
	{#if cost}
		<a href="/history/{cost.id}" class="flex flex-row items-center pl-1 justify-between w-full">
			<p class:hidden={!cost.name} class="truncate w-[40%]" data-testid="product-name">
				{cost.name}
			</p>
			<p class="text-gray-500 text-sm truncate">
				{cost.final_price.toFixed(2)}
				<span class=" text-teal-600" data-testid="cost-with-40">
					({(cost.final_price + get40Percent(cost.final_price)).toFixed(2)})
				</span>
			</p>
			<p class="w-fit text-[10px] text-gray-500 truncate">
				{dayjs(cost.created_at).format('DD-MM-YYYY')}
			</p>

			<div class="flex flex-row items-center gap-[2px]">
				{#if onrestore}
					<button
						class:hidden={deleteConfirm == cost.id || !isTrash}
						class="border border-green-300 rounded text-green-600 p-[3px] w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
						onclick={(e) => {
							e.preventDefault()
							onrestore(cost.id)
						}}
					>
						<Icon icon="ic:round-settings-backup-restore" />
					</button>
				{/if}
				<button
					data-testid="delete-cost-history"
					class:hidden={deleteConfirm == cost.id}
					class="border border-red-300 rounded text-red-600 p-[3px] w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
					onclick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						deleteConfirm = cost.id || ''
					}}
				>
					{#if isTrash}
						<Icon icon="ic:baseline-delete-forever" />
					{:else}
						<Icon icon="ph:trash-light" width="16px" />
					{/if}
				</button>
				{#if deleteConfirm == cost.id}
					<button
						class="border border-yellow-300 p-[3px] rounded text-yellow-600 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
						onclick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							deleteConfirm = ''
						}}
					>
						<Icon icon="majesticons:multiply" width="16px" />
					</button>
					<button
						data-testid="confirm-delete"
						class="border border-green-300 p-[3px] rounded text-green-700 w-fit disabled:border-gray-200 disabled:cursor-not-allowed disabled:text-opacity-45"
						onclick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							ondelete(cost.id)
						}}
					>
						<Icon icon="teenyicons:tick-solid" width="15px" />
					</button>
				{/if}
			</div>
		</a>
	{/if}
</div>
