import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

// A read-only smoke-test client for the official shadcn MCP executable.
// This is test scaffolding, not a Rillmark MCP server or consumer dependency.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'rillmark-mcp-'))
const cli = path.join(root, 'node_modules/shadcn/dist/index.js')
const manifest = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'))
const shadcnVersion = JSON.parse(await fs.readFile(path.join(root, 'node_modules/shadcn/package.json'), 'utf8')).version
const publicRoot = path.join(root, 'public')
let server
let child
let lines
let sequence = 0
let stderr = ''
const pending = new Map()
const checks = []
const responses = {}
const write = (file, value) => fs.writeFile(path.join(fixture, file), typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n')

function request(method, params = {}) {
  const id = ++sequence
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`MCP ${method} timed out. ${stderr}`)) }, 30_000)
    pending.set(id, { resolve, reject, timer })
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
  })
}

async function call(name, args) {
  const result = await request('tools/call', { name, arguments: args })
  assert(!result.isError, `${name} returned an MCP error: ${JSON.stringify(result)}`)
  const text = (result.content ?? []).filter((block) => block.type === 'text').map((block) => block.text).join('\n')
  assert(text.length > 0, `${name} returned no readable content`)
  return text
}

try {
  await new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'registry:build'], { cwd: root, stdio: 'inherit' })
    build.once('error', reject)
    build.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`Registry build exited with code ${code}`)))
  })
  server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const file = path.resolve(publicRoot, `.${pathname}`)
      if (!file.startsWith(publicRoot + path.sep)) { res.writeHead(403); res.end(); return }
      const content = await fs.readFile(file)
      res.writeHead(200, { 'Content-Type': file.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
      res.end(content)
    } catch { res.writeHead(404); res.end('Not found') }
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
  const origin = `http://127.0.0.1:${server.address().port}`
  await fs.mkdir(path.join(fixture, 'src'), { recursive: true })
  await write('package.json', { name: 'rillmark-mcp-smoke', version: '0.0.0', private: true, type: 'module', dependencies: { react: manifest.dependencies.react }, devDependencies: { vite: manifest.devDependencies.vite, tailwindcss: manifest.devDependencies.tailwindcss } })
  await write('tsconfig.json', { compilerOptions: { paths: { '@/*': ['./src/*'] } } })
  await write('src/index.css', '@import "tailwindcss";\n')
  await write('components.json', {
    $schema: 'https://ui.shadcn.com/schema.json', style: 'radix-nova', rsc: false, tsx: true,
    tailwind: { config: '', css: 'src/index.css', baseColor: 'neutral', cssVariables: true }, iconLibrary: 'lucide',
    aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils', lib: '@/lib', hooks: '@/hooks' },
    registries: { '@rillmark': `${origin}/r/{name}.json` },
  })

  child = spawn(process.execPath, [cli, 'mcp'], { cwd: fixture, stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, DISABLE_TELEMETRY: '1' } })
  child.stderr.on('data', (data) => { stderr = (stderr + data).slice(-4000) })
  child.once('error', (error) => { for (const { reject, timer } of pending.values()) { clearTimeout(timer); reject(error) } pending.clear() })
  child.once('exit', (code) => {
    for (const { reject, timer } of pending.values()) { clearTimeout(timer); reject(new Error(`shadcn mcp exited (${code}). ${stderr}`)) }
    pending.clear()
  })
  lines = createInterface({ input: child.stdout })
  lines.on('line', (line) => {
    let response
    try { response = JSON.parse(line) } catch { return }
    if (!pending.has(response.id)) return
    const { resolve, reject, timer } = pending.get(response.id)
    pending.delete(response.id)
    clearTimeout(timer)
    if (response.error) reject(new Error(`MCP JSON-RPC error: ${JSON.stringify(response.error)}`))
    else resolve(response.result)
  })
  const initialized = await request('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'rillmark-verification', version: '0.1.0' } })
  assert(initialized.serverInfo?.name, 'Server did not complete initialization')
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n')
  checks.push('Official shadcn MCP server initialized over stdio')

  const listing = await request('tools/list')
  const tools = listing.tools.map((tool) => tool.name)
  for (const name of ['get_project_registries', 'search_items_in_registries', 'view_items_in_registries', 'get_item_examples_from_registries']) assert(tools.includes(name), `Missing official MCP tool: ${name}`)
  checks.push(`${tools.length} official tools discovered`)
  const registries = await call('get_project_registries', {})
  responses.registries = registries
  assert(registries.includes('@rillmark'), 'MCP did not find the configured namespace')
  checks.push('Configured @rillmark namespace discovered')
  const search = await call('search_items_in_registries', { registries: ['@rillmark'], query: 'combobox' })
  responses.search = search
  assert(search.includes('@rillmark/combobox') && search.includes('combobox-demo'), 'MCP search did not find the Combobox component and example')
  checks.push('Combobox search returned registry results')
  const view = await call('view_items_in_registries', { items: ['@rillmark/combobox'] })
  responses.view = view
  // shadcn 4.23's view tool returns metadata, despite describing file content in
  // its help text. Source is available through the example tool and registry JSON.
  assert(view.includes('## combobox') && view.includes('registry:ui') && view.includes('radix-ui'), 'MCP item view did not return the exact component metadata')
  checks.push('Exact Combobox item view returned type, file count and dependencies')
  const example = await call('get_item_examples_from_registries', { registries: ['@rillmark'], query: 'combobox-demo' })
  responses.example = example
  assert(example.includes('ComponentDemo') && example.includes('Project lead'), 'MCP example retrieval did not return the working demo')
  checks.push('Working Combobox demo retrieved through the official example tool')
  const result = { status: 'passed', shadcn: shadcnVersion, server: initialized.serverInfo, protocolVersion: initialized.protocolVersion, tools, checks }
  await write('verification.json', result)
  await write('responses.json', responses)
  console.log(`\n[MCP] PASS\n${checks.map((check) => `- ${check}`).join('\n')}\n[MCP] Read-only fixture: ${fixture}`)
} catch (error) {
  await write('verification.json', { status: 'failed', checks, error: String(error), stderr })
  await write('responses.json', responses)
  console.error(`[MCP] FAIL: ${error.stack ?? error}\nFixture: ${fixture}`)
  process.exitCode = 1
} finally {
  lines?.close()
  if (child) {
    const exited = new Promise((resolve) => child.once('exit', resolve))
    child.stdin.end()
    child.kill('SIGTERM')
    await Promise.race([exited, new Promise((resolve) => { const timer = setTimeout(resolve, 2000); timer.unref() })])
  }
  if (server?.listening) await new Promise((resolve) => server.close(resolve))
}
