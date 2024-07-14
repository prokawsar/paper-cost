<script lang="ts">
	export let disabled = false
	export let text = ''
	export let classNames = ''
</script>

<button
	{disabled}
	class="border border-gray-400 rounded-md text-teal-600 font-semibold px-3 py-1 w-fit disabled:text-opacity-60 {classNames}"
	on:click
>
	{text}
</button>
