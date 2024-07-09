export function makeid(length:number) {
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