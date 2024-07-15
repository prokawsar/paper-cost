import { supabase } from '$lib/db/supabaseClient'

export async function load() {
	const { data } = await supabase.from('history').select()
	return {
		histories: data ?? []
	}
}
