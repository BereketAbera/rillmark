import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = path.join(root, 'packages/rillmark')
const outDir = path.join(packageDir, 'dist')
const run = (binary, args) => {
  const result = spawnSync(path.join(root, 'node_modules/.bin', binary), args, { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${binary} exited with ${result.status}`)
}

// The package source remains canonical. Distribution files are generated here.
await fs.rm(outDir, { recursive: true, force: true })
run('tsc', ['--project', 'packages/rillmark/tsconfig.build.json'])
run('tsc-alias', ['--project', 'packages/rillmark/tsconfig.build.json', '--resolve-full-paths', '--resolve-full-extension', '.js'])
run('tailwindcss', ['--input', 'packages/rillmark/styles.entry.css', '--output', 'packages/rillmark/dist/styles.css', '--minify'])

const names = (await fs.readdir(path.join(packageDir, 'src/ui'))).filter((file) => file.endsWith('.tsx')).map((file) => file.slice(0, -4)).sort()
const barrel = names.map((name) => `export * from './ui/${name}.js'`).join('\n') + '\n'
await Promise.all([
  fs.writeFile(path.join(outDir, 'index.js'), barrel),
  fs.writeFile(path.join(outDir, 'index.d.ts'), barrel),
  fs.copyFile(path.join(root, 'src/generated/theme.css'), path.join(outDir, 'theme.css')),
  fs.copyFile(path.join(root, 'tokens.json'), path.join(outDir, 'tokens.json')),
  fs.copyFile(path.join(root, 'LICENSE'), path.join(packageDir, 'LICENSE')),
  fs.cp(path.join(root, 'skills/rillmark'), path.join(packageDir, 'skills/rillmark'), { recursive: true }),
])

// Fail before packaging if emitted imports still require this repository's aliases.
for (const folder of ['ui', 'lib']) {
  for (const file of await fs.readdir(path.join(outDir, folder))) {
    const source = await fs.readFile(path.join(outDir, folder, file), 'utf8')
    if (/['"]@\//.test(source)) throw new Error(`Unresolved repository alias in ${folder}/${file}`)
    const canonical = path.join(packageDir, 'src', folder, file.replace(/\.d\.ts$|\.js$/, folder === 'ui' ? '.tsx' : '.ts'))
    if (file.endsWith('.js') && (await fs.readFile(canonical, 'utf8')).startsWith('"use client"') && !source.startsWith('"use client"')) throw new Error(`Missing client boundary in ${file}`)
  }
}
console.log(`Built rillmark package from ${names.length} canonical components.`)
