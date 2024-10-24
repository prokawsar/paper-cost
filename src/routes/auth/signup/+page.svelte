<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	import SingleLine from '$lib/elements/SingleLine.svelte'

	let { form } = $props()

	let email = $derived(form?.email || '')
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex items-center w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">Signup</h1>
	<SingleLine />
	<p
		class:hidden={!form?.message}
		class="text-sm text-red-500 border border-red-200 rounded-sm px-1"
	>
		{form?.message ? form?.message : ''}
	</p>

	<form method="post" action="?/signup" class="flex w-full flex-col gap-3 items-center">
		<Input
			required
			type="email"
			name="email"
			value={email}
			classNames="!w-full text-center"
			placeholder="Type your email"
		/>
		<Input
			required
			type="password"
			name="password"
			classNames="!w-full text-center font-bold"
			placeholder="*******"
		/>
		<Button type="submit" text="Signup" />
	</form>
	<!-- <Button type="button" text="Login with Google" on:click={handleOAuthLogin} /> -->

	<p class="text-center text-slate-500 mt-10">
		Already have a new account? <br />
		<a href="/auth/login" class="text-orange-500">Login here</a>
	</p>
</section>
