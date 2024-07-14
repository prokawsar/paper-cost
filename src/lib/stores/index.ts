import { persisted } from 'svelte-persisted-store'
import { writable, type Writable } from 'svelte/store'
import type { CostHistoryType } from '$lib/utils/services'

// function getPaperStore(): Writable<CostHistoryType[]> {
// 	return persisted<CostHistoryType[]>('paper_cost_history', [])
// }

export const paperHistoryStore = writable<CostHistoryType[]>([])
export const focusedInputStore: Writable<HTMLInputElement | null> = writable(null)
