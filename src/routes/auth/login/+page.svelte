<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/elements/Button.svelte'
	import Input from '$lib/elements/Input.svelte'
	let email = ''
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="max-w-6xl mx-auto flex w-full max-h-[90%] flex-col gap-4 px-4 py-5">
	<h1 class="text-xl text-center">Login</h1>
	<div class="w-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent p-[1px]" />

	<div class="flex w-full flex-col gap-3 items-center">
		<Input type="email" bind:value={email} classNames="!w-full" placeholder="Type your email" />
		<Button text="Login with OTP" />
	</div>
</section>
