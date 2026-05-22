import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

// Exercises the public consumer contract. Nothing is linked from this repository
// into the generated application; the official CLI fetches all component source.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const consumer = await fs.mkdtemp(path.join(os.tmpdir(), 'rillmark-consumer-'))
const manifest = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'))
const lock = JSON.parse(await fs.readFile(path.join(root, 'package-lock.json'), 'utf8'))
const cli = path.join(root, 'node_modules/shadcn/dist/index.js')
const steps = []
let server
const write = async (file, text) => {
  const target = path.join(consumer, file)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, typeof text === 'string' ? text : JSON.stringify(text, null, 2) + '\n')
}
const pinned = (names) => Object.fromEntries(names.map((name) => [name, lock.packages[`node_modules/${name}`]?.version ?? manifest.dependencies?.[name] ?? manifest.devDependencies[name]]))

async function run(label, command, args, cwd = consumer) {
  console.log(`\n[consumer] ${label}`)
  const start = Date.now()
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd, stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, CI: 'true', DISABLE_TELEMETRY: '1', npm_config_audit: 'false', npm_config_fund: 'false' },
    })
    const timeout = setTimeout(() => { child.kill('SIGTERM'); reject(new Error(`${label} timed out after five minutes`)) }, 300_000)
    child.stdout.on('data', (chunk) => process.stdout.write(chunk))
    child.stderr.on('data', (chunk) => process.stderr.write(chunk))
    child.once('error', (error) => { clearTimeout(timeout); reject(error) })
    child.once('exit', (code) => {
      clearTimeout(timeout)
      if (code === 0) { steps.push({ label, elapsedMs: Date.now() - start }); resolve() }
      else reject(new Error(`${label} exited with code ${code}`))
    })
  })
}

