import * as React from 'react'
import { ArrowRight, Check, CheckCheck, Copy, Moon, Monitor, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import './themes.css'

export type Preset = 'fieldnotes' | 'studio' | 'play'
export type Appearance = 'light' | 'dark' | 'system'
export const presets: { id: Preset; name: string; description: string; detail: string }[] = [
  { id: 'fieldnotes', name: 'Fieldnotes', description: 'Warm. Editorial. Grounded.', detail: 'Mineral green, paper surfaces and a signature corner.' },
  { id: 'studio', name: 'Studio', description: 'Clear. Precise. Focused.', detail: 'Cool blue, crisp lines and a quicker response.' },
  { id: 'play', name: 'Play', description: 'Soft. Open. Spirited.', detail: 'Violet, generous curves and room for personality.' },
]
export interface ThemeSettings { preset: Preset; appearance: Appearance; onPresetChange: (value: Preset) => void; onAppearanceChange: (value: Appearance) => void }

export function PresetChooser({ preset, onPresetChange }: Pick<ThemeSettings, 'preset' | 'onPresetChange'>) {
  return <div className="preset-choices" role="group" aria-label="Choose a visual preset">
    {presets.map((item, index) => <button key={item.id} type="button" className="preset-choice" data-preview-preset={item.id} aria-pressed={preset === item.id} onClick={() => onPresetChange(item.id)}>
      <span className="preset-mini" aria-hidden="true"><span className="preset-mini-label">A SHARED DIRECTION <span>0{index + 1}</span></span><span className="preset-mini-title">Make it yours<span>.</span></span><span className="preset-mini-bottom"><span className="preset-mini-action">Start something <ArrowRight size={12}/></span><span className="preset-mini-dots"><i/><i/><i/></span></span></span>
      <span className="preset-choice-heading"><strong>{item.name}</strong><span className="preset-choice-check" aria-hidden="true">{preset === item.id && <Check size={15}/>}</span></span>
      <span className="preset-choice-description">{item.description}</span>
    </button>)}
  </div>
}

export function PresetSection(props: Pick<ThemeSettings, 'preset' | 'onPresetChange'>) {
  return <section className="section-block"><div className="section-title"><div><span className="overline">ONE SYSTEM. THREE POINTS OF VIEW.</span><h2>Find your kind of expressive.</h2></div><a href="#/themes" className="text-link">Explore presets <ArrowRight size={15}/></a></div><PresetChooser {...props}/><p className="preset-section-note">Try a preset. The whole site follows—components, examples and all.</p></section>
}

export function ThemePage({ preset, appearance, onPresetChange, onAppearanceChange }: ThemeSettings) {
  const [name, setName] = React.useState('A new direction')
  const [notify, setNotify] = React.useState(true)
  const [saved, setSaved] = React.useState(false)
  const [copyResult, setCopyResult] = React.useState<{ config: string; status: 'copied' | 'failed' }>()
  const config = `<html data-rillmark-preset="${preset}" data-rillmark-mode="${appearance}">`
  const copyState = copyResult?.config === config ? copyResult.status : 'idle'
  const selected = presets.find((item) => item.id === preset)!
  return <article className="theme-page"><div className="page-eyebrow">FOUNDATIONS <span>/</span> VISUAL PRESETS</div><div className="theme-heading"><h1>Same components.<br/><em>New character.</em></h1><p>Choose a point of view. Every surface, corner and interaction follows. Light and dark stay yours to choose.</p></div><PresetChooser preset={preset} onPresetChange={onPresetChange}/>
    <div className="theme-appearance"><div><strong>Set the light.</strong><p>Appearance is independent of your preset.</p></div><div role="group" aria-label="Appearance" className="theme-appearance-options">{([{ value: 'light', label: 'Light', icon: <Sun/> }, { value: 'dark', label: 'Dark', icon: <Moon/> }, { value: 'system', label: 'System', icon: <Monitor/> }] as const).map((mode) => <Button key={mode.value} variant={appearance === mode.value ? 'soft' : 'ghost'} aria-pressed={appearance === mode.value} onClick={() => onAppearanceChange(mode.value)}>{mode.icon}{mode.label}</Button>)}</div></div>
    <div className="theme-workbench"><Card className="theme-preview-card"><CardHeader><div className="theme-preview-kicker"><span>YOUR NEXT CHAPTER</span><Badge variant="outline">{selected.name}</Badge></div><CardTitle as="h2">Good work starts here.</CardTitle><CardDescription>A real form, in your chosen preset.</CardDescription></CardHeader><CardContent><form id="preset-preview-form" className="theme-preview-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><Field label="Project name" description="Give your next idea a home." required><Input value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} minLength={2}/></Field><div className="theme-switch-row"><label htmlFor="preset-notifications">Keep the team in the loop</label><Switch id="preset-notifications" checked={notify} onCheckedChange={setNotify}/></div><div className="theme-progress-label"><span>Ready for a fresh start</span><span>75%</span></div><Progress value={75} aria-label="Project readiness"/></form></CardContent><CardFooter><Button type="submit" form="preset-preview-form">{saved ? <><CheckCheck/> Saved locally</> : <>Save project <ArrowRight/></>}</Button><Dialog><DialogTrigger asChild><Button variant="outline">Preview dialog</Button></DialogTrigger><DialogContent><DialogTitle>Every detail follows.</DialogTitle><DialogDescription>{name || 'Your project'} uses {selected.name}, including this portalled dialog. Updates are {notify ? 'enabled' : 'disabled'} in this preview.</DialogDescription><p className="text-sm text-muted-foreground">The preset is set on the document root, so overlays share its colors, type, shape and motion automatically.</p></DialogContent></Dialog>{saved && <p role="status" className="theme-saved-status">{name} saved for this preview.</p>}</CardFooter></Card>
      <div className="theme-config"><span className="overline">YOUR ENTIRE CONFIGURATION</span><h2>Two settings.<br/>A shared language.</h2><p>{selected.detail} Both CSS entry points already include everything you need.</p><pre tabIndex={0}><code>{config}</code></pre><Button variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(config); setCopyResult({ config, status: 'copied' }) } catch { setCopyResult({ config, status: 'failed' }) } }}>{copyState === 'copied' ? <Check/> : <Copy/>}{copyState === 'copied' ? 'Copied configuration' : 'Copy configuration'}</Button>{copyState === 'failed' && <p role="status">Select the code above to copy it manually.</p>}<p className="theme-config-note">Put these attributes on your <code>html</code> element. No provider or extra package. Keyboard behavior, touch targets and reduced motion stay consistent.</p><a href="#/docs/themes" className="text-link">Read the theme guide <ArrowRight size={15}/></a></div>
    </div><div className="theme-next"><div><span className="overline">TAKE IT INTO A REAL WORKFLOW</span><h2>See the whole picture.</h2><p>Your selection carries through every example.</p></div><Button asChild><a href="#/examples/onboarding">Build a project brief <ArrowRight/></a></Button><Button asChild variant="outline"><a href="#/examples/activity">Open the activity inbox <ArrowRight/></a></Button></div>
  </article>
}
