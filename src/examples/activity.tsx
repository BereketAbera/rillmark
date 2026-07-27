import * as React from 'react'
import { ArrowRight, Bookmark, Check, CheckCheck, CircleCheck, Command as CommandIcon, FileCheck2, Inbox, MessageCircle, NotebookPen, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback } from 'rillmark/avatar'
import { Badge } from 'rillmark/badge'
import { Button } from 'rillmark/button'
import { Card } from 'rillmark/card'
import { CommandDialog } from 'rillmark/command'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from 'rillmark/context-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from 'rillmark/dialog'
import { EmptyState } from 'rillmark/empty-state'
import { Field } from 'rillmark/field'
import { IconButton } from 'rillmark/icon-button'
import { Input } from 'rillmark/input'
import { Kbd } from 'rillmark/kbd'
import { ScrollArea } from 'rillmark/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'rillmark/select'
import { Textarea } from 'rillmark/textarea'
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from 'rillmark/timeline'
import { demoStorageKeys, ExampleShell, readDemoValue, useDemoNotice, writeDemoValue } from './example-shell'

type UpdateKind = 'Feedback' | 'Milestone' | 'Decision'
type Update = { id: string; author: string; initials: string; title: string; project: string; kind: UpdateKind; date: string; time: string; summary: string; detail: string; next: string }
type InboxState = { read: string[]; saved: string[]; notes: Record<string, string> }
const updates: Update[] = [
  { id: 'harbor-feedback', author: 'Maya Chen', initials: 'MC', title: 'A little more room for the story.', project: 'Harbor identity', kind: 'Feedback', date: '2026-11-04T10:42:00', time: 'Today · 10:42', summary: 'The identity is finding its voice. Maya left three useful observations on the latest direction.', detail: 'The wider wordmark feels confident at a distance. Keep that breathing room when the identity meets photography. The secondary type needs one more pass at small sizes, especially on the back of the membership card. The team’s favorite detail is the quiet shift in the sea-green field.', next: 'Try the wordmark at the two smallest real sizes and bring those examples to the next review.' },
  { id: 'common-ground', author: 'Sam Okafor', initials: 'SO', title: 'The first chapter is approved.', project: 'Common ground', kind: 'Milestone', date: '2026-11-04T09:18:00', time: 'Today · 09:18', summary: 'The project brief is agreed. Research can begin with a shared question and a clear audience.', detail: 'The community team agreed on the initial brief: make it easier for neighbors to find, join, and contribute to local growing spaces. The first research round will include six people, with a balance of first-time visitors and long-standing members.', next: 'Use the brief to prepare a short interview guide. Ask about the last time someone tried to get involved.' },
  { id: 'stillwater-direction', author: 'Alex Lee', initials: 'AL', title: 'Less packaging. More presence.', project: 'Stillwater packaging', kind: 'Decision', date: '2026-11-04T08:50:00', time: 'Today · 08:50', summary: 'We’re taking the single-material direction forward, with the quieter label system.', detail: 'After looking at the two production routes, the studio selected the single-material sleeve. It uses fewer pieces, simplifies assembly, and gives the product a calmer shelf presence. The label remains one color, with the batch information kept legible at arm’s length.', next: 'Make a full-size paper prototype before refining the print specification.' },
  { id: 'waypoint-review', author: 'Jo Rivera', initials: 'JR', title: 'The route is clearer now.', project: 'Waypoint website', kind: 'Feedback', date: '2026-11-03T16:25:00', time: 'Yesterday · 16:25', summary: 'The new navigation worked well in the first walkthrough. Two labels still need a closer look.', detail: 'All four participants found the project stories without prompting. “Our approach” was understood consistently; “Resources” was less clear. One person expected service information there, while another expected downloads. The footer links were easier to scan after shortening the labels.', next: 'Test two concrete labels for the resource section using the actual content people will find there.' },
  { id: 'northline-handoff', author: 'Maya Chen', initials: 'MC', title: 'Ready for the next pair of hands.', project: 'Northline wayfinding', kind: 'Milestone', date: '2026-11-03T14:10:00', time: 'Yesterday · 14:10', summary: 'The sign family and placement notes are ready for the fabricator’s first review.', detail: 'The handoff includes the core sign family, typography sizes, and a placement schedule for the three pilot locations. The materials note keeps finish choices open until the physical samples arrive. Each location has a photographed context so the fabricator can assess fixing points.', next: 'Review material samples in the intended lighting, then update the final finish note.' },
  { id: 'journal-format', author: 'Sam Okafor', initials: 'SO', title: 'A journal worth keeping.', project: 'Studio journal', kind: 'Decision', date: '2026-11-03T11:45:00', time: 'Yesterday · 11:45', summary: 'One considered story each month, with a useful process note alongside it.', detail: 'The journal will focus on a single project story each month. A shorter process note will show one specific choice: a question asked, a detail changed, or something learned from using the work. The aim is a useful record of thinking, rather than a stream of announcements.', next: 'Choose a story with a clear before and after, and identify the decision that made the difference.' },
  { id: 'atlas-grid', author: 'Jo Rivera', initials: 'JR', title: 'A rhythm for the whole collection.', project: 'Atlas editorial', kind: 'Feedback', date: '2026-11-02T15:30:00', time: 'Monday · 15:30', summary: 'The smaller image pairs are working. Keep the opening spreads simple and let the captions do more.', detail: 'The revised grid gives the long stories a more relaxed rhythm. Image pairs are particularly useful when they show a change in scale. The opening spreads can carry less introductory copy; the captions are a better home for specific context.', next: 'Try a complete eight-page sequence to check how the quiet pages support the larger moments.' },
  { id: 'meadow-prototype', author: 'Alex Lee', initials: 'AL', title: 'A working version, ready to learn from.', project: 'Meadow booking', kind: 'Milestone', date: '2026-11-02T10:05:00', time: 'Monday · 10:05', summary: 'The booking flow now covers date selection, review, and a clear confirmation.', detail: 'The first prototype includes the complete booking path, including the unavailable-date and changed-plan states. The review step makes the date, group size, and cancellation terms visible together. It is ready for a small round of usability sessions.', next: 'Ask people to book for a real occasion, then change one detail before confirming.' },
]
const initialState: InboxState = { read: ['journal-format', 'atlas-grid', 'meadow-prototype'], saved: [], notes: {} }
const kindIcons = { Feedback: MessageCircle, Milestone: FileCheck2, Decision: CircleCheck }
function isInboxState(value: unknown): value is InboxState {
  if (!value || typeof value !== 'object') return false
  const state = value as InboxState
  return Array.isArray(state.read) && state.read.every((id) => typeof id === 'string') && Array.isArray(state.saved) && state.saved.every((id) => typeof id === 'string') && Boolean(state.notes) && typeof state.notes === 'object' && !Array.isArray(state.notes) && Object.values(state.notes).every((note) => typeof note === 'string')
}

