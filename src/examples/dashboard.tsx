import * as React from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCheck, CircleCheck, Clock3, Download, FolderOpen, MessageSquare, Plus, Search, Sprout, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { demoStorageKeys, ExampleShell, readDemoValue, useDemoNotice, writeDemoValue } from './example-shell'

const statuses = ['Planned', 'In progress', 'In review', 'Complete'] as const
type ProjectStatus = typeof statuses[number]
type Project = { id: string; name: string; kind: string; status: ProjectStatus; owner: string; due: string; progress: number; budget: number; brief: string }
type SortKey = 'name' | 'due' | 'budget'
const initialProjects: Project[] = [
  { id: 'harbor', name: 'Harbor identity', kind: 'Brand identity', status: 'In review', owner: 'Alex Lee', due: '2026-11-06', progress: 85, budget: 18000, brief: 'A grounded identity for an independent seaside hotel. The current review covers the wordmark, a quiet coastal palette, and the first set of guest touchpoints.' },
  { id: 'good-things', name: 'Good Things shop', kind: 'Digital experience', status: 'In progress', owner: 'Maya Chen', due: '2026-11-12', progress: 60, budget: 24000, brief: 'A considered shopping experience for everyday objects. We are simplifying the product story, improving keyboard navigation, and making room for the makers behind each piece.' },
  { id: 'orchard', name: 'Orchard journal', kind: 'Editorial design', status: 'In review', owner: 'Noah Patel', due: '2026-11-18', progress: 90, budget: 12000, brief: 'The inaugural issue of a journal about the places we grow. A flexible editorial grid brings together long-form conversations, field photography, and short seasonal notes.' },
  { id: 'northline', name: 'Northline wayfinding', kind: 'Environmental design', status: 'Planned', owner: 'Alex Lee', due: '2026-11-24', progress: 10, budget: 32000, brief: 'A clear wayfinding system for a neighborhood arts campus. The first phase maps visitor journeys and tests a small family of directional signs at actual viewing distances.' },
  { id: 'common', name: 'Common ground', kind: 'Brand identity', status: 'In progress', owner: 'Maya Chen', due: '2026-11-27', progress: 45, budget: 16000, brief: 'A welcoming visual language for a community growing space. The identity must work equally well on a volunteer handbook, a garden sign, and a mobile event listing.' },
  { id: 'fold', name: 'Fold collection', kind: 'Digital experience', status: 'In review', owner: 'Noah Patel', due: '2026-12-02', progress: 80, budget: 21000, brief: 'A small digital catalog for an independent furniture workshop. Detailed materials and honest process photography lead the experience, supported by straightforward product information.' },
  { id: 'studio-journal', name: 'Studio journal', kind: 'Editorial design', status: 'In progress', owner: 'Alex Lee', due: '2026-12-08', progress: 30, budget: 8500, brief: 'A place to share the questions and experiments behind our finished work. The journal is designed around readable essays, working notes, and a compact, useful archive.' },
  { id: 'stillwater', name: 'Stillwater packaging', kind: 'Brand identity', status: 'In review', owner: 'Maya Chen', due: '2026-12-10', progress: 95, budget: 14500, brief: 'A restrained packaging family for a botanical drink maker. This round checks product naming, ingredient hierarchy, and production-ready artwork for three bottle sizes.' },
  { id: 'waypoint', name: 'Waypoint website', kind: 'Digital experience', status: 'Planned', owner: 'Noah Patel', due: '2026-12-16', progress: 5, budget: 28000, brief: 'A useful digital home for a small travel journal. The experience centers on destination collections, practical reading, and a simple member newsletter.' },
  { id: 'form', name: 'Form & function', kind: 'Editorial design', status: 'Complete', owner: 'Alex Lee', due: '2026-10-23', progress: 100, budget: 9500, brief: 'An exhibition guide connecting the objects on display to the people who made them. Delivered as a compact print booklet with a companion accessible web edition.' },
  { id: 'linden', name: 'Linden house', kind: 'Brand identity', status: 'Complete', owner: 'Maya Chen', due: '2026-10-28', progress: 100, budget: 17000, brief: 'An identity for a neighborhood gathering place. The final system includes signage, menus, event templates, and a simple set of guidelines for the in-house team.' },
  { id: 'open-day', name: 'Open day campaign', kind: 'Environmental design', status: 'Planned', owner: 'Noah Patel', due: '2027-01-15', progress: 0, budget: 11000, brief: 'A practical campaign inviting the neighborhood into the studio. The project connects posters, a small event page, and a welcoming printed guide to the day.' },
]

