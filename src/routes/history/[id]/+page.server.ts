import { getHistory } from '$lib/utils/services'

export async function load({ params }) {
	const data = await getHistory(params.id)
	return {
		history: data ?? []
	}
}
