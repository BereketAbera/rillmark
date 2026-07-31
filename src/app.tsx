import * as React from 'react'
import { ArrowDownRight, ArrowRight, Check, CheckCheck, CheckCircle2, ChevronRight, Code2, Copy, ExternalLink, Layers2, Menu, Moon, Palette, Search, Sparkles, Sun, Terminal, X } from 'lucide-react'
const ReactMarkdown = React.lazy(() => import('react-markdown'))
import catalogData from './generated/catalog.json'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { Badge } from '@/components/ui/badge'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { cn } from '@/lib/rillmark-utils'
import { ThemePage, PresetSection, presets, type Preset, type Appearance } from './themes'

type ApiProp = { name: string; type: string; required: boolean; description: string; default?: string }
type ComponentInfo = { name: string; title: string; category: string; description: string; guidance: string; exports: string[]; dependencies: string[]; example: string; api: { name: string; description: string; props: ApiProp[] }[] }
const catalog = catalogData as ComponentInfo[]
const demos = import.meta.glob('../examples/components/*-demo.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>
const demoCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>()
const guides = import.meta.glob('../docs/guides/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>
const Dashboard = React.lazy(() => import('./examples/dashboard'))
const Settings = React.lazy(() => import('./examples/settings'))
const Discovery = React.lazy(() => import('./examples/discovery'))
const Onboarding = React.lazy(() => import('./examples/onboarding'))
const Activity = React.lazy(() => import('./examples/activity'))
const categories = ['Actions', 'Forms', 'Structure', 'Overlays', 'Feedback', 'Patterns']
const guideNames: Record<string, string> = { 'getting-started': 'Installation', foundations: 'Foundations', themes: 'Theme guide', ai: 'For your agent' }

function Mark({ small = false }: { small?: boolean }) { return <span className={cn('brand-mark', small && 'brand-mark-small')} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5h6c6 0 7 7 1 9l7 5h-5l-5-5v5zm4-10v2h2c2 0 2-2 0-2z" fill="currentColor"/></svg></span> }

function CopyButton({ value, label = 'Copy code' }: { value: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  return <button type="button" className="copy-button" aria-label={copied ? 'Copied' : failed ? 'Copy failed; select the code manually' : label} onClick={async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); setFailed(false); setTimeout(() => setCopied(false), 1800) } catch { setFailed(true) }
  }}>{copied ? <Check size={15}/> : <Copy size={15}/>}<span>{copied ? 'Copied' : failed ? 'Select to copy' : 'Copy'}</span></button>
}

function CodeBlock({ code, label = 'Terminal' }: { code: string; label?: string }) {
  return <div className="code-block"><div className="code-bar"><span><Terminal size={14}/>{label}</span><CopyButton value={code}/></div><pre tabIndex={0}><code>{code.trim()}</code></pre></div>
}

function LiveDemo({ name }: { name: string }) {
  let Component = demoCache.get(name)
  const importer = demos[`../examples/components/${name}-demo.tsx`]
  if (!importer) return <p>Example unavailable.</p>
  if (!Component) { Component = React.lazy(importer); demoCache.set(name, Component) }
  return <React.Suspense fallback={<p role="status" className="text-sm text-muted-foreground">Loading example…</p>}><Component/></React.Suspense>
}

function Sidebar({ route, onNavigate }: { route: string; onNavigate: () => void }) {
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement).tagName
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) && !(event.target as HTMLElement).isContentEditable) { event.preventDefault(); inputRef.current?.focus() }
    }
    window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle)
  }, [])
  const filtered = catalog.filter((item) => `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="sidebar-inner">
    <div className="sidebar-search"><Search size={16} aria-hidden="true"/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search documentation" placeholder="Find a component…"/>{query ? <button aria-label="Clear search" onClick={() => setQuery('')}><X size={14}/></button> : <kbd>/</kbd>}</div>
    <nav aria-label="Documentation" onClick={(event) => { if ((event.target as HTMLElement).closest('a')) onNavigate() }}>
      {!query && <div className="nav-section"><span className="nav-section-label">GET STARTED</span><a href="#/" aria-current={route === '/' ? 'page' : undefined}><Layers2 size={15}/> Introduction</a>{Object.entries(guideNames).map(([key, title]) => <a key={key} href={`#/docs/${key}`} aria-current={route === `/docs/${key}` ? 'page' : undefined}>{key === 'ai' ? <Sparkles size={15}/> : <span className="nav-dot"/>}{title}{key === 'ai' && <span className="nav-new">AI</span>}</a>)}<a href="#/themes" aria-current={route === '/themes' ? 'page' : undefined}><Palette size={15}/> Visual presets <span className="nav-count">03</span></a><a href="#/examples/dashboard" aria-current={route.startsWith('/examples/') ? 'page' : undefined}><span className="nav-dot"/> Examples <span className="nav-count">05</span></a></div>}
      {categories.map((category) => { const items = filtered.filter((item) => item.category === category); return items.length > 0 && <div className="nav-section" key={category}><span className="nav-section-label">{category.toUpperCase()} <span>{items.length.toString().padStart(2, '0')}</span></span>{items.map((item) => <a key={item.name} href={`#/components/${item.name}`} aria-current={route === `/components/${item.name}` ? 'page' : undefined}>{item.title}{item.name === 'combobox' && <span className="nav-dot-end"/>}</a>)}</div> })}
      {filtered.length === 0 && <p className="no-search-results" role="status">No matching components. Try “form” or “dialog”.</p>}
    </nav>
    <div className="sidebar-note"><span className="tiny-cross">✳</span><span>Good defaults.<br/><strong>Readable source.</strong></span><a href="/llms.txt" aria-label="Open the AI documentation index"><ArrowDownRight size={18}/></a></div>
  </div>
}

