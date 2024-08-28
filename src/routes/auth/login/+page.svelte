<script lang="ts">
	import { page } from '$app/stores'
	import { supabase } from '$lib/db/supabaseClient'
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	import { redirect } from '@sveltejs/kit'

	let email = ''
	let password = ''
	let otp = ''
	let isOtpSent = false

	const handleSendOTP = () => {
		if (!email) return
		isOtpSent = true
	}
	const verifyOTP = () => {
		if (!otp) return
	}

	const handleLogin = async () => {
		if (!email || !password) return
		console.log(email, password)
		const { data, error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			return
		}
		return redirect(300, '/')
	}

	const handleOAuthLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
		if (error) {
			return
		}
		return redirect(300, '/')
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex items-center w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">Login</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

	<!-- <form class="flex w-full flex-col gap-3 items-center">
		<Input
			required
			type="email"
			bind:value={email}
			classNames="!w-full text-center"
			placeholder="Type your email"
		/>
		<Input
			required
			type="password"
			bind:value={password}
			classNames="!w-full text-center font-bold"
			placeholder="*******"
		/>
		<Button type="submit" text="Login" on:click={handleLogin} />
	</form> -->
	<Button type="button" text="Login with Google" on:click={handleOAuthLogin} />

	<p class="text-center text-slate-500 mt-10">
		Forget password? Need a new account? <br />
		Contact: <email>prokawsar@gmail.com</email>
	</p>
</section>