export function Activity() {
  const [state, setState] = React.useState(() => readDemoValue(demoStorageKeys.activity, initialState, isInboxState))
  const [scope, setScope] = React.useState<'all' | 'unread' | 'saved'>('all')
  const [query, setQuery] = React.useState('')
  const [kind, setKind] = React.useState('all')
  const [selected, setSelected] = React.useState<Update | null>(null)
  const [note, setNote] = React.useState('')
  const [commandOpen, setCommandOpen] = React.useState(false)
  const returnFocus = React.useRef<HTMLElement | null>(null)
  const filterFocus = React.useRef<HTMLButtonElement>(null)
  const { notice, notify, dismiss } = useDemoNotice()
  const unreadCount = updates.filter((item) => !state.read.includes(item.id)).length
  const savedCount = updates.filter((item) => state.saved.includes(item.id)).length
  const filtered = updates.filter((item) => (scope !== 'unread' || !state.read.includes(item.id)) && (scope !== 'saved' || state.saved.includes(item.id)) && (kind === 'all' || item.kind === kind) && `${item.title} ${item.project} ${item.author} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase()))

  React.useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (!selected) setCommandOpen((open) => !open) }
    }
    document.addEventListener('keydown', shortcut)
    return () => document.removeEventListener('keydown', shortcut)
  }, [selected])
  function save(next: InboxState, title?: string) {
    setState(next)
    const persisted = writeDemoValue(demoStorageKeys.activity, next)
    if (title || !persisted) notify(title ?? 'Updated for this session', persisted ? 'Your inbox preferences are saved in this browser.' : 'Browser storage is unavailable. This change lasts for this session.')
  }
  function toggleRead(id: string) {
    const wasRead = state.read.includes(id)
    save({ ...state, read: wasRead ? state.read.filter((item) => item !== id) : [...state.read, id] })
    if (scope === 'unread' && !wasRead && !selected) requestAnimationFrame(() => filterFocus.current?.focus())
  }
  function toggleSaved(id: string) {
    const wasSaved = state.saved.includes(id)
    save({ ...state, saved: wasSaved ? state.saved.filter((item) => item !== id) : [...state.saved, id] })
    if (scope === 'saved' && wasSaved && !selected) requestAnimationFrame(() => filterFocus.current?.focus())
  }
  function openDetail(item: Update, fromMenu = false) {
    returnFocus.current = fromMenu ? document.getElementById(`activity-${item.id}`) : document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelected(item)
    setNote(state.notes[item.id] ?? '')
  }
  function clearFilters() { setScope('all'); setKind('all'); setQuery('') }
  function markVisibleRead() { save({ ...state, read: [...new Set([...state.read, ...filtered.map((item) => item.id)])] }, 'Visible updates marked as read') }
  const actions = [
    { id: 'unread', label: 'Show unread updates', description: `${unreadCount} updates to catch up on`, icon: <Inbox size={17} />, onSelect: () => { clearFilters(); setScope('unread') } },
    { id: 'saved', label: 'Open saved updates', description: 'The notes you want to come back to', icon: <Bookmark size={17} />, onSelect: () => { clearFilters(); setScope('saved') } },
    { id: 'all', label: 'Show all activity', description: 'Clear filters and see the whole picture', icon: <SlidersHorizontal size={17} />, onSelect: clearFilters },
    { id: 'read', label: 'Mark all updates as read', description: 'Keep saved updates and personal notes', icon: <CheckCheck size={17} />, disabled: unreadCount === 0, onSelect: () => save({ ...state, read: updates.map((item) => item.id) }, 'All caught up') },
    { id: 'brief', label: 'Start a project brief', description: 'Make a thoughtful beginning', icon: <NotebookPen size={17} />, onSelect: () => { window.location.hash = '/examples/onboarding' } },
    ...updates.map((item) => ({ id: item.id, label: item.title, description: item.project, keywords: [item.author, item.kind], icon: <Search size={17} />, onSelect: () => { clearFilters(); setQuery(item.project) } })),
  ]

  return <ExampleShell active="activity" notice={notice} dismissNotice={dismiss}>
    <div className="fw-page-heading"><div><p className="fw-eyebrow"><Inbox size={13} aria-hidden="true" /> Studio inbox / Wednesday, November 4</p><h1>Keep the work in view.</h1><p className="fw-page-subtitle">Small updates. Shared decisions. A little less catching up.</p></div><CommandDialog open={commandOpen} onOpenChange={setCommandOpen} title="Find your next move" description="Search studio updates or choose an inbox action." label="Search updates and actions" placeholder="An update, project, or action…" items={actions} trigger={<Button variant="outline"><CommandIcon aria-hidden="true" />Quick actions<Kbd>⌘ K</Kbd></Button>} /></div>
    <div className="fw-inbox-layout">
      <Card className="fw-inbox-main"><h2 className="sr-only">Studio activity</h2>
        <div className="fw-inbox-top"><div className="fw-inbox-tabs" role="group" aria-label="Activity view">{([{ id: 'all', label: 'All activity', count: updates.length }, { id: 'unread', label: 'Unread', count: unreadCount }, { id: 'saved', label: 'Saved', count: savedCount }] as const).map((view) => <Button key={view.id} ref={scope === view.id ? filterFocus : undefined} variant={scope === view.id ? 'soft' : 'ghost'} aria-pressed={scope === view.id} onClick={() => setScope(view.id)}>{view.label}<span className="fw-inbox-count">{view.count}</span></Button>)}</div><Button variant="ghost" size="sm" onClick={markVisibleRead} disabled={!filtered.some((item) => !state.read.includes(item.id))}><CheckCheck aria-hidden="true" />Mark visible read</Button></div>
        <div className="fw-inbox-tools"><div className="fw-search"><Search size={16} aria-hidden="true" /><Input type="search" aria-label="Search studio activity" placeholder="Find a project, person, or update…" value={query} onChange={(event) => setQuery(event.target.value)} /></div><Select value={kind} onValueChange={setKind}><SelectTrigger aria-label="Filter activity by type" className="fw-inbox-kind"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Every kind of update</SelectItem>{Object.keys(kindIcons).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
        <div className="fw-inbox-results"><span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'update' : 'updates'}{scope === 'unread' ? ' to catch up on' : scope === 'saved' ? ' in your collection' : ' from your studio'}</span><span>Newest first</span></div>
        <ScrollArea aria-label="Studio activity timeline" className="fw-inbox-scroll"><div className="fw-inbox-scroll-content">{filtered.length ? <Timeline>{filtered.map((item) => {
          const isRead = state.read.includes(item.id), isSaved = state.saved.includes(item.id), Icon = kindIcons[item.kind]
          return <TimelineItem key={item.id} className="fw-update-item"><ContextMenu><ContextMenuTrigger asChild><article id={`activity-${item.id}`} className="fw-update" data-read={isRead} tabIndex={0} aria-label={`${item.project}: ${item.title}`}><div className="fw-update-meta"><Badge variant="outline"><Icon size={11} aria-hidden="true" />{item.kind}</Badge><TimelineTime dateTime={item.date}>{item.time}</TimelineTime>{!isRead && <span className="fw-unread-dot"><span className="sr-only">Unread</span></span>}</div><TimelineTitle><button className="fw-update-title" onClick={() => openDetail(item)}>{item.title}</button></TimelineTitle><TimelineDescription>{item.summary}</TimelineDescription><div className="fw-update-bottom"><div className="fw-update-author"><Avatar className="size-6"><AvatarFallback>{item.initials}</AvatarFallback></Avatar><span>{item.author}<span> / {item.project}</span></span></div><div className="fw-update-actions"><IconButton label={`${isRead ? 'Mark unread' : 'Mark read'}: ${item.title}`} variant="ghost" size="sm" onClick={() => toggleRead(item.id)}><CheckCheck aria-hidden="true" className={isRead ? 'text-primary' : ''} /></IconButton><IconButton label={`${isSaved ? 'Unsave' : 'Save'}: ${item.title}`} aria-pressed={isSaved} variant="ghost" size="sm" onClick={() => toggleSaved(item.id)}><Bookmark aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} /></IconButton></div></div></article></ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>{item.project}</ContextMenuLabel><ContextMenuItem onSelect={() => openDetail(item, true)}>Read the full update</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem onSelect={() => toggleRead(item.id)}>{isRead ? 'Mark as unread' : 'Mark as read'}</ContextMenuItem><ContextMenuItem onSelect={() => toggleSaved(item.id)}>{isSaved ? 'Remove from saved' : 'Save for later'}</ContextMenuItem></ContextMenuContent></ContextMenu></TimelineItem>
        })}</Timeline> : <EmptyState icon={scope === 'saved' ? <Bookmark /> : scope === 'unread' ? <CheckCheck /> : <Search />} title={query || kind !== 'all' ? 'Nothing in this corner, yet.' : scope === 'saved' ? 'Keep the useful things close.' : 'A little breathing room.'} description={query || kind !== 'all' ? 'Try another project, person, or kind of update. The rest of the studio is one click away.' : scope === 'saved' ? 'Save an update with the bookmark button and you’ll find it here when you need it.' : 'You’re caught up on every studio update. Your read updates are still here whenever you need them.'} action={<Button variant="outline" onClick={clearFilters}>See all activity<ArrowRight aria-hidden="true" /></Button>} />}</div></ScrollArea>
        <div className="fw-inbox-footnote"><span>Reading and saving are just for you.</span><span>Stored in this browser</span></div>
      </Card>
      <aside className="fw-inbox-aside"><Card className="fw-inbox-digest"><div className="fw-inbox-digest-icon"><Sparkles size={23} aria-hidden="true" /></div><p className="fw-eyebrow">The studio, at a glance</p><h2>Good work<br />moves together.</h2><p>There’s a useful rhythm to a studio: share a thought, make a decision, move something forward.</p><dl><div><dt>To catch up on</dt><dd>{unreadCount.toString().padStart(2, '0')}</dd></div><div><dt>Saved for later</dt><dd>{savedCount.toString().padStart(2, '0')}</dd></div><div><dt>Milestones shared</dt><dd>{updates.filter((item) => item.kind === 'Milestone').length.toString().padStart(2, '0')}</dd></div></dl></Card><Card className="fw-inbox-tip"><span className="fw-eyebrow">A quieter kind of inbox</span><h3>Make it yours.</h3><p>Filter down to what matters. Keep a private note on an update. Save a thought for another day.</p><div><Kbd>⌘ / Ctrl</Kbd><Kbd>K</Kbd><span>Find your next move</span></div></Card><p className="fw-local-note">A fictional studio with working local controls. No notifications or messages are sent.</p></aside>
    </div>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null) }}><DialogContent className="fw-update-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); (returnFocus.current?.isConnected ? returnFocus.current : filterFocus.current)?.focus() }}>{selected && <><DialogHeader><p className="fw-eyebrow">{selected.project} / {selected.kind}</p><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.author} · {selected.time}</DialogDescription></DialogHeader><div className="fw-story"><p>{selected.detail}</p><h3>A useful next step</h3><p>{selected.next}</p></div><div className="fw-update-dialog-actions"><Button variant="outline" onClick={() => toggleRead(selected.id)}>{state.read.includes(selected.id) ? <CheckCheck aria-hidden="true" /> : <Check aria-hidden="true" />}{state.read.includes(selected.id) ? 'Mark as unread' : 'Mark as read'}</Button><Button variant="outline" aria-pressed={state.saved.includes(selected.id)} onClick={() => toggleSaved(selected.id)}><Bookmark aria-hidden="true" fill={state.saved.includes(selected.id) ? 'currentColor' : 'none'} />{state.saved.includes(selected.id) ? 'Saved for later' : 'Save for later'}</Button></div><form className="fw-personal-note" onSubmit={(event) => { event.preventDefault(); save({ ...state, notes: { ...state.notes, [selected.id]: note.trim() } }); event.currentTarget.querySelector('textarea')?.focus() }}><Field label="A note to yourself" description="Private to this browser. This won’t send a reply to the studio."><Textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} maxLength={2000} placeholder="Something to remember, a question to ask…" /></Field><p role="status" className="fw-local-note">{state.notes[selected.id] !== undefined && note.trim() === state.notes[selected.id] ? 'Personal note saved in this browser.' : ''}</p><Button type="submit" size="sm" disabled={note.trim() === (state.notes[selected.id] ?? '')}><NotebookPen aria-hidden="true" />Save personal note</Button></form></>}</DialogContent></Dialog>
  </ExampleShell>
}

export default Activity
