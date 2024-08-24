import { sveltekit } from '@sveltejs/kit/vite'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default ({ mode }: { mode: string }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
	return defineConfig({
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		server: {
			port: 2000
		}
	})
}
