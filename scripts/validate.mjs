import fs from 'node:fs/promises'
import assert from 'node:assert/strict'

const catalog = JSON.parse(await fs.readFile('src/generated/catalog.json', 'utf8'))
const names = new Set(catalog.map((item) => item.name))
assert.equal(names.size, 32, 'All 32 component pages must be generated')
assert.equal(names.size, catalog.length, 'Component names must be unique')
for (const item of catalog) {
  const source = await fs.readFile(`packages/rillmark/src/ui/${item.name}.tsx`, 'utf8')
  assert.equal(await fs.readFile(`public/source/${item.name}.tsx`, 'utf8'), source, `${item.name}: stale public source`)
  assert.equal(await fs.readFile(`examples/components/${item.name}-demo.tsx`, 'utf8'), item.example, `${item.name}: stale example`)
  const doc = await fs.readFile(`public/docs/components/${item.name}.md`, 'utf8')
  assert.ok(doc.includes(item.example) && doc.includes('npm install rillmark'), `${item.name}: incomplete documentation`)
  for (const [, dependency] of item.example.matchAll(/from ['"]rillmark\/([^'"]+)['"]/g)) assert.ok(names.has(dependency), `${item.name}: unresolved component ${dependency}`)
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
console.log(`Validated ${catalog.length} component sources, compiling examples, generated documentation and light/dark token contrast.`)
