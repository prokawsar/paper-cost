import { writable, type Writable } from 'svelte/store'

export const focusedInputStore: Writable<HTMLInputElement | null> = writable(null)
export const totalHistoryStore: Writable<number> = writable(0)
