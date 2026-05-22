import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'
import docgen from 'react-docgen-typescript'
import { descriptions, title } from './catalog.mjs'

const root = process.cwd()
const write = async (file, content) => { await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, content) }
const json = (data) => JSON.stringify(data, null, 2) + '\n'
const tokens = JSON.parse(await fs.readFile('tokens.json', 'utf8'))
const colors = Object.keys(tokens.light).filter((key) => key !== 'radius')
const theme = { ...Object.fromEntries(colors.map((key) => [`color-${key}`, `var(--${key})`])), ...tokens.theme }
const css = {
  '@layer base': {
    '*': { 'border-color': 'var(--border)' },
    body: { 'background-color': 'var(--background)', color: 'var(--foreground)', 'font-family': 'var(--font-sans)', 'font-feature-settings': '"ss01"' },
    '.dark': { 'color-scheme': 'dark' },
    '::selection': { 'background-color': 'var(--secondary)', color: 'var(--secondary-foreground)' },
  },
  '@keyframes rm-enter': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
  '@keyframes rm-exit': { from: { opacity: '1' }, to: { opacity: '0' } },
  '@media (prefers-reduced-motion: reduce)': { '*, *::before, *::after': { 'animation-duration': '0.01ms !important', 'animation-iteration-count': '1 !important', 'transition-duration': '0.01ms !important', 'scroll-behavior': 'auto !important' } },
}
function cssText(object, indent = '') {
  return Object.entries(object).map(([key, value]) => typeof value === 'object' ? `${indent}${key} {\n${cssText(value, indent + '  ')}\n${indent}}` : `${indent}${key}: ${value};`).join('\n')
}
const declarations = (object) => Object.fromEntries(Object.entries(object).map(([key, value]) => [`--${key}`, value]))
await write('src/generated/theme.css', `/* Generated from tokens.json. Run npm run generate. */\n@custom-variant dark (&:is(.dark *));\n${cssText({ '@theme inline': declarations(theme), ':root': declarations(tokens.light), '.dark': declarations(tokens.dark), ...css })}\n`)

