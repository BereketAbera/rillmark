import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'
import { chromium, expect } from '@playwright/test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'rillmark-package-consumer-'))
const app = path.join(scratch, 'app')
const artifacts = path.join(root, 'evidence/npm-package')
await fs.mkdir(path.join(app, 'src'), { recursive: true })
await fs.mkdir(artifacts, { recursive: true })
const write = (name, contents) => fs.writeFile(path.join(app, name), contents)
const json = (value) => JSON.stringify(value, null, 2) + '\n'
const run = (command, args, cwd = app, capture = false) => {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', timeout: 240_000 })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed (${result.status})\n${result.stdout ?? ''}\n${result.stderr ?? ''}`)
  return result.stdout
}
const rootManifest = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'))
const pack = JSON.parse(run('npm', ['pack', path.join(root, 'packages/rillmark'), '--json', '--pack-destination', scratch], root, true))[0]
const files = pack.files.map(({ path: name }) => name)
for (const expected of ['dist/index.js', 'dist/index.d.ts', 'dist/ui/button.js', 'dist/ui/icon-button.d.ts', 'dist/styles.css', 'dist/theme.css', 'dist/tokens.json', 'src/ui/button.tsx', 'src/lib/rillmark-utils.ts', 'tailwind.css', 'LICENSE', 'README.md']) assert(files.includes(expected), `Missing packed file: ${expected}`)
assert(files.every((file) => /^(dist\/|src\/|package\.json$|tailwind\.css$|LICENSE$|README\.md$)/.test(file)), 'Package includes unintended files')
assert(!files.some((file) => file.startsWith('node_modules/') || file.includes('tests/') || file.includes('styles.entry') || file.includes('tsconfig')), 'Package includes build-only files')

