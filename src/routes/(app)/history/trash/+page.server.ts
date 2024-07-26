import { supabase } from '$lib/db/supabaseClient'

export async function load() {
	const { data } = await supabase.from('history').select().not('deleted_at', 'is', null)
	return {
		histories: data ?? []
	}
}
