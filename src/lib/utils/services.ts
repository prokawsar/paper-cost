import { supabase } from '$lib/db/supabaseClient'

export type Paper = {
	id: string
	length: string
	width: string
	thickness: string
	rate: string
	[key: string]: string
}

export type CostHistoryType = {
	id?: string
	name: string
	papers: Paper[]
	final_price: number
	created_at?: string
}

export const PAPER_FIXED = 1550000
export const MAX_PAPER = 10
export const MAX_HISTORY = 20

export const calculateCost = (paper: Paper): number => {
	const paperSize = parseFloat(paper.length) * parseFloat(paper.width) * parseFloat(paper.thickness)
	const result = paperSize / PAPER_FIXED
	return result * parseFloat(paper.rate)
}

export const addHistory = async (history: CostHistoryType) => {
	const { data, error } = await supabase.from('history').insert({
		name: history.name || '',
		papers: history.papers || [],
		final_price: history.final_price || 100
	})
	if (!error) {
		return data
	}
	return error
}

export const getTotalHistory = async (): Promise<number> => {
	const { count } = await await supabase.from('history').select('*', { count: 'exact' })
	if (count) {
		return count
	}
	return 0
}

export const getHistory = async (id: string): Promise<CostHistoryType[] | null> => {
	const { data, error } = await supabase.from('history').select().eq('id', id)
	if (!error) {
		return data as unknown as CostHistoryType[]
	}
	return null
}

export const softDeleteHistory = async (id: string) => {
	const response = await supabase
		.from('history')
		.update({
			deleted_at: new Date()
		})
		.eq('id', id)
	return response
}

export const deleteHistory = async (id: string) => {
	const response = await supabase.from('history').delete().eq('id', id)
	return response
}

export const restoreHistory = async (id: string) => {
	const response = await supabase
		.from('history')
		.update({
			deleted_at: null
		})
		.eq('id', id)
	return response
}