await write('package.json', json({
  name: 'rillmark-package-consumer', private: true, version: '0.0.0', type: 'module',
  scripts: { build: 'tsc --noEmit && vite build' },
  dependencies: { react: rootManifest.dependencies.react, 'react-dom': rootManifest.dependencies['react-dom'], rillmark: `file:${path.join(scratch, pack.filename)}` },
  devDependencies: Object.fromEntries(['vite', 'typescript', '@vitejs/plugin-react', '@types/react', '@types/react-dom'].map((name) => [name, rootManifest.devDependencies[name]])),
}))
await write('tsconfig.json', json({ compilerOptions: { target: 'ES2022', lib: ['ES2022', 'DOM'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: false, noEmit: true, types: ['vite/client'] }, include: ['src'] }))
await write('index.html', '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rillmark package consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>')
await write('src/main.tsx', `import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Field, Input, Card, CardContent, CardHeader, CardTitle } from 'rillmark'
import { Button, type ButtonProps } from 'rillmark/button'
import { Combobox } from 'rillmark/combobox'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from 'rillmark/dialog'
import './app.css'

const props: ButtonProps = { variant: 'soft', size: 'sm' }
// @ts-expect-error Public declarations must reject unsupported variants.
const invalidProps: ButtonProps = { variant: 'unregistered' }
void props; void invalidProps

function App() {
  const [name, setName] = useState('Estuary studio')
  const [location, setLocation] = useState('')
  const [saved, setSaved] = useState(false)
  const [dark, setDark] = useState(false)
  return <main className="screen">
    <header><h1>Workspace settings</h1><Button variant="outline" onClick={() => { setDark(!dark); document.documentElement.classList.toggle('dark', !dark) }}>{dark ? 'Light theme' : 'Dark theme'}</Button></header>
    <Card><CardHeader><CardTitle as="h2">A shared direction</CardTitle></CardHeader><CardContent>
      <form className="form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
        <Field label="Workspace name" description="Visible to your collaborators." required><Input value={name} onChange={(event) => setName(event.target.value)} minLength={2} /></Field>
        <Field label="Home base"><Combobox options={[{ value: 'ams', label: 'Amsterdam' }, { value: 'cph', label: 'Copenhagen', keywords: ['Denmark'] }]} value={location} onValueChange={setLocation} /></Field>
        <Button type="submit">Save workspace</Button>
        {saved && <p role="status">Saved {name}.</p>}
      </form>
    </CardContent></Card>
    <Dialog><DialogTrigger asChild><Button variant="soft">Review details</Button></DialogTrigger><DialogContent><DialogTitle>Your workspace</DialogTitle><DialogDescription>{name} is ready for your next project.</DialogDescription><Button onClick={() => setSaved(true)}>Confirm review</Button></DialogContent></Dialog>
    <div data-testid="custom-utilities" className="custom-utilities bg-primary text-primary-foreground p-7">A little room for good work.</div>
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
`)
const layoutCss = '.screen { max-width: 42rem; margin: 3rem auto; padding: 1.5rem; display: grid; gap: 1.5rem; } header { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; } h1 { font-size: 1.75rem; font-weight: 600; } .form { display: grid; gap: 1.25rem; } .custom-utilities { border: 1px solid var(--border); border-radius: 1rem; }'
await write('src/app.css', `@import "rillmark/styles.css";\n${layoutCss}\n`)
await write('vite.config.ts', 'import { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\nexport default defineConfig({ plugins: [react()] })\n')
run('npm', ['install', '--no-fund', '--no-audit'])
assert(!(await fs.lstat(path.join(app, 'node_modules/rillmark'))).isSymbolicLink(), 'Consumer must install the packed tarball, not link the workspace')
const installedManifest = JSON.parse(await fs.readFile(path.join(app, 'node_modules/rillmark/package.json'), 'utf8'))
assert.deepEqual(Object.keys(installedManifest.dependencies).sort(), ['clsx', 'lucide-react', 'radix-ui', 'tailwind-merge'], 'Only the declared component runtime dependencies should ship')
await assert.rejects(fs.access(path.join(app, 'node_modules/tailwindcss')), 'The default CSS path must work without Tailwind')
const reactPaths = run('npm', ['ls', 'react', '--all', '--parseable'], app, true).trim().split('\n').filter((entry) => entry.endsWith('/node_modules/react'))
assert.equal(new Set(await Promise.all(reactPaths.map((entry) => fs.realpath(entry)))).size, 1, 'React must be a single shared peer, not bundled or duplicated')
run('node', ['--input-type=module', '-e', `import assert from 'node:assert/strict'; import { createElement } from 'react'; import { renderToString } from 'react-dom/server'; import { Button as RootButton } from 'rillmark'; import { Button } from 'rillmark/button'; assert.equal(RootButton, Button); assert.match(renderToString(createElement(Button, null, 'Package ready')), /Package ready/); console.log('Node ESM imports and server rendering passed.');`])

const result = { tarball: path.join(artifacts, pack.filename), consumer: app, packageSize: pack.size, unpackedSize: pack.unpackedSize, integrity: pack.integrity, packedFiles: files, react: 'single shared peer', runtimeDependencies: installedManifest.dependencies, modes: [] }
const channel = process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'darwin' ? 'chrome' : undefined)
const browser = await chromium.launch({ headless: false, channel })
async function verify(mode) {
  run('npm', ['run', 'build'])
  const port = mode === 'precompiled' ? 5181 : 5182
  const server = spawn(path.join(app, 'node_modules/.bin/vite'), ['preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: app, stdio: 'pipe' })
  const context = await browser.newContext({ viewport: { width: 1100, height: 900 } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  try {
    for (let i = 0; i < 80; i++) {
      if (server.exitCode !== null) throw new Error('Package consumer preview exited before starting')
      try { if ((await fetch(`http://127.0.0.1:${port}`)).ok) break } catch { /* Server is still starting. */ }
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (i === 79) throw new Error('Package consumer preview did not start')
    }
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' })
    const save = page.getByRole('button', { name: 'Save workspace' })
    await expect(save).toHaveCSS('background-color', 'rgb(36, 95, 85)')
    await expect(save).toHaveCSS('min-height', '44px')
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(245, 244, 237)')
    await page.locator('label').filter({ hasText: 'Workspace name' }).click()
    const input = page.getByRole('textbox', { name: 'Workspace name' })
    await expect(input).toBeFocused()
    await input.fill('Estuary collective')
    await page.keyboard.press('Tab')
    const combo = page.getByRole('combobox', { name: 'Home base' })
    await expect(combo).toBeFocused()
    await combo.fill('Denmark')
    await combo.press('Enter')
    await expect(combo).toHaveValue('Copenhagen')
    await save.click()
    await expect(page.getByRole('status')).toHaveText('Saved Estuary collective.')
    const review = page.getByRole('button', { name: 'Review details' })
    await review.click()
    const dialog = page.getByRole('dialog', { name: 'Your workspace' })
    await expect(dialog).toBeVisible()
    await expect.poll(() => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(review).toBeFocused()
    if (mode === 'tailwind') {
      await expect(page.getByTestId('custom-utilities')).toHaveCSS('background-color', 'rgb(36, 95, 85)')
      await expect(page.getByTestId('custom-utilities')).toHaveCSS('padding', '28px')
    }
    await page.screenshot({ path: path.join(artifacts, `${mode}-light.png`), fullPage: true })
    await page.getByRole('button', { name: 'Dark theme' }).click()
    await expect(save).toHaveCSS('background-color', 'rgb(178, 213, 186)')
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(20, 39, 37)')
    await page.setViewportSize({ width: 390, height: 844 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: path.join(artifacts, `${mode}-dark-mobile.png`), fullPage: true })
    assert.deepEqual(errors, [])
    result.modes.push({ mode, build: 'passed', imports: 'root + component subpath', declarations: 'strict compilation plus invalid-variant rejection', styles: 'light/dark colors and 44px control height verified', keyboard: 'field label, combobox selection, dialog focus/escape/return verified', mobile: '390px, no horizontal overflow', pageErrors: errors })
  } finally {
    await context.close()
    server.kill('SIGTERM')
  }
}
try {
  await verify('precompiled')
  run('npm', ['install', '--save-dev', `tailwindcss@${rootManifest.devDependencies.tailwindcss}`, `@tailwindcss/vite@${rootManifest.devDependencies['@tailwindcss/vite']}`, '--no-fund', '--no-audit'])
  await write('src/app.css', `@import "tailwindcss";\n@import "rillmark/tailwind.css";\n${layoutCss}\n`)
  await write('vite.config.ts', 'import { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\nimport tailwindcss from "@tailwindcss/vite"\nexport default defineConfig({ plugins: [react(), tailwindcss()] })\n')
  await verify('tailwind')
  await fs.copyFile(path.join(scratch, pack.filename), result.tarball)
  await fs.writeFile(path.join(artifacts, 'report.json'), json(result))
  console.log(json(result))
} finally {
  await browser.close()
}
