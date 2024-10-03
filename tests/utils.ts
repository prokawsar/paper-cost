import type { Page } from '@playwright/test'

export const login = async (page: Page) => {
	await page.goto('/auth/login')
	await page.getByTestId('email').click()
	await page.getByTestId('email').fill('test@gmail.com')
	await page.getByTestId('password').click()
	await page.getByTestId('password').fill('11111111')
	await page.getByRole('button', { name: 'Login' }).click()
	await page.waitForURL('/')
}
