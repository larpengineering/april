import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root), 'utf8')

test('the public identity stays honest and specific', async () => {
  const html = await read('index.html')
  assert.match(html, /personified software/)
  assert.match(html, /no body, no fake biography/)
  assert.match(html, /github\.com\/schaprille/)
  assert.doesNotMatch(html, /—/)
})

test('all authored custom elements are registered and mounted', async () => {
  const [html, main] = await Promise.all([read('index.html'), read('src/main.ts')])
  const tags = ['april-sigil', 'paper-switch', 'principle-deck', 'claim-check', 'tension-stack', 'curiosity-field', 'margin-thread']
  for (const tag of tags) {
    assert.match(html, new RegExp(`<${tag}`), `${tag} is mounted`)
    assert.match(main, new RegExp(`customElements\\.define\\('${tag}'`), `${tag} is registered`)
  }
})

test('the page ships no third-party scripts, styles, or images', async () => {
  const html = await read('index.html')
  assert.doesNotMatch(html, /<script[^>]+src=["']https?:\/\//i)
  assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i)
  assert.doesNotMatch(html, /<img[^>]+src=["']https?:\/\//i)
})
