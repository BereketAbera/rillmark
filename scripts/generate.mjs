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

const files = (await fs.readdir('packages/rillmark/src/ui')).filter((file) => file.endsWith('.tsx')).sort()
const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'))
const dependenciesFor = (source) => {
  const imports = [...source.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((match) => match[1])
  const external = [...new Set(imports.filter((name) => !name.startsWith('.') && !name.startsWith('@/') && name !== 'react'))]
  return external.map((name) => `${name}@${packageJson.dependencies[name] ?? '*'}`)
}
const parser = docgen.withCustomConfig(path.join(root, 'tsconfig.json'), { shouldExtractLiteralValuesFromEnum: true, shouldRemoveUndefinedFromOptional: true, propFilter: (prop) => !prop.parent || !prop.parent.fileName.includes('node_modules') })
const metadata = []
for (const file of files) {
  const name = file.replace('.tsx', '')
  const sourcePath = `packages/rillmark/src/ui/${file}`
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
  try { example = await fs.readFile(`examples/components/${name}-demo.tsx`, 'utf8') } catch { /* Demos are completed in the next authoring step; validate requires them. */ }
  const deps = dependenciesFor(source)
  metadata.push({ name, title: title(name), category, description, guidance, exports, api, dependencies: deps, example, source })
  const props = api.flatMap((entry) => entry.props.map((prop) => `| ${entry.name}.${prop.name} | \`${prop.type.replaceAll('|', '\\|')}\` | ${prop.required ? 'Required' : prop.default ?? 'Optional'} | ${prop.description.replaceAll('\n', ' ')} |`))
  await write(`public/docs/components/${name}.md`, `# ${title(name)}\n\n${description}\n\n${guidance}\n\n## Install\n\nFirst follow [setup](../getting-started.md). Install the package once:\n\n\`\`\`sh\nnpm install rillmark\n\`\`\`\n\nImport components from \`rillmark/${name}\`. Load \`rillmark/styles.css\` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.\n\n## Working example\n\n\`\`\`tsx\n${example}\n\`\`\`\n\n## API\n\nExports (generated from TypeScript): ${exports.map((name) => `\`${name}\``).join(', ')}. Native element and underlying Radix props are forwarded.\n\n${props.length ? `Locally declared props (generated):\n\n| Component.prop | Type | Requirement/default | Description |\n|---|---|---|---|\n${props.join('\n')}\n` : 'Use the underlying native element or Radix primitive props shown in the example. No additional configuration is required.\n'}\n[Readable source](../../source/${file})\n`)
  await write(`public/source/${file}`, source)
}
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
await write('public/llms.txt', `# Rillmark\n\n> An independent React 19 design system. Install rillmark from npm. Original components and tokens, Radix primitives, precompiled CSS or Tailwind CSS 4 integration.\n\n## Start here\n\n- [Setup and install](./docs/getting-started.md): use this first; package installation, styles, imports and React compatibility.\n- [Foundations](./docs/foundations.md): tokens, dark mode, customization and accessibility.\n- [AI setup](./docs/ai.md): installable consuming skill and progressive discovery.\n- [Generated API](./api.json): exports and locally declared props from implementation.\n\n## Components\n\n${metadata.map((entry) => `- [${entry.title}](./docs/components/${entry.name}.md): ${entry.description}`).join('\n')}\n\nRead only the relevant component pages. Their examples compile as part of the site. Use className and semantic CSS variables for customization. Full readable component source is linked from each page.\n`)
console.log(`Generated tokens, API metadata and focused documentation for ${metadata.length} components.`)