try {
  console.log(`[consumer] Clean project: ${consumer}`)
  await run('Build the public registry', 'npm', ['run', 'registry:build'], root)
  const registry = JSON.parse(await fs.readFile(path.join(root, 'public/r/registry.json'), 'utf8'))
  const componentNames = registry.items.filter((item) => item.type === 'registry:ui').map((item) => item.name)
  const exampleNames = componentNames.map((name) => `${name}-demo`)
  for (const name of exampleNames) assert(registry.items.some((item) => item.name === name), `Missing installable example: ${name}`)

  await write('package.json', {
    name: 'rillmark-clean-consumer', version: '0.0.0', private: true, type: 'module',
    scripts: { dev: 'vite --host 127.0.0.1', build: 'tsc --noEmit && vite build', preview: 'vite preview --host 127.0.0.1' },
    dependencies: pinned(['react', 'react-dom']),
    devDependencies: pinned(['typescript', '@types/react', '@types/react-dom', '@types/node', 'vite', '@vitejs/plugin-react', 'tailwindcss', '@tailwindcss/vite']),
  })
  await write('index.html', '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rillmark consumer verification</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n')
  await write('tsconfig.json', { compilerOptions: {
    target: 'ES2022', lib: ['ES2022', 'DOM', 'DOM.Iterable'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx',
    strict: true, skipLibCheck: true, esModuleInterop: true, isolatedModules: true, noEmit: true,
    types: ['vite/client', 'node'], paths: { '@/*': ['./src/*'] },
  }, include: ['src', 'vite.config.ts'] })
  await write('vite.config.ts', `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/vite'\nimport { fileURLToPath, URL } from 'node:url'\nexport default defineConfig({ plugins: [react(), tailwindcss()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } })\n`)
  await write('src/index.css', '@import "tailwindcss";\n')
  await write('src/main.tsx', `import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport App from './App'\nimport './index.css'\ncreateRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)\n`)
  await write('src/App.tsx', 'export default function App() { return <main>Preparing the consumer test.</main> }\n')
  await run('Install clean React, TypeScript, Vite and Tailwind dependencies', 'npm', ['install', '--no-audit', '--no-fund', '--prefer-offline'])

  server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
      const publicRoot = path.join(root, 'public')
      const file = path.resolve(publicRoot, `.${pathname}`)
      if (!file.startsWith(publicRoot + path.sep)) { response.writeHead(403); response.end(); return }
      const body = await fs.readFile(file)
      response.writeHead(200, { 'Content-Type': file.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
      response.end(body)
    } catch { response.writeHead(404); response.end('Not found') }
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
  const origin = `http://127.0.0.1:${server.address().port}`

  await run('Initialize with the official shadcn CLI', process.execPath, [cli, 'init', '--base', 'radix', '--template', 'vite', '--preset', 'nova', '--no-monorepo', '--no-rtl', '--yes'])
  const config = JSON.parse(await fs.readFile(path.join(consumer, 'components.json'), 'utf8'))
  const starterUtils = await fs.readFile(path.join(consumer, 'src/lib/utils.ts'), 'utf8')
  config.registries = { ...config.registries, '@rillmark': `${origin}/r/{name}.json` }
  await write('components.json', config)
  await run('Discover the configured registry', process.execPath, [cli, 'search', '@rillmark', '--query', 'button'])
  // Theme installation is intentionally explicit. shadcn preserves existing CSS
  // variables when a theme is only a transitive dependency of an installed UI item.
  await run('Apply Rillmark foundations once', process.execPath, [cli, 'add', '@rillmark/theme', '--yes'])
  // A fresh shadcn init creates its own Button. Replace that known starter once;
  // the remaining registry installation must work without overwrite permission.
  await run('Replace only the known starter Button', process.execPath, [cli, 'add', '@rillmark/button', '--yes', '--overwrite'])
  await run(`Install all ${exampleNames.length} examples without blanket overwrite`, process.execPath, [cli, 'add', ...exampleNames.map((name) => `@rillmark/${name}`), '--yes'])

  const installed = await fs.readdir(path.join(consumer, 'src/components/ui'))
  for (const name of componentNames) assert(installed.includes(`${name}.tsx`), `CLI did not install ${name}.tsx`)
  for (const name of exampleNames) await fs.access(path.join(consumer, `src/components/examples/${name}.tsx`))
  await fs.access(path.join(consumer, 'src/lib/rillmark-utils.ts'))
  assert.equal(await fs.readFile(path.join(consumer, 'src/lib/utils.ts'), 'utf8'), starterUtils, 'Rillmark changed the consumer’s existing shared utility')
  assert(!(await fs.lstat(path.join(consumer, 'node_modules'))).isSymbolicLink(), 'Consumer node_modules must be its own install')
  assert(!(await fs.realpath(path.join(consumer, 'node_modules'))).startsWith(root), 'Consumer dependencies resolve into source repository')
  const css = await fs.readFile(path.join(consumer, config.tailwind.css), 'utf8')
  const tokens = JSON.parse(await fs.readFile(path.join(root, 'tokens.json'), 'utf8'))
  for (const mode of ['light', 'dark']) {
    for (const [token, value] of Object.entries(tokens[mode])) {
      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      assert(new RegExp(`--${token}:\\s*${escaped}`, 'i').test(css), `Missing ${mode} token ${token}: ${value}`)
    }
  }
  assert(css.includes('@keyframes rm-enter') && css.includes('@keyframes rm-exit'), 'Rillmark motion keyframes were not installed')
  assert(css.includes('prefers-reduced-motion'), 'Reduced-motion rules were not installed')
  assert(css.includes('--color-primary: var(--primary)'), 'Semantic Tailwind colors were not installed')

  const customPrimary = '#123456'
  const customizedCss = css.replace(new RegExp(`(--primary:\\s*)${tokens.light.primary}`, 'i'), `$1${customPrimary}`)
  assert.notEqual(customizedCss, css, 'Could not create the local customization fixture')
  await write(config.tailwind.css, customizedCss)
  await run('Reinstall a component without resetting local token customization', process.execPath, [cli, 'add', '@rillmark/button', '--yes', '--overwrite'])
  assert((await fs.readFile(path.join(consumer, config.tailwind.css), 'utf8')).includes(customPrimary), 'A component reinstall reset the consumer’s customized primary token')
  // Leave the inspection fixture in the canonical theme after proving ownership.
  await write(config.tailwind.css, css)

  await write('src/App.tsx', `${exampleNames.map((name, index) => `import Demo${index} from '@/components/examples/${name}'`).join('\n')}\n\nexport default function App() { return <main className="mx-auto max-w-5xl space-y-8 px-5 py-10"><h1 className="text-3xl font-semibold">Rillmark consumer verification</h1><p>Every example below was installed by the shadcn CLI.</p>${componentNames.map((name, index) => `<section className="rounded-2xl border bg-card p-6"><h2 className="mb-5 text-xl font-semibold">${name}</h2><Demo${index} /></section>`).join('')}</main> }\n`)
  await run('Typecheck and production-build every installed example', 'npm', ['run', 'build'])
  const assets = await fs.readdir(path.join(consumer, 'dist/assets'))
  const builtCss = (await Promise.all(assets.filter((name) => name.endsWith('.css')).map((name) => fs.readFile(path.join(consumer, 'dist/assets', name), 'utf8')))).join('\n')
  assert(builtCss.includes('--primary:') && builtCss.includes('--background:') && builtCss.includes('.bg-primary'), 'Production CSS did not include the installed theme and component utilities')

  const result = { status: 'passed', consumer, shadcn: lock.packages['node_modules/shadcn'].version, components: componentNames.length, examples: exampleNames.length, steps, finishedAt: new Date().toISOString() }
  await write('verification.json', result)
  await fs.writeFile(path.join(os.tmpdir(), 'rillmark-consumer-last.json'), JSON.stringify(result, null, 2) + '\n')
  console.log(`\n[consumer] PASS: ${componentNames.length} components, ${exampleNames.length} examples, real CLI installation, semantic themes, reduced motion, TypeScript and production build.\n[consumer] Kept for inspection: ${consumer}`)
} catch (error) {
  await write('verification.json', { status: 'failed', consumer, steps, error: String(error) })
  console.error(`\n[consumer] FAIL. Inspect ${consumer}\n${error.stack ?? error}`)
  process.exitCode = 1
} finally {
  if (server?.listening) await new Promise((resolve) => server.close(resolve))
}
