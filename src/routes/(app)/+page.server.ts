import { redirect, type Actions } from '@sveltejs/kit'

export const load = ({ locals: { user } }) => {
	return {
		user
	}
}

export const actions: Actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			redirect(303, '/auth/login?error=' + error.message)
		} else {
			redirect(303, '/auth/login')
		}
	}
}
