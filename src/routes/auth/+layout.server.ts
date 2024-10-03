import type { LayoutServerLoad } from '../(app)/$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
	return {
		cookies: cookies.getAll()
	}
}
