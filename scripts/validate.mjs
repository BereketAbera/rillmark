import fs from 'node:fs/promises'
import { registrySchema, registryItemSchema } from 'shadcn/schema'
import assert from 'node:assert/strict'

const registry = registrySchema.parse(JSON.parse(await fs.readFile('registry.json', 'utf8')))
const names = new Set(registry.items.map((item) => item.name))
assert.equal(names.size, registry.items.length, 'Registry item names must be unique')
for (const item of registry.items) {
  const built = registryItemSchema.parse(JSON.parse(await fs.readFile(`public/r/${item.name}.json`, 'utf8')))
  for (const file of built.files ?? []) assert.ok(file.content?.trim(), `${item.name}: missing file content`)
  for (const dep of item.registryDependencies ?? []) assert.ok(names.has(dep.replace('@rillmark/', '')), `${item.name}: unresolved registry dependency ${dep}`)
  if (item.type === 'registry:ui') {
    assert.ok(names.has(`${item.name}-demo`), `${item.name}: missing compiling example`)
    const doc = await fs.readFile(`public/docs/components/${item.name}.md`, 'utf8')
    assert.ok(doc.includes('```tsx\n'), `${item.name}: missing example documentation`)
  }
}
const tokens = JSON.parse(await fs.readFile('tokens.json', 'utf8'))
const linear = (n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
const luminance = (hex) => { const c = hex.slice(1).match(/../g).map((n) => linear(parseInt(n, 16) / 255)); return c[0] * .2126 + c[1] * .7152 + c[2] * .0722 }
const ratio = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05) }
for (const mode of ['light', 'dark']) {
  const t = tokens[mode]
  for (const [foreground, background, minimum] of [['foreground', 'background', 4.5], ['card-foreground', 'card', 4.5], ['muted-foreground', 'card', 4.5], ['primary-foreground', 'primary', 4.5], ['secondary-foreground', 'secondary', 4.5], ['accent-foreground', 'accent', 4.5], ['destructive-foreground', 'destructive', 4.5], ['input', 'card', 3], ['ring', 'background', 3]]) {
    assert.ok(ratio(t[foreground], t[background]) >= minimum, `${mode} ${foreground}/${background} contrast is below ${minimum}:1`)
  }
}
console.log(`Validated ${registry.items.length} built items with the official shadcn schemas, dependency closure, compiling example presence, and light/dark token contrast.`)
