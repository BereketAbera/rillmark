import * as React from 'react'
import { ArrowDownToLine, ArrowLeft, ArrowRight, Check, CircleCheck, FileText, Leaf, RotateCcw, Save, Sparkles } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from 'rillmark/alert-dialog'
import { Badge } from 'rillmark/badge'
import { Button } from 'rillmark/button'
import { Card } from 'rillmark/card'
import { Checkbox } from 'rillmark/checkbox'
import { Field } from 'rillmark/field'
import { FileDropzone } from 'rillmark/file-dropzone'
import { Input } from 'rillmark/input'
import { Progress } from 'rillmark/progress'
import { NumberInput } from 'rillmark/number-input'
import { Stepper } from 'rillmark/stepper'
import { TagInput } from 'rillmark/tag-input'
import { Textarea } from 'rillmark/textarea'
import { demoStorageKeys, ExampleShell, readDemoValue, useDemoNotice, writeDemoValue } from './example-shell'

type Attachment = { name: string; size: number }
type Brief = { title: string; client: string; objective: string; people: number | ''; weeks: number | ''; budget: number | ''; deliverables: string[]; references: Attachment[] }
type Draft = { brief: Brief; step: number; completed: boolean }
type Errors = Partial<Record<keyof Brief | 'reviewed', string>>
const initialBrief: Brief = { title: '', client: '', objective: '', people: 3, weeks: 6, budget: 12000, deliverables: ['Brand strategy', 'Visual identity'], references: [] }
const initialDraft: Draft = { brief: initialBrief, step: 0, completed: false }
const steps = [{ id: 'intention', title: 'The intention', description: 'Find the right question' }, { id: 'scope', title: 'The shape', description: 'Make room for the work' }, { id: 'review', title: 'The starting point', description: 'Bring it all together' }]
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function isDraft(value: unknown): value is Draft {
  if (!value || typeof value !== 'object') return false
  const draft = value as Draft, brief = draft.brief
  return Number.isInteger(draft.step) && draft.step >= 0 && draft.step <= 2 && typeof draft.completed === 'boolean' && Boolean(brief) && ['title', 'client', 'objective'].every((key) => typeof brief[key as keyof Brief] === 'string') && ['people', 'weeks', 'budget'].every((key) => brief[key as keyof Brief] === '' || (typeof brief[key as keyof Brief] === 'number' && Number.isFinite(brief[key as keyof Brief]))) && Array.isArray(brief.deliverables) && brief.deliverables.every((tag) => typeof tag === 'string') && Array.isArray(brief.references) && brief.references.every((file) => file && typeof file.name === 'string' && typeof file.size === 'number')
}

function validateBrief(brief: Brief, step: number): Errors {
  const errors: Errors = {}
  if (step === 0) {
    if (brief.title.trim().length < 3) errors.title = 'Give your project a name with at least 3 characters.'
    if (brief.client.trim().length < 2) errors.client = 'Tell us who this project is for.'
    if (brief.objective.trim().length < 20) errors.objective = 'Describe the change you want to make in at least 20 characters.'
  }
  if (step === 1) {
    if (brief.people === '' || brief.people < 1 || brief.people > 20 || !Number.isInteger(brief.people)) errors.people = 'Choose a whole number from 1 to 20 people.'
    if (brief.weeks === '' || brief.weeks < 1 || brief.weeks > 52 || !Number.isInteger(brief.weeks)) errors.weeks = 'Choose a whole number from 1 to 52 weeks.'
    if (brief.budget === '' || brief.budget < 500 || brief.budget > 1000000) errors.budget = 'Enter a budget from $500 to $1,000,000.'
    if (!brief.deliverables.length) errors.deliverables = 'Add at least one deliverable.'
  }
  return errors
}