const files = (await fs.readdir('registry/rillmark/ui')).filter((file) => file.endsWith('.tsx')).sort()
const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
const dependenciesFor = (source) => {
  const imports = [...source.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((match) => match[1])
  const external = [...new Set(imports.filter((name) => !name.startsWith('.') && !name.startsWith('@/') && name !== 'react'))]
  const internal = [...new Set(imports.filter((name) => name.startsWith('@/components/ui/')).map((name) => `@rillmark/${name.split('/').at(-1)}`))]
  return { dependencies: external.map((name) => `${name}@${packageJson.dependencies[name] ?? '*'}`), registryDependencies: [...new Set(['@rillmark/theme', '@rillmark/utils', ...internal])] }
}
const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'rillmark', homepage: 'http://localhost:5173',
  items: [
    { name: 'theme', title: 'Rillmark foundations', type: 'registry:style', description: 'Fieldnotes tokens, light and dark, motion and base styles.', cssVars: { ...tokens, theme }, css },
    { name: 'utils', type: 'registry:lib', dependencies: ['clsx@^2.1.1', 'tailwind-merge@^3.7.0'], files: [{ path: 'registry/rillmark/lib/rillmark-utils.ts', type: 'registry:lib' }] },
  ],
}
const parser = docgen.withCustomConfig(path.join(root, 'tsconfig.json'), { shouldExtractLiteralValuesFromEnum: true, shouldRemoveUndefinedFromOptional: true, propFilter: (prop) => !prop.parent || !prop.parent.fileName.includes('node_modules') })
const metadata = []
for (const file of files) {
  const name = file.replace('.tsx', '')
  const sourcePath = `registry/rillmark/ui/${file}`
  const source = await fs.readFile(sourcePath, 'utf8')
  const [category, description, guidance] = descriptions[name] ?? ['Components', title(name), 'Use standard native and Radix props.']
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const exports = parsed.statements.flatMap((statement) => {
    if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return []
    if (ts.isFunctionDeclaration(statement)) return statement.name ? [statement.name.text] : []
    if (ts.isVariableStatement(statement)) return statement.declarationList.declarations.map((d) => d.name.getText(parsed))
    return []
  })
  const api = parser.parse(path.join(root, sourcePath)).filter((entry) => exports.includes(entry.displayName)).map((entry) => ({ name: entry.displayName, description: entry.description, props: Object.values(entry.props).map((prop) => ({ name: prop.name, type: prop.type.name === 'enum' ? prop.type.value.map((v) => v.value).join(' | ') : prop.type.name, required: prop.required, description: prop.description, default: prop.defaultValue?.value })) }))
  let example = ''
  try { example = await fs.readFile(`registry/rillmark/examples/${name}-demo.tsx`, 'utf8') } catch { /* Demos are completed in the next authoring step; validate requires them. */ }
  const deps = dependenciesFor(source)
  registry.items.push({ name, title: title(name), type: 'registry:ui', description, ...deps, files: [{ path: sourcePath, type: 'registry:ui' }] })
  if (example) registry.items.push({ name: `${name}-demo`, title: `${title(name)} example`, type: 'registry:example', description: `Working ${title(name)} example.`, ...dependenciesFor(example), files: [{ path: `registry/rillmark/examples/${name}-demo.tsx`, type: 'registry:component', target: `@components/examples/${name}-demo.tsx` }] })
  metadata.push({ name, title: title(name), category, description, guidance, exports, api, dependencies: deps.dependencies, example, source })
  const props = api.flatMap((entry) => entry.props.map((prop) => `| ${entry.name}.${prop.name} | \`${prop.type.replaceAll('|', '\\|')}\` | ${prop.required ? 'Required' : prop.default ?? 'Optional'} | ${prop.description.replaceAll('\n', ' ')} |`))
  await write(`public/docs/components/${name}.md`, `# ${title(name)}\n\n${description}\n\n${guidance}\n\n## Install\n\nFirst follow [setup](../getting-started.md). Then:\n\n\`\`\`sh\nnpx shadcn@latest add @rillmark/${name}\n\`\`\`\n\n${deps.dependencies.length ? `Runtime dependencies: ${deps.dependencies.join(', ')}. ` : ''}Theme and local source dependencies install automatically. React is supplied by your application.\n\n## Working example\n\n\`\`\`tsx\n${example}\n\`\`\`\n\n## API\n\nExports (generated from TypeScript): ${exports.map((name) => `\`${name}\``).join(', ')}. Native element and underlying Radix props are forwarded.\n\n${props.length ? `Locally declared props (generated):\n\n| Component.prop | Type | Requirement/default | Description |\n|---|---|---|---|\n${props.join('\n')}\n` : 'Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.\n'}\n[Editable source](../../source/${file}) · [Registry item](../../r/${name}.json)\n`)
  await write(`public/source/${file}`, source)
}
await write('registry.json', json(registry))
await write('public/r/registry.json', json(registry))
await write('src/generated/catalog.json', json(metadata.map((entry) => Object.fromEntries(Object.entries(entry).filter(([key]) => key !== 'source')))))
await write('public/api.json', json(metadata.map((entry) => Object.fromEntries(Object.entries(entry).filter(([key]) => key !== 'source' && key !== 'example')))))
for (const file of await fs.readdir('docs/guides')) {
  if (!file.endsWith('.md')) continue
  const guide = await fs.readFile(`docs/guides/${file}`, 'utf8')
  await write(`public/docs/${file}`, guide)
  for (const [index, block] of [...guide.matchAll(/```tsx\n([\s\S]*?)```/g)].entries()) {
    await write(`src/generated/doc-examples/${file.replace('.md', '')}-${index}.tsx`, block[1])
  }
}
await write('public/llms.txt', `# Rillmark\n\n> Expressive React components. Editable source, Tailwind CSS 4, Radix primitives. Install individual items with the official shadcn CLI. No Rillmark runtime.\n\n## Start here\n\n- [Setup and install](./docs/getting-started.md): use this first; includes local serving and namespace configuration.\n- [Foundations](./docs/foundations.md): tokens, dark mode, customization and accessibility.\n- [AI setup](./docs/ai.md): consuming skill, shadcn MCP, progressive discovery.\n- [Registry](./r/registry.json): searchable catalog.\n- [Generated API](./api.json): exports and locally declared props from implementation.\n\n## Components\n\n${metadata.map((entry) => `- [${entry.title}](./docs/components/${entry.name}.md): ${entry.description}`).join('\n')}\n\nRead only the relevant component pages. Their examples compile as part of the site. Local edits are yours; use className and semantic CSS variables before adding variants.\n`)
console.log(`Generated tokens, registry and focused documentation for ${metadata.length} components.`)
