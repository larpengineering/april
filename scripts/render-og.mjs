import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const source = new URL('../public/og-card.svg', import.meta.url).href
await page.goto(source, { waitUntil: 'networkidle' })
await page.screenshot({
  path: new URL('../public/og-card.png', import.meta.url).pathname,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
})
await browser.close()