function isProjects(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false
    const project = item as Record<string, unknown>
    return ['id', 'name', 'kind', 'owner', 'due', 'brief'].every((key) => typeof project[key] === 'string') && /^\d{4}-\d{2}-\d{2}$/.test(String(project.due)) && !Number.isNaN(Date.parse(String(project.due))) && statuses.includes(project.status as ProjectStatus) && typeof project.progress === 'number' && project.progress >= 0 && project.progress <= 100 && typeof project.budget === 'number' && Number.isFinite(project.budget) && project.budget > 0
  })
}

function initials(name: string) { return name.split(' ').map((part) => part[0]).slice(0, 2).join('') }
function shortDate(value: string) { return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`)) }
function currency(value: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value) }

function ProjectBadge({ status }: { status: ProjectStatus }) {
  return <Badge variant={status === 'In review' ? 'accent' : status === 'Planned' ? 'outline' : 'soft'} className="whitespace-nowrap text-[10px]">{status === 'Complete' ? <CircleCheck size={11} aria-hidden="true" /> : <span aria-hidden="true" className="size-1 rounded-full bg-current" />}{status}</Badge>
}

function ProjectDetails({ project }: { project: Project }) {
  return <Sheet>
    <SheetTrigger asChild><button className="fw-project-name">{project.name}</button></SheetTrigger>
    <SheetContent>
      <SheetHeader><p className="fw-eyebrow">Project brief / Fieldwork</p><SheetTitle>{project.name}</SheetTitle><SheetDescription>{project.kind} · A shared direction for the team.</SheetDescription></SheetHeader>
      <div><ProjectBadge status={project.status} /><p className="mt-5 text-sm leading-7 text-muted-foreground">{project.brief}</p></div>
      <dl className="fw-detail-meta"><div><dt>Project lead</dt><dd>{project.owner}</dd></div><div><dt>Due date</dt><dd>{shortDate(project.due)}, {project.due.slice(0, 4)}</dd></div><div><dt>Project budget</dt><dd>{currency(project.budget)}</dd></div><div><dt>Progress</dt><dd>{project.progress}% complete</dd></div></dl>
      <Progress value={project.progress} aria-label={`${project.name} progress`} />
      <div className="rounded-xl bg-secondary p-4 text-sm text-secondary-foreground"><h3 className="mb-2 font-semibold">The next useful step</h3><p className="text-sm leading-relaxed">{project.status === 'Complete' ? 'Archive the final deliverables and note what the team learned.' : project.status === 'In review' ? 'Read the brief, gather focused feedback, and agree on the next revision together.' : project.status === 'Planned' ? 'Set up a kickoff conversation and turn the brief into a short, shared plan.' : 'Make the next decision visible. Share a small, concrete piece of work with the team.'}</p></div>
      <SheetFooter><SheetClose asChild><Button variant="outline">Back to projects</Button></SheetClose></SheetFooter>
    </SheetContent>
  </Sheet>
}

type ProjectDraft = { name: string; kind: string; owner: string; due: string; budget: string; brief: string }
const emptyDraft: ProjectDraft = { name: '', kind: 'Brand identity', owner: 'Alex Lee', due: '2026-12-01', budget: '', brief: '' }

function NewProject({ onCreate }: { onCreate: (project: Project) => void }) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<ProjectDraft>(emptyDraft)
  const [errors, setErrors] = React.useState<Partial<Record<keyof ProjectDraft, string>>>({})
  function update(key: keyof ProjectDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }
  function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (draft.name.trim().length < 3) nextErrors.name = 'Give the project a name with at least 3 characters.'
    if (!draft.due || !/^\d{4}-\d{2}-\d{2}$/.test(draft.due) || Number.isNaN(Date.parse(draft.due))) nextErrors.due = 'Choose a valid due date.'
    if (!draft.budget || !Number.isFinite(Number(draft.budget)) || Number(draft.budget) <= 0) nextErrors.budget = 'Enter a project budget greater than zero.'
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) { requestAnimationFrame(() => document.getElementById(`new-project-${firstError}`)?.focus()); return }
    onCreate({ id: crypto.randomUUID(), name: draft.name.trim(), kind: draft.kind, status: 'Planned', owner: draft.owner, due: draft.due, progress: 0, budget: Number(draft.budget), brief: draft.brief.trim() || 'Start with a shared question. Add context, agree on the outcome, and make the next useful step clear.' })
    setDraft(emptyDraft)
    setErrors({})
    setOpen(false)
  }
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button><Plus aria-hidden="true" />New project</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader><p className="fw-eyebrow">A fresh starting point</p><DialogTitle>Create a project</DialogTitle><DialogDescription>Give the work a name and a little direction. This demo saves your project in this browser.</DialogDescription></DialogHeader>
      <form noValidate onSubmit={create} className="grid gap-5">
        <Field id="new-project-name" label="Project name" required error={errors.name}><Input name="projectName" maxLength={80} placeholder="e.g. A new perspective" value={draft.name} onChange={(event) => update('name', event.target.value)} /></Field>
        <div className="fw-form-grid">
          <Field label="Type of work"><Select value={draft.kind} onValueChange={(value) => update('kind', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['Brand identity', 'Digital experience', 'Editorial design', 'Environmental design'].map((kind) => <SelectItem key={kind} value={kind}>{kind}</SelectItem>)}</SelectContent></Select></Field>
          <Field label="Project lead"><Select value={draft.owner} onValueChange={(value) => update('owner', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['Alex Lee', 'Maya Chen', 'Noah Patel'].map((owner) => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}</SelectContent></Select></Field>
          <Field id="new-project-due" label="Due date" required error={errors.due}><Input name="dueDate" type="date" value={draft.due} onChange={(event) => update('due', event.target.value)} /></Field>
          <Field id="new-project-budget" label="Budget (USD)" required error={errors.budget}><Input name="budget" type="number" min="1" step="1" placeholder="12000" value={draft.budget} onChange={(event) => update('budget', event.target.value)} /></Field>
        </div>
        <Field label="A short brief" description="Optional. What would make this project a success?"><Textarea name="brief" maxLength={1000} rows={3} value={draft.brief} onChange={(event) => update('brief', event.target.value)} /></Field>
        <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button type="submit">Create project<ArrowRight aria-hidden="true" /></Button></DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}

export function Dashboard() {
  const [projects, setProjects] = React.useState(() => readDemoValue(demoStorageKeys.projects, initialProjects, isProjects))
  const [query, setQuery] = React.useState('')
  const [status, setStatus] = React.useState('all')
  const [page, setPage] = React.useState(1)
  const [sort, setSort] = React.useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null)
  const [selected, setSelected] = React.useState<string[]>([])
  const [activity, setActivity] = React.useState([{ text: 'Maya shared a new direction for Good Things.', person: 'Maya Chen', time: '24 minutes ago' }, { text: 'Harbor identity is ready for a fresh pair of eyes.', person: 'Alex Lee', time: '1 hour ago' }, { text: 'Noah added the first Orchard journal layouts.', person: 'Noah Patel', time: '2 hours ago' }])
  const { notice, notify, dismiss } = useDemoNotice()
  const filtered = projects.filter((project) => (status === 'all' || project.status === status) && `${project.name} ${project.kind} ${project.owner}`.toLowerCase().includes(query.trim().toLowerCase()))
  if (sort) filtered.sort((a, b) => {
    const left = a[sort.key], right = b[sort.key]
    const comparison = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right))
    return sort.direction === 'asc' ? comparison : -comparison
  })
  const pageCount = Math.max(1, Math.ceil(filtered.length / 6))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * 6, currentPage * 6)
  const checkedCount = visible.filter((project) => selected.includes(project.id)).length
  const reviews = projects.filter((project) => project.status === 'In review').length
  function persist(next: Project[], title: string) {
    setProjects(next)
    const saved = writeDemoValue(demoStorageKeys.projects, next)
    notify(title, saved ? 'Saved in this browser. No data is sent to a server.' : 'Updated for this session. Browser storage is unavailable.')
  }
  function toggleSort(key: SortKey) {
    setSort((current) => ({ key, direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc' }))
    setPage(1)
  }
  function exportProjects() {
    const rows = [['Project', 'Type', 'Status', 'Lead', 'Due', 'Budget USD', 'Progress'], ...filtered.map((project) => [project.name, project.kind, project.status, project.owner, project.due, String(project.budget), `${project.progress}%`])]
    const csv = rows.map((row) => row.map((cell) => {
      // Spreadsheet apps can interpret user-authored project names as formulas.
      const text = /^[=+\-@\t\r]/.test(cell) ? `'${cell}` : cell
      return `"${text.replace(/"/g, '""')}"`
    }).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'fieldwork-projects.csv'
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    notify('Project list exported', `${filtered.length} projects included in your CSV download.`)
  }
  function completeSelection() {
    persist(projects.map((project) => selected.includes(project.id) ? { ...project, status: 'Complete', progress: 100 } : project), `${selected.length} ${selected.length === 1 ? 'project' : 'projects'} completed`)
    setActivity((current) => [{ text: `Alex marked ${selected.length} ${selected.length === 1 ? 'project' : 'projects'} complete.`, person: 'Alex Lee', time: 'Just now' }, ...current].slice(0, 3))
    setSelected([])
    document.getElementById('project-search')?.focus()
  }
  function clearFilters() { setQuery(''); setStatus('all'); setPage(1) }
  return <ExampleShell active="dashboard" notice={notice} dismissNotice={dismiss}>
    <div className="fw-page-heading"><div><p className="fw-eyebrow"><span className="fw-status-dot" />The studio, at a glance</p><h1>Good work, in progress.</h1><p className="fw-page-subtitle">A shared place for the projects, people, and small steps that matter.</p></div><NewProject onCreate={(project) => { persist([project, ...projects], `${project.name} created`); clearFilters(); setSort(null); setActivity((current) => [{ text: `Alex started ${project.name}.`, person: 'Alex Lee', time: 'Just now' }, ...current].slice(0, 3)) }} /></div>
    <div className="fw-metrics">
      <Card className="fw-metric fw-metric-highlight"><div className="fw-metric-label">Active projects<FolderOpen size={15} aria-hidden="true" /></div><strong className="fw-metric-value">{String(projects.filter((project) => project.status !== 'Complete').length).padStart(2, '0')}</strong><div className="fw-metric-note">Across four creative disciplines</div></Card>
      <Card className="fw-metric"><div className="fw-metric-label">Ready for review<MessageSquare size={15} aria-hidden="true" /></div><strong className="fw-metric-value">{String(reviews).padStart(2, '0')}</strong><div className="fw-metric-note">Fresh perspectives welcome</div></Card>
      <Card className="fw-metric"><div className="fw-metric-label">Project budgets<Wallet size={15} aria-hidden="true" /></div><strong className="fw-metric-value">${Math.round(projects.reduce((sum, project) => sum + project.budget, 0) / 1000)}<span className="text-xl">k</span></strong><div className="fw-metric-note">Total across this workspace</div></Card>
      <Card className="fw-metric"><div className="fw-metric-label">Made & delivered<CircleCheck size={15} aria-hidden="true" /></div><strong className="fw-metric-value">{String(projects.filter((project) => project.status === 'Complete').length).padStart(2, '0')}</strong><div className="fw-metric-note">A little room for what's next</div></Card>
    </div>
    <Card className="fw-table-card">
      <div className="fw-section-heading"><div><h2>Our projects <span className="ml-2 text-xs font-normal text-muted-foreground">{projects.length}</span></h2><p className="fw-section-subtitle">From the first question to the final detail.</p></div><Button variant="ghost" size="sm" onClick={exportProjects}><Download aria-hidden="true" />Export CSV</Button></div>
      <div className="fw-toolbar"><div className="fw-search"><Search aria-hidden="true" /><Input id="project-search" type="search" aria-label="Search projects" placeholder="Search projects, people, or disciplines…" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></div><div className="fw-status-filter"><Select value={status} onValueChange={(value) => { setStatus(value); setPage(1) }}><SelectTrigger aria-label="Filter projects by status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem>{statuses.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div><span className="fw-search-count" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</span></div>
      {selected.length > 0 && <div className="fw-selection"><span>{selected.length} selected</span><Button variant="ghost" size="sm" onClick={() => { setSelected([]); document.getElementById('project-search')?.focus() }}>Clear selection</Button><Button variant="solid" size="sm" onClick={completeSelection}><CheckCheck aria-hidden="true" />Mark complete</Button></div>}
      {visible.length ? <Table className="fw-table" containerLabel="Project table, scroll horizontally for all columns">
        <TableCaption className="sr-only">Fieldwork projects. Sort by project or due date; select projects to mark them complete.</TableCaption>
        <TableHeader><TableRow><TableHead><Checkbox aria-label="Select all projects on this page" checked={checkedCount === visible.length ? true : checkedCount > 0 ? 'indeterminate' : false} onCheckedChange={(checked) => setSelected((current) => checked ? Array.from(new Set([...current, ...visible.map((project) => project.id)])) : current.filter((id) => !visible.some((project) => project.id === id)))} /></TableHead><TableHead aria-sort={sort?.key === 'name' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}><Button variant="ghost" size="sm" className="-mx-2 px-2 text-xs" onClick={() => toggleSort('name')}>Project<ArrowDown className={sort?.key === 'name' && sort.direction === 'desc' ? 'rotate-180' : undefined} aria-hidden="true" /></Button></TableHead><TableHead>Status</TableHead><TableHead>Lead</TableHead><TableHead aria-sort={sort?.key === 'due' ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none'}><Button variant="ghost" size="sm" className="-mx-2 px-2 text-xs" onClick={() => toggleSort('due')}>Due date<ArrowDown className={sort?.key === 'due' && sort.direction === 'desc' ? 'rotate-180' : undefined} aria-hidden="true" /></Button></TableHead><TableHead>Progress</TableHead></TableRow></TableHeader>
        <TableBody>{visible.map((project) => <TableRow key={project.id} data-selected={selected.includes(project.id)}><TableCell><Checkbox aria-label={`Select ${project.name}`} checked={selected.includes(project.id)} onCheckedChange={(checked) => setSelected((current) => checked ? [...current, project.id] : current.filter((id) => id !== project.id))} /></TableCell><TableCell><ProjectDetails project={project} /><span className="fw-project-kind">{project.kind}</span></TableCell><TableCell><ProjectBadge status={project.status} /></TableCell><TableCell><span className="fw-owner"><Avatar className="size-7"><AvatarFallback className="text-[9px]">{initials(project.owner)}</AvatarFallback></Avatar>{project.owner.split(' ')[0]}</span></TableCell><TableCell className="fw-table-date">{shortDate(project.due)}</TableCell><TableCell><div className="fw-progress-cell"><Progress value={project.progress} aria-label={`${project.name} progress`} className="h-1.5" /><span>{project.progress}%</span></div></TableCell></TableRow>)}</TableBody>
      </Table> : <div className="p-5"><EmptyState icon={<Search size={22} />} title="A little too specific, perhaps." description="No projects match these filters. Try a different name or open up the status filter." action={<Button variant="outline" onClick={clearFilters}>Clear filters</Button>} /></div>}
      <div className="fw-table-pagination"><Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} aria-label="Project pages" /></div>
    </Card>
    <div className="fw-bottom-grid"><Card className="fw-note"><Sprout size={25} aria-hidden="true" /><h2>A fresh pair of eyes.</h2><p>{reviews ? `${reviews} projects are ready for review. A thoughtful question can move the work further than a perfect answer.` : 'The review queue is clear. Make a little space for a new idea, or check in with work in progress.'}</p><Button variant="outline" size="sm" onClick={() => { setStatus(reviews ? 'In review' : 'In progress'); setQuery(''); setPage(1); document.getElementById('project-search')?.focus() }}>View {reviews ? 'review queue' : 'work in progress'}<ArrowUpRight aria-hidden="true" /></Button></Card><Card className="fw-activity"><h2>Small steps, shared.</h2><ol>{activity.map((item, index) => <li key={`${item.text}-${index}`}><Avatar className="mt-0.5 size-7"><AvatarFallback className="text-[9px]">{initials(item.person)}</AvatarFallback></Avatar><div><p>{item.text}</p><time><Clock3 size={10} className="mr-1 inline" aria-hidden="true" />{item.time}</time></div></li>)}</ol></Card></div>
  </ExampleShell>
}

export default Dashboard
