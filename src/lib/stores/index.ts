import type { Paper } from '$lib/utils/services'
import { persisted } from 'svelte-persisted-store'
import { writable, type Writable } from 'svelte/store'

export type PaperHistory = {
	id: string
	finalPrice: number
	date?: Date
	papers: Paper[]
}
function getPaperStore(): Writable<{ history: PaperHistory[] }> {
	return persisted<{ history: PaperHistory[] }>('paper_cost_history', { history: [] })
}

export const paperHistoryStore = getPaperStore()
export const focusedInputStore: Writable<HTMLInputElement | null> = writable(null)
