<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'

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

	const handleLogin = () => {
		if (!email || !password) return
		console.log(email, password)
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">Login</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

	<form class="flex w-full flex-col gap-3 items-center">
		<!-- {#if isOtpSent}
			<Input
				required
				type="text"
				bind:value={otp}
				classNames="!w-full text-center"
				placeholder="******"
			/>
			<Button type="submit" text="Login with OTP" on:click={verifyOTP} />
		{:else} -->
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
		<!-- {/if} -->
	</form>

	<p class="text-center text-slate-500 mt-10">
		Forget password? Need a new account? <br />
		Contact: <email>prokawsar@gmail.com</email>
	</p>
</section>
