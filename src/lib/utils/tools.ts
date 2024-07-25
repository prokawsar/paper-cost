import { crossfade } from 'svelte/transition'

export function makeid(length: number) {
	let str = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		str += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return str
}

export const [send, receive] = crossfade({
	fallback(node, params) {
		const style = getComputedStyle(node)
		const transform = style.transform === 'none' ? '' : style.transform

		return {
			duration: 300,
			easing: params.easing,
			css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
		}
	}
})
