export type Paper = {
	id: string
	length: string
	width: string
	thickness: string
	rate: string
	[key: string]: string
}

export const PAPER_FIXED = 1550000
export const MAX_PAPER = 10