function WorkCard() {
  const [checked, setChecked] = React.useState([true, false, false])
  const count = checked.filter(Boolean).length
  return <div className="work-card"><div className="work-card-heading"><span className="text-xs font-medium uppercase tracking-widest">Fieldwork / Studio</span><span className="live-dot"/></div><div className="mt-6 flex items-start justify-between gap-2"><div><h2 className="text-xl font-semibold tracking-tight">A good place to start.</h2><p className="mt-1 text-sm text-muted-foreground">Make room for your next idea.</p></div><Avatar><AvatarFallback>MA</AvatarFallback></Avatar></div><div className="work-tasks">{['Set the direction', 'Bring your team together', 'Make something meaningful'].map((task, index) => <label key={task} className={cn('work-task', checked[index] && 'work-task-complete')}><Checkbox checked={checked[index]} onCheckedChange={(value) => setChecked((items) => items.map((old, i) => i === index ? value === true : old))}/><span>{task}</span>{checked[index] && <span className="task-done">Done</span>}</label>)}</div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{count} of 3 steps complete</span><span>{Math.round(count / 3 * 100)}%</span></div><Progress value={count / 3 * 100} aria-label="Workspace setup" className="mt-3 h-1.5"/></div>
}

function Home({ preset, onPresetChange }: { preset: Preset; onPresetChange: (value: Preset) => void }) {
  return <div className="home-page">
    <div className="page-eyebrow"><span className="live-dot"/> MORE WAYS TO MAKE IT YOURS <span className="eyebrow-rule"/> 0.2</div>
    <section className="home-hero"><div className="hero-copy"><h1>Interfaces with<br/>a point of <em>view.</em></h1><p>Expressive components. Considered defaults.<br className="hidden sm:block"/> An independent React system, ready to make your own.</p><div className="hero-actions"><Button asChild><a href="#/docs/getting-started">Start building <ArrowRight/></a></Button><Button asChild variant="ghost"><a href="#/examples/dashboard">Explore the examples <ChevronRight/></a></Button></div><div className="hero-detail"><span><Check size={13}/> npm install rillmark</span><span><Check size={13}/> Built for agents</span><span><Check size={13}/> Radix inside</span></div></div><WorkCard/></section>
    <div className="principle-strip"><span><span className="strip-number">01</span> A little character.</span><span><span className="strip-number">02</span> A lot of capability.</span><span><span className="strip-number">03</span> Nothing in your way.</span></div>
    <PresetSection preset={preset} onPresetChange={onPresetChange}/>
    <section className="section-block"><div className="section-title"><div><span className="overline">THE BUILDING BLOCKS</span><h2>Small details. A shared language.</h2></div><a href="#/components/button" className="text-link">Browse components <ArrowRight size={15}/></a></div><div className="preview-grid"><div className="preview-tile"><div className="tile-label"><span>01 / Actions</span><ArrowDownRight size={16}/></div><div className="tile-live"><LiveDemo name="button"/></div><a href="#/components/button" className="tile-footer"><strong>A clear next step</strong><ChevronRight size={16}/></a></div><div className="preview-tile"><div className="tile-label"><span>02 / Forms</span><ArrowDownRight size={16}/></div><div className="tile-live"><Field label="Workspace name" description="A space for good work."><Input defaultValue="Fieldwork studio"/></Field></div><a href="#/components/field" className="tile-footer"><strong>Thoughtful by default</strong><ChevronRight size={16}/></a></div><div className="preview-tile preview-tile-accent"><div className="tile-label"><span>03 / Feedback</span><ArrowDownRight size={16}/></div><div className="tile-live"><div className="flex flex-col items-start gap-4"><div className="flex size-11 items-center justify-center rounded-xl bg-accent-foreground text-accent"><CheckCheck size={22}/></div><div><p className="text-lg font-medium">Everything in its place.</p><p className="mt-1 text-sm">A little clarity goes a long way.</p></div><div className="flex flex-wrap gap-2"><Badge>Ready to go</Badge><Badge variant="outline">In progress</Badge></div></div></div><a href="#/components/alert" className="tile-footer"><strong>Let the interface speak</strong><ChevronRight size={16}/></a></div></div></section>
    <section className="agent-band"><div className="agent-icon"><Code2 size={24}/></div><div><span className="overline">FOR YOU AND YOUR AGENT</span><h2>One short entry point. Endless starting points.</h2><p>Focused docs, compiling examples, and an installable skill for composing with Rillmark.</p></div><Button variant="outline" asChild><a href="#/docs/ai">Meet your next collaborator <ArrowRight/></a></Button></section>
    <section className="section-block"><div className="section-title"><div><span className="overline">BUILT FOR THE WHOLE PRODUCT</span><h2>From the everyday to the unexpected.</h2></div><span className="section-count">FIVE WORKING EXAMPLES</span></div><div className="example-links">{[{ name: 'dashboard', n: '01', title: 'Room for the details', description: 'A dense workspace. Search, filter, sort, and keep the work moving.', icon: <Layers2/> }, { name: 'settings', n: '02', title: 'Make yourself at home', description: 'A considered setup flow, with forms that help you get it right.', icon: <CheckCircle2/> }, { name: 'discovery', n: '03', title: 'Follow your curiosity', description: 'A more expressive space to explore, collect, and discover.', icon: <Sparkles/> }, { name: 'onboarding', n: '04', title: 'Start with a shared direction', description: 'A project brief, from the first details to a ready-to-share plan.', icon: <CheckCircle2/> }, { name: 'activity', n: '05', title: 'Keep up with the work', description: 'A team inbox with search, saved updates and keyboard commands.', icon: <CheckCheck/> }].map((item) => <a href={`#/examples/${item.name}`} className="example-link" key={item.name}><span className="example-link-top">{item.icon}<span>{item.n}</span></span><h3>{item.title}</h3><p>{item.description}</p><span className="example-link-cta">Open {item.name} <ArrowRight size={16}/></span></a>)}</div></section>
  </div>
}

