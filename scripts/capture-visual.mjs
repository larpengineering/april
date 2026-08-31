import { chromium } from '@playwright/test'

const baseUrl = process.env.SITE_URL ?? 'http://127.0.0.1:4173'
const outputDir = process.env.SCREENSHOT_DIR ?? '/tmp'
const browser = await chromium.launch({ headless: true })
let failed = false

for (const [name, viewport] of Object.entries({
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
})) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${outputDir}/april-${name}.png`, fullPage: true })
  const report = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim(),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyHeight: document.body.scrollHeight,
    components: ['april-sigil', 'principle-deck', 'claim-check', 'tension-stack', 'curiosity-field']
      .map((tag) => [tag, Boolean(document.querySelector(tag)?.children.length)]),
    overflowers: [...document.querySelectorAll('*')]
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return { tag: element.tagName.toLowerCase(), className: element.className, left: rect.left, right: rect.right, width: rect.width }
      })
      .filter((item) => item.left < -1 || item.right > document.documentElement.clientWidth + 1)
      .slice(0, 12),
  }))
  if (report.scrollWidth !== report.clientWidth || errors.length) failed = true
  console.log(name, JSON.stringify(report), 'errors', JSON.stringify(errors))
  await page.close()
}

await browser.close()
if (failed) process.exitCode = 1
