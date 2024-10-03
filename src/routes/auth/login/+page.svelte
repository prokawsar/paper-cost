<script lang="ts">
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	import { redirect } from '@sveltejs/kit'

	export let data
	export let form
	$: ({ supabase } = data)

	let email = ''
	let password = ''

	const handleOAuthLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `http://localhost:2000/auth/callback/`
			}
		})

		if (error) {
			return
		}

		return redirect(300, data.url)
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex items-center w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">Login</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />
	<p
		class:hidden={!form?.message}
		class="text-sm text-red-500 border border-red-200 rounded-sm px-1"
	>
		{form?.message ? form?.message : ''}
	</p>

	<form method="post" action="?/login" class="flex w-full flex-col gap-3 items-center">
		<Input
			required
			type="email"
			name="email"
			bind:value={email}
			classNames="!w-full text-center"
			placeholder="Type your email"
		/>
		<Input
			required
			type="password"
			name="password"
			bind:value={password}
			classNames="!w-full text-center font-bold"
			placeholder="*******"
		/>
		<Button type="submit" text="Login" />
	</form>
	<!-- <Button type="button" text="Login with Google" on:click={handleOAuthLogin} /> -->

	<p class="text-center text-slate-500 mt-10">
		Forget password? Need a new account? <br />
		Contact: <email>prokawsar@gmail.com</email>
	</p>
</section>