function ComponentPage({ item }: { item: ComponentInfo }) {
  const [width, setWidth] = React.useState<'full' | 'mobile'>('full')
  return <article className="component-page"><div className="page-eyebrow">COMPONENTS <span>/</span> {item.category.toUpperCase()}</div><div className="component-heading"><div><h1>{item.title}</h1><p>{item.description}</p></div><Badge variant="outline">React + TypeScript</Badge></div><div className="component-demo"><Tabs defaultValue="preview"><div className="demo-toolbar"><TabsList aria-label={`${item.title} example view`}><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="source">Source</TabsTrigger></TabsList><div className="preview-widths" role="group" aria-label="Preview width"><button aria-pressed={width === 'full'} onClick={() => setWidth('full')}>Desktop</button><button aria-pressed={width === 'mobile'} onClick={() => setWidth('mobile')}>Mobile</button></div></div><TabsContent value="preview" className="m-0"><div className={cn('demo-stage', width === 'mobile' && 'demo-stage-mobile')}><LiveDemo name={item.name}/></div></TabsContent><TabsContent value="source" className="m-0"><CodeBlock code={item.example} label={`${item.name}-demo.tsx`}/></TabsContent></Tabs></div><div className="doc-section"><h2>Installation</h2><CodeBlock code="npm install rillmark"/><CodeBlock code={`import { ${item.exports.find((name) => /^[A-Z]/.test(name))} } from 'rillmark/${item.name}'\nimport 'rillmark/styles.css'`} label="TypeScript"/><p className="text-sm text-muted-foreground">Import the stylesheet once in your application entry point, then import the components you use. <a href="#/docs/getting-started" className="inline-link">Read the installation guide.</a></p></div><div className="doc-section"><h2>Good to know</h2><p className="leading-relaxed text-muted-foreground">{item.guidance}</p></div><div className="doc-section"><h2>Compose with confidence</h2><div className="export-list">{item.exports.filter((name) => /^[A-Z]/.test(name)).map((name) => <code key={name}>{name}</code>)}</div><p className="text-sm text-muted-foreground">Standard native and Radix props are forwarded. Customize with <code>className</code> and the semantic theme variables.</p>{item.api.filter((entry) => entry.props.length).map((entry) => <div key={entry.name} className="api-table-wrap"><h3>{entry.name}</h3><table className="api-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead><tbody>{entry.props.map((prop) => <tr key={prop.name}><td><code>{prop.name}</code>{prop.required && <span className="required-dot" title="Required">*</span>}{prop.description && <p>{prop.description}</p>}</td><td><code>{prop.type}</code></td><td>{prop.default ?? (prop.required ? 'Required' : '—')}</td></tr>)}</tbody></table></div>)}</div><div className="doc-source-links"><a href={`/docs/components/${item.name}.md`}>Read as Markdown <ExternalLink size={14}/></a><a href={`/source/${item.name}.tsx`}>Component source <ExternalLink size={14}/></a></div></article>
}

function GuidePage({ name }: { name: string }) {
  const content = guides[`../docs/guides/${name}.md`]
  if (!content) return <NotFound/>
  return <article className="guide-page"><div className="page-eyebrow">GET STARTED <span>/</span> {guideNames[name]?.toUpperCase()}</div><div className="markdown"><ReactMarkdown components={{ a: ({ href, children }) => <a href={href?.startsWith('./') && href.endsWith('.md') ? `#/docs/${href.slice(2, -3)}` : href}>{children}</a>, pre: ({ children }) => {
    const child = React.isValidElement<{ children?: React.ReactNode; className?: string }>(children) ? children : undefined
    return <CodeBlock code={String(child?.props.children ?? '')} label={child?.props.className?.replace('language-', '') ?? 'Code'}/>
  } }}>{content}</ReactMarkdown></div><a className="text-link mt-8" href={`/docs/${name}.md`}>Read as Markdown <ExternalLink size={15}/></a></article>
}

function NotFound() { return <div className="py-20"><h1 className="text-3xl font-semibold">This page has wandered off.</h1><p className="mt-4 text-muted-foreground">Use the component search, or start again.</p><Button asChild className="mt-6"><a href="#/">Back to the beginning</a></Button></div> }

export function App() {
  const [route, setRoute] = React.useState(() => window.location.hash.slice(1) || '/')
  const [menu, setMenu] = React.useState(false)
  const [preset, setPreset] = React.useState<Preset>(() => (document.documentElement.dataset.rillmarkPreset as Preset) || 'fieldnotes')
  const [appearance, setAppearance] = React.useState<Appearance>(() => (document.documentElement.dataset.rillmarkMode as Appearance) || 'system')
  const [systemDark, setSystemDark] = React.useState(() => matchMedia('(prefers-color-scheme: dark)').matches)
  const dark = appearance === 'dark' || (appearance === 'system' && systemDark)
  React.useEffect(() => { const media = matchMedia('(prefers-color-scheme: dark)'); const update = () => setSystemDark(media.matches); media.addEventListener('change', update); return () => media.removeEventListener('change', update) }, [])
  React.useEffect(() => {
    document.documentElement.dataset.rillmarkPreset = preset
    document.documentElement.dataset.rillmarkMode = appearance
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('rillmark-preset', preset); localStorage.setItem('rillmark-theme', appearance) } catch { /* Controls still work without persistence. */ }
  }, [preset, appearance, dark])
  React.useEffect(() => { const handle = () => { setRoute(window.location.hash.slice(1) || '/'); setMenu(false); window.scrollTo({ top: 0 }); requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true })) }; window.addEventListener('hashchange', handle); return () => window.removeEventListener('hashchange', handle) }, [])
  const parts = route.split('/').filter(Boolean)
  const item = parts[0] === 'components' ? catalog.find((entry) => entry.name === parts[1]) : undefined
  const isExample = parts[0] === 'examples'
  const pageTitle = item?.title ?? (route === '/themes' ? 'Visual presets' : parts[0] === 'docs' ? guideNames[parts[1]] : isExample ? 'Examples' : 'Introduction')
  React.useEffect(() => { document.title = `${pageTitle ?? 'Page'} — Rillmark` }, [pageTitle])
  function toggleTheme() { setAppearance(dark ? 'light' : 'dark') }
  return <TooltipProvider><a href="#main-content" className="skip-link" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a><header className="site-header"><div className="brand-area"><IconButton label="Open navigation" variant="ghost" className="mobile-menu-button" onClick={() => setMenu(true)}><Menu/></IconButton><a href="#/" className="brand"><Mark/><span>rillmark<span className="brand-period">.</span></span></a><span className="version-label">0.2</span></div><nav className="header-nav" aria-label="Primary"><a href="#/" aria-current={!isExample && route !== '/themes' ? 'page' : undefined}>Documentation</a><a href="#/examples/dashboard" aria-current={isExample ? 'page' : undefined}>Examples</a><a href="#/themes" aria-current={route === '/themes' ? 'page' : undefined}>Themes</a></nav><div className="header-actions"><label className="header-preset"><Palette size={15} aria-hidden="true"/><select aria-label="Visual preset" value={preset} onChange={(event) => setPreset(event.target.value as Preset)}>{presets.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><a className="header-resource-link" href="/llms.txt">Agent docs <ArrowDownRight size={15}/></a><span className="header-divider"/><Tooltip><TooltipTrigger asChild><IconButton label={dark ? 'Switch to light theme' : 'Switch to dark theme'} variant="ghost" onClick={toggleTheme}>{dark ? <Sun/> : <Moon/>}</IconButton></TooltipTrigger><TooltipContent>{dark ? 'Light' : 'Dark'} theme</TooltipContent></Tooltip></div></header><div className="site-layout"><aside className="desktop-sidebar"><Sidebar route={route} onNavigate={() => setMenu(false)}/></aside><Sheet open={menu} onOpenChange={setMenu}><SheetContent side="left" className="w-80 p-0 pt-8"><SheetTitle className="sr-only">Documentation navigation</SheetTitle><SheetDescription className="sr-only">Find a guide, component or example.</SheetDescription><Sidebar route={route} onNavigate={() => setMenu(false)}/></SheetContent></Sheet><main id="main-content" tabIndex={-1} className={cn('main-content', isExample && 'main-content-example')}><React.Suspense fallback={<p role="status" className="p-8">Opening the workspace…</p>}>{route === '/' ? <Home preset={preset} onPresetChange={setPreset}/> : route === '/themes' ? <ThemePage preset={preset} appearance={appearance} onPresetChange={setPreset} onAppearanceChange={setAppearance}/> : item ? <ComponentPage key={item.name} item={item}/> : parts[0] === 'docs' ? <GuidePage name={parts[1]}/> : route === '/examples/dashboard' ? <Dashboard/> : route === '/examples/settings' ? <Settings/> : route === '/examples/discovery' ? <Discovery/> : route === '/examples/onboarding' ? <Onboarding/> : route === '/examples/activity' ? <Activity/> : <NotFound/>}</React.Suspense><footer className="site-footer"><div><Mark small/><span>Made for thoughtful work.</span></div><span>React · Tailwind · Radix <span className="footer-dot">/</span> MIT licensed</span><a href="/llms.txt">llms.txt <ArrowDownRight size={13}/></a></footer></main></div></TooltipProvider>
}
