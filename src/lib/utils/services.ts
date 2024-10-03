import { supabase } from '$lib/db/supabaseClient'
import { PAPER_FIXED } from './constants'

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
	user: string
	created_at?: string
}

export const calculateCost = (paper: Paper): number => {
	const paperSize = parseFloat(paper.length) * parseFloat(paper.width) * parseFloat(paper.thickness)
	const result = paperSize / PAPER_FIXED
	return result * parseFloat(paper.rate)
}

// export const calculateCost = (paper: Paper): number => {
// 	const paperSize = parseFloat(paper.length) * parseFloat(paper.width) * parseFloat(paper.thickness)
// 	const result: number = parseFloat(paperSize.toFixed(2)) / PAPER_FIXED
// 	return result * parseFloat(parseFloat(paper.rate).toFixed(2))
// }

export const get40Percent = (cost: number) => {
	return (cost * 40) / 100
}

export const addHistory = async (history: CostHistoryType) => {
	const { data, error } = await supabase.from('history').insert({
		name: history.name || '',
		papers: history.papers,
		final_price: history.final_price,
		user: history.user
	})
	if (!error) {
		return data
	}
	return error
}

export const getTotalHistory = async (): Promise<number> => {
	const { count } = await await supabase
		.from('history')
		.select('*', { count: 'exact' })
		.is('deleted_at', null)
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

export const emptyTrashData = async () => {
	const response = await supabase.from('history').delete().not('deleted_at', 'is', null)
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
