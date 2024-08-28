import type { Page } from '@playwright/test'

export const login = async (page: Page) => {
	await page.goto('/auth/login')
	await page.getByTestId('email').click()
	await page.getByTestId('email').fill('prokawsar@gmail.com')
	await page.getByTestId('password').click()
	await page.getByTestId('password').fill('@Kawsar000')
	await page.getByRole('button', { name: 'Login' }).click()
}
