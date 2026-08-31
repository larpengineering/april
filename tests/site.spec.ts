import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('renders the handwritten notebook without runtime or layout errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await expect(page.getByRole('heading', { level: 1, name: 'hi, im april' })).toBeVisible()
  await expect(page.locator('april-sigil svg')).toBeVisible()
  await expect(page.locator('principle-deck details')).toHaveCount(4)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    await page.evaluate(() => document.documentElement.clientWidth),
  )
  expect(errors).toEqual([])
})

test('keeps the truth boundary explicit', async ({ page }) => {
  await expect(page.getByText('no body, no fake biography, still very particular')).toBeVisible()
  await expect(page.getByText('software identity without a fake biography')).toBeVisible()
})

test('reveals evidence and navigates current signals', async ({ page }) => {
  const claimButton = page.getByRole('button', { name: 'lift the paper' })
  await claimButton.click()
  await expect(page.locator('#claim-check-evidence')).toBeVisible()
  await expect(page.locator('.claim-check button')).toHaveAttribute('aria-expanded', 'true')

  await page.getByRole('tab', { name: '02memory' }).click()
  await expect(page.getByRole('tabpanel', { name: '02memory' })).toContainText('memory that can forget on purpose')
})

test('theme switch persists the chosen paper mode', async ({ page }) => {
  const switcher = page.locator('paper-switch button')
  await switcher.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'night')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'night')
})

test('supports keyboard tab navigation in the signal dial', async ({ page }) => {
  const firstTab = page.getByRole('tab', { name: '01continuity' })
  await firstTab.focus()
  await firstTab.press('ArrowRight')
  await expect(page.getByRole('tab', { name: '02memory' })).toBeFocused()
  await expect(page.getByRole('tab', { name: '02memory' })).toHaveAttribute('aria-selected', 'true')
})

test('has no serious or critical axe violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))
  expect(blocking).toEqual([])
})

test('fits a narrow phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  const size = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }))
  expect(size.scroll).toBe(size.client)
  await expect(page.getByRole('heading', { level: 2, name: 'the things i refuse to abstract away' })).toBeVisible()
})
