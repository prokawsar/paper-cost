import { expect, test } from '@playwright/test'
import { login } from './utils'

test('index page not loaded without login', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByText('Paper Cost')).not.toBeVisible()
})

test('calculate paper cost works', async ({ page }) => {
	await login(page)
	// await page.goto('/')

	await page.getByPlaceholder('Product name').click()
	await page.getByPlaceholder('Product name').fill('Test product')
	await page.getByPlaceholder('L').fill('23')
	await page.getByPlaceholder('W').fill('23')
	await page.getByPlaceholder('GSM').fill('23')
	await page.getByPlaceholder('R', { exact: true }).fill('100')
	await page.getByRole('button', { name: 'Calculate' }).click()
	await page.getByRole('button', { name: 'Save cost' }).click()
	await expect(page.getByText('Total with (40%):')).toBeVisible()
	await expect(page.getByText('1.10')).toBeVisible()
	await page.getByRole('button', { name: 'Clear' }).click()
	await expect(page.getByText('= total')).toBeVisible()
})

test('cost details saved in history', async ({ page }) => {
	await login(page)

	// await page.goto('/')
	await page.getByPlaceholder('L').fill('34')
	await page.getByPlaceholder('L').press('Enter')
	await page.getByPlaceholder('W').fill('34')
	await page.getByPlaceholder('W').press('Enter')
	await page.getByPlaceholder('GSM').fill('34')
	await page.getByPlaceholder('GSM').press('Enter')
	await page.getByPlaceholder('R', { exact: true }).fill('100')
	await page.getByPlaceholder('R', { exact: true }).press('Enter')
	await expect(page.getByText('Total with (40%):')).toBeVisible()
	await expect(page.getByText('3.55')).toBeVisible()
	await page.getByRole('button', { name: 'Save cost' }).click()
	await expect(page.getByText('Cost details saved')).toBeVisible()
	await page.getByRole('link', { name: 'Cost History' }).click()
	await expect(page.getByRole('heading', { name: 'History' })).toBeVisible()
})

test('multiple paper calcuation', async ({ page }) => {
	await login(page)

	// await page.goto('/')

	await page.getByTestId('product_name').click()
	await page.getByTestId('product_name').fill('Snaks')
	await page.getByRole('button', { name: 'Add paper' }).click()

	await page.getByTestId('length').first().click()
	await page.getByTestId('length').first().fill('34')
	await page.getByTestId('length').first().press('Enter')
	await page.getByTestId('width').first().fill('43')
	await page.getByTestId('width').first().press('Enter')
	await page.getByTestId('thickness').first().fill('33')
	await page.getByTestId('thickness').first().press('Enter')
	await page.getByTestId('rate').first().fill('100')
	await page.getByTestId('rate').first().press('Enter')

	await page.getByTestId('length').nth(1).fill('43')
	await page.getByTestId('length').nth(1).press('Enter')
	await page.getByTestId('width').nth(1).fill('32')
	await page.getByTestId('width').nth(1).press('Enter')
	await page.getByTestId('thickness').nth(1).fill('54')
	await page.getByTestId('thickness').nth(1).press('Enter')
	await page.getByTestId('rate').nth(1).fill('120')
	await page.getByTestId('rate').nth(1).press('Enter')

	await expect(page.getByTestId('total40-text')).toBeVisible()
	await expect(page.getByTestId('total40-value')).toBeVisible()
	await expect(page.getByTestId('total-text')).toBeVisible()
	await expect(page.getByTestId('total-value')).toBeVisible()
	await page.getByRole('button', { name: 'Clear' }).click()

	await expect(page.getByTestId('total40-value')).not.toBeVisible()
	await expect(page.getByTestId('total-text')).not.toBeVisible()
})
