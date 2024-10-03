import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	process.env.PUBLIC_SUPABASE_URL || '',
	process.env.PUBLIC_SUPABASE_ANON || ''
)

export default async function globalTeardown() {
	await performCleanup()
}

async function performCleanup() {
	console.log('Performing cleanup...')
	await deleteAllHistory()
	await emptyTrashData()
}

// For cleanup after test
export const deleteAllHistory = async () => {
	const response = await supabase
		.from('history')
		.delete()
		.eq('user', '1d2d6d58-1f0a-44d2-bba2-2bdf60c584b6')
	return response
}

export const emptyTrashData = async () => {
	const response = await supabase.from('history').delete().not('deleted_at', 'is', null)
	return response
}
