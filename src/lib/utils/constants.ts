export const PAPER_FIXED = 1550000
export const MAX_PAPER = 10
export const MAX_HISTORY = 20

export const paperFields = {
	id: '',
	length: '',
	width: '',
	thickness: '',
	rate: ''
}
export const placeholders: { [key: string]: string } = {
	length: 'L',
	width: 'W',
	thickness: 'GSM',
	rate: 'R'
}
export const fields = Object.keys(paperFields).filter((key) => key !== 'id')

export const PROTECTED_ROUTES = ['/', '/history', '/history/trash', '/history/']
