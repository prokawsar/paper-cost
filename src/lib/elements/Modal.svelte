<script lang="ts">
	import { makeid, receive, send } from '$lib/utils/tools'
	import Icon from '@iconify/svelte'

	export let show = false
	const id = makeid(6)
</script>

<div class="absolute bg-black bg-opacity-20 flex h-full w-full items-center justify-center z-10">
	<div
		in:receive={{ key: id, duration: 200 }}
		out:send={{ key: id, duration: 200 }}
		class="bg-white p-2 rounded relative flex flex-col w-3/4"
	>
		<button
			class="absolute top-0 right-0 p-[3px] rounded-full w-fit"
			on:click|stopPropagation|preventDefault={() => (show = false)}
		>
			<Icon icon="majesticons:multiply" width="20px" />
		</button>
		<slot />
	</div>
</div>
