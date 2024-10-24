<script lang="ts">
	type ButtonProp = {
		text: string
		onclick: () => void
		classNames: string
		type: 'button' | 'submit' | 'reset'
	}

	let { text, classNames, type = 'button', onclick, ...rest }: ButtonProp = $props()

	let buttonRef: HTMLButtonElement

	$effect(() => {
		if (buttonRef) {
			buttonRef.type = type
		}
	})
</script>

<button
	{onclick}
	{...rest}
	bind:this={buttonRef}
	{type}
	class="border border-gray-400 rounded-md text-teal-600 font-semibold px-3 py-1 w-fit disabled:text-opacity-60 {classNames}"
>
	{text}
</button>
