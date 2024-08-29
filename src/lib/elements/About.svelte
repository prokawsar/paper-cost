<script lang="ts">
	import { version } from '$app/environment'
	import type { User } from '@supabase/supabase-js'
	export let user: User | null = null
</script>

<div class="flex flex-col text-center items-center">
	<img class="h-10 w-10 rounded-full" src="/logo.jpeg" alt="logo" />
	<p class="text-lg font-bold">Paper Cost</p>

	<p class="text-sm">
		Logged in as:
		<span class="text-teal-500">
			{user?.email}
		</span>
	</p>
	<p class="mt-5">Developed by</p>
	<div class="text-sm flex flex-col">
		<p>Sheba Queue</p>
		<p>Kawsar Ahmed</p>
		<p class="text-[13px]">+880 1915983757</p>
	</div>
	<p class="mt-10 text-slate-500 text-xs">Version: {version}</p>
</div>
