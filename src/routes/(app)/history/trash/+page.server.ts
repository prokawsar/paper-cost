export async function load({ locals: { user, supabase } }) {
	if (!user) throw new Error('Unautherized request')

	const { data } = await supabase
		.from('history')
		.select()
		.eq('user', user.id)
		.not('deleted_at', 'is', null)
	return {
		histories: data ?? []
	}
}
