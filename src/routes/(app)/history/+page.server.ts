import { supabase } from '$lib/db/supabaseClient'

export async function load() {
	const { data } = await supabase.from('history').select().is('deleted_at', null)
	return {
		histories: data ?? []
	}
}