export function Onboarding() {
  const [draft, setDraft] = React.useState(() => readDemoValue(demoStorageKeys.brief, initialDraft, isDraft))
  const [files, setFiles] = React.useState<File[]>([])
  const [errors, setErrors] = React.useState<Errors>({})
  const [reviewed, setReviewed] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const heading = React.useRef<HTMLHeadingElement>(null)
  const { notice, notify, dismiss } = useDemoNotice()
  const { brief, step, completed } = draft
  const progress = completed ? 100 : Math.round(step / 3 * 100)

  function update<K extends keyof Brief>(key: K, value: Brief[K]) {
    setDraft((previous) => ({ ...previous, brief: { ...previous.brief, [key]: value } }))
    setSaved(false)
    setReviewed(false)
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }
  function persist(next: Draft, title?: string) {
    const stored = writeDemoValue(demoStorageKeys.brief, next)
    setSaved(stored)
    if (title) notify(title, stored ? 'Saved in this browser. Reference names are saved; file contents are never uploaded or stored.' : 'Kept for this session. Browser storage is unavailable.')
  }
  function moveTo(nextStep: number) {
    setDraft((previous) => ({ ...previous, step: nextStep }))
    setErrors({})
    requestAnimationFrame(() => heading.current?.focus())
  }
  function focusError(nextErrors: Errors) {
    setErrors(nextErrors)
    requestAnimationFrame(() => document.getElementById(`brief-${Object.keys(nextErrors)[0]}`)?.focus())
  }
  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (step < 2) {
      const nextErrors = validateBrief(brief, step)
      if (Object.keys(nextErrors).length) { focusError(nextErrors); return }
      const next = { ...draft, step: step + 1 }
      persist(next)
      moveTo(step + 1)
      return
    }
    for (const check of [0, 1]) {
      const nextErrors = validateBrief(brief, check)
      if (Object.keys(nextErrors).length) { setDraft({ ...draft, step: check }); focusError(nextErrors); return }
    }
    if (!reviewed) { focusError({ reviewed: 'Confirm that you have reviewed the brief before finishing.' }); return }
    const next = { ...draft, completed: true }
    setDraft(next)
    persist(next, 'Your brief is ready')
    requestAnimationFrame(() => heading.current?.focus())
  }
  function reset() {
    setDraft(initialDraft)
    setFiles([])
    setErrors({})
    setReviewed(false)
    persist(initialDraft, 'A fresh page, ready for you')
  }
  function download() {
    const text = `${brief.title}\nFor ${brief.client}\n\nTHE INTENTION\n${brief.objective}\n\nTHE SHAPE\n${brief.people} people · ${brief.weeks} weeks · ${money.format(Number(brief.budget))}\n\nDELIVERABLES\n${brief.deliverables.map((item) => `• ${item}`).join('\n')}\n\nREFERENCE NAMES\n${brief.references.map((file) => file.name).join('\n') || 'None'}\n\nCreated in the Fieldwork local demo. No project has been submitted to a server.\n`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = 'fieldwork-project-brief.txt'; anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <ExampleShell active="onboarding" notice={notice} dismissNotice={dismiss}>
    <div className="fw-page-heading">
      <div><p className="fw-eyebrow"><Sparkles size={13} aria-hidden="true" /> A new chapter / Project brief</p><h1>A good beginning changes everything.</h1><p className="fw-page-subtitle">A little clarity now. More room for good work later.</p></div>
      <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost"><RotateCcw aria-hidden="true" />Reset brief</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Start this brief again?</AlertDialogTitle><AlertDialogDescription>This removes only the brief saved in this browser and its selected references. Your other Fieldwork demo data stays as it is.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep this brief</AlertDialogCancel><AlertDialogAction onClick={reset}>Reset brief data</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
    <div className="fw-brief-layout">
      <div className="fw-brief-main">
        <Stepper aria-label="Project brief steps" steps={steps.map((item, index) => ({ ...item, disabled: completed || index > step }))} value={steps[step].id} onValueChange={(id) => moveTo(steps.findIndex((item) => item.id === id))} />
        <Card className="fw-brief-card">
          {completed ? <section className="fw-brief-finished"><div className="fw-brief-seal"><CircleCheck size={32} aria-hidden="true" /></div><Badge variant="soft">Ready for a conversation</Badge><h2 ref={heading} tabIndex={-1}>The first page is written.</h2><p>Your brief for <strong>{brief.title}</strong> is ready. Download it, share it on your own terms, and use it to start a better conversation.</p><div className="fw-brief-finished-actions"><Button onClick={download}><ArrowDownToLine aria-hidden="true" />Download brief</Button><Button variant="outline" onClick={() => { setDraft({ ...draft, completed: false }); setReviewed(false); setSaved(false) }}>Revisit the brief</Button></div><p className="fw-local-note">This is a local demo. Nothing has been submitted or sent.</p></section> : <form onSubmit={submit} noValidate>
            <div className="fw-brief-section-heading"><span className="fw-brief-index">0{step + 1}</span><div><h2 ref={heading} tabIndex={-1}>{['What are we here to change?', 'Give the work a little shape.', 'One last look. Then, begin.'][step]}</h2><p>{['Start with the people, the problem, and the possibility.', 'A useful starting point, with space to adapt as you learn.', 'A shared understanding is the most useful deliverable of all.'][step]}</p></div></div>
            {step === 0 && <div className="fw-brief-fields">
              <Field label="Project name" required error={errors.title}><Input id="brief-title" placeholder="e.g. A new chapter for Common Ground" value={brief.title} onChange={(event) => update('title', event.target.value)} maxLength={100} /></Field>
              <Field label="Who is it for?" required error={errors.client}><Input id="brief-client" placeholder="Client, organization, or community" value={brief.client} onChange={(event) => update('client', event.target.value)} maxLength={100} /></Field>
              <Field label="What should be different when we’re done?" required description="Think about a real change for real people. A few clear sentences are enough." error={errors.objective}><Textarea id="brief-objective" value={brief.objective} onChange={(event) => update('objective', event.target.value)} placeholder="We want to help…" rows={5} maxLength={2000} /></Field>
              <div className="fw-brief-prompt"><Leaf size={20} aria-hidden="true" /><p><strong>A useful question to ask.</strong><br />If this project works beautifully, what will someone be able to do that they can’t do today?</p></div>
            </div>}
            {step === 1 && <div className="fw-brief-fields">
              <div className="fw-brief-numbers"><Field label="People on the team" required error={errors.people}><NumberInput id="brief-people" value={brief.people} onValueChange={(value) => update('people', value)} min={1} max={20} step={1} decrementLabel="Fewer people" incrementLabel="More people" /></Field><Field label="Duration in weeks" required error={errors.weeks}><NumberInput id="brief-weeks" value={brief.weeks} onValueChange={(value) => update('weeks', value)} min={1} max={52} step={1} decrementLabel="Fewer weeks" incrementLabel="More weeks" /></Field></div>
              <Field label="Working budget (USD)" required description="An estimate to guide the scope, not a quote or payment." error={errors.budget}><NumberInput id="brief-budget" value={brief.budget} onValueChange={(value) => update('budget', value)} min={500} max={1000000} step={500} decrementLabel="Decrease budget" incrementLabel="Increase budget" /></Field>
              <Field label="Deliverables" required description="Type a deliverable and press Enter. Add up to 6." error={errors.deliverables}><TagInput id="brief-deliverables" value={brief.deliverables} onValueChange={(value) => update('deliverables', value)} maxTags={6} placeholder="Add a deliverable…" /></Field>
              <Field label="Reference files" description="Optional. Up to 3 PDF, PNG, or JPEG files, 5 MB each. Files never leave this tab; only their names and sizes are saved."><FileDropzone files={files} onFilesChange={(nextFiles) => { setFiles(nextFiles); update('references', nextFiles.map((file) => ({ name: file.name, size: file.size }))) }} accept=".pdf,.png,.jpg,.jpeg" maxFiles={3} maxSize={5 * 1024 * 1024} /></Field>
              {!files.length && brief.references.length > 0 && <div className="fw-reference-note"><FileText size={17} aria-hidden="true" /><div><strong>Saved reference names</strong><p>{brief.references.map((file) => file.name).join(', ')}</p><p>File contents are not retained after leaving the page.</p><Button size="sm" variant="ghost" onClick={() => update('references', [])}>Clear reference names</Button></div></div>}
            </div>}
            {step === 2 && <div className="fw-brief-fields"><div className="fw-brief-review"><div className="fw-brief-review-title"><span className="fw-eyebrow">Fieldwork / Project brief</span><h3>{brief.title}</h3><p>For {brief.client}</p></div><div className="fw-brief-review-section"><h4>The intention</h4><p>{brief.objective}</p></div><dl className="fw-brief-review-facts"><div><dt>Team</dt><dd>{brief.people} people</dd></div><div><dt>Time</dt><dd>{brief.weeks} weeks</dd></div><div><dt>Budget</dt><dd>{money.format(Number(brief.budget))}</dd></div></dl><div className="fw-brief-review-section"><h4>What we’ll make</h4><div className="fw-brief-tags">{brief.deliverables.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div></div><div className="fw-brief-review-section"><h4>Reference names</h4><p>{brief.references.length ? brief.references.map((file) => file.name).join(' · ') : 'No references added. A good conversation is enough to start.'}</p></div></div><Field error={errors.reviewed}><div className="fw-brief-confirm"><Checkbox id="brief-reviewed" checked={reviewed} onCheckedChange={(checked) => { setReviewed(checked === true); setErrors({}) }} /><label htmlFor="brief-reviewed">I’ve reviewed this brief and I’m ready to use it as a starting point.</label></div></Field></div>}
            <div className="fw-form-footer"><div className="fw-brief-back">{step > 0 && <Button variant="ghost" onClick={() => moveTo(step - 1)}><ArrowLeft aria-hidden="true" />Back</Button>}<Button variant="ghost" onClick={() => persist(draft, 'Draft saved')}><Save aria-hidden="true" />{saved ? 'Draft saved' : 'Save draft'}</Button></div><Button type="submit">{step === 2 ? 'Finish brief' : 'Continue'}{step === 2 ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</Button></div>
          </form>}
        </Card>
      </div>
      <aside className="fw-brief-aside"><Card className="fw-brief-overview"><p className="fw-eyebrow">Room for possibility</p><h2>Good questions.<br />Thoughtful work.</h2><p className="fw-brief-overview-description">A brief is a conversation starter. Keep it honest, useful, and open to a little discovery.</p><div className="fw-brief-progress-label"><span>{completed ? 'Ready to begin' : `Step ${step + 1} of 3`}</span><span>{progress}%</span></div><Progress value={progress} aria-label="Brief completion" /><dl className="fw-brief-summary"><div><dt>Team</dt><dd>{brief.people || '—'} people</dd></div><div><dt>Time together</dt><dd>{brief.weeks || '—'} weeks</dd></div><div><dt>Working budget</dt><dd>{brief.budget ? money.format(brief.budget) : '—'}</dd></div></dl><p className="fw-local-note"><Save size={13} aria-hidden="true" />Your brief stays in this browser. Save a draft to come back later.</p></Card><div className="fw-brief-margin-note"><span>01 — A studio principle</span><p>“Start with what matters.<br />Make room for what’s next.”</p></div></aside>
    </div>
  </ExampleShell>
}

export default Onboarding
