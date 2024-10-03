import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: '.env.development' })

export default defineConfig({
	testDir: './tests',
	timeout: 5000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	globalTeardown: './tests/global-teardown.ts',
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 1,
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'http://localhost:4173',
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry'
	},

	/* Configure projects for major browsers */
	projects: [
		// {
		// 	name: 'chromium',
		// 	use: { ...devices['Desktop Chrome'] }
		// },

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 7'] }
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] }
		}
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'npm run build:dev && npm run preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI
	}
})
