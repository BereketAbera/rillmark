import * as React from 'react'
import { ArrowRight, Check, Circle, CircleCheck, Leaf, LockKeyhole, RotateCcw, Save } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Combobox } from '@/components/ui/combobox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { demoStorageKeys, ExampleShell, readDemoValue, useDemoNotice, writeDemoValue } from './example-shell'

type Profile = { name: string; email: string; role: string; bio: string }
type Workspace = { name: string; timezone: string; weekStart: string; projectDigest: boolean }
type Preferences = { delivery: string; mentions: boolean; studioNotes: boolean; focusHours: number }
type SettingsData = { profile: Profile; workspace: Workspace; preferences: Preferences }

const defaults: SettingsData = {
  profile: { name: 'Alex Lee', email: 'alex@fieldwork.example', role: 'designer', bio: '' },
  workspace: { name: 'Fieldwork studio', timezone: 'Europe/London', weekStart: 'monday', projectDigest: true },
  preferences: { delivery: 'weekly', mentions: true, studioNotes: false, focusHours: 20 },
}
const roles = [{ value: 'designer', label: 'Designer', keywords: ['creative', 'visual'] }, { value: 'strategist', label: 'Strategist', keywords: ['brand', 'research'] }, { value: 'developer', label: 'Developer', keywords: ['engineering', 'code'] }, { value: 'producer', label: 'Producer', keywords: ['project', 'management'] }, { value: 'writer', label: 'Writer', keywords: ['copy', 'editorial'] }]
const timezones = [{ value: 'Europe/London', label: 'London · Europe/London', keywords: ['GMT', 'UK'] }, { value: 'America/New_York', label: 'New York · America/New_York', keywords: ['EST', 'US'] }, { value: 'America/Los_Angeles', label: 'Los Angeles · America/Los_Angeles', keywords: ['PST', 'US'] }, { value: 'Africa/Addis_Ababa', label: 'Addis Ababa · Africa/Addis_Ababa', keywords: ['EAT', 'Ethiopia'] }, { value: 'Asia/Singapore', label: 'Singapore · Asia/Singapore', keywords: ['SGT'] }, { value: 'Australia/Melbourne', label: 'Melbourne · Australia/Melbourne', keywords: ['AEST'] }]

function isSettings(value: unknown): value is SettingsData {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  if (!candidate.profile || typeof candidate.profile !== 'object' || !candidate.workspace || typeof candidate.workspace !== 'object' || !candidate.preferences || typeof candidate.preferences !== 'object') return false
  const profile = candidate.profile as Record<string, unknown>, workspace = candidate.workspace as Record<string, unknown>, preferences = candidate.preferences as Record<string, unknown>
  return ['name', 'email', 'role', 'bio'].every((key) => typeof profile[key] === 'string') && roles.some((role) => role.value === profile.role) && typeof workspace.name === 'string' && timezones.some((timezone) => timezone.value === workspace.timezone) && ['monday', 'sunday'].includes(String(workspace.weekStart)) && typeof workspace.projectDigest === 'boolean' && ['weekly', 'instant', 'none'].includes(String(preferences.delivery)) && typeof preferences.mentions === 'boolean' && typeof preferences.studioNotes === 'boolean' && typeof preferences.focusHours === 'number' && preferences.focusHours >= 0 && preferences.focusHours <= 40
}

export function Settings() {
  const [saved, setSaved] = React.useState(() => readDemoValue(demoStorageKeys.settings, defaults, isSettings))
  const [profile, setProfile] = React.useState(saved.profile)
  const [workspace, setWorkspace] = React.useState(saved.workspace)
  const [preferences, setPreferences] = React.useState(saved.preferences)
  const [profileErrors, setProfileErrors] = React.useState<Partial<Record<keyof Profile, string>>>({})
  const [workspaceError, setWorkspaceError] = React.useState('')
  const { notice, notify, dismiss } = useDemoNotice()
  const checklist = [
    { label: 'Make your name known', complete: saved.profile.name.trim().length >= 2 },
    { label: 'Add your contact email', complete: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(saved.profile.email) },
    { label: 'Find your role in the studio', complete: Boolean(saved.profile.role) },
    { label: 'Share a little about yourself', complete: saved.profile.bio.trim().length > 0 },
  ]
  const completeCount = checklist.filter((item) => item.complete).length
  function save(next: SettingsData, title: string) {
    setSaved(next)
    const persisted = writeDemoValue(demoStorageKeys.settings, next)
    notify(title, persisted ? 'Your demo preferences are saved in this browser.' : 'Updated for this session. Browser storage is unavailable.')
  }
  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: typeof profileErrors = {}
    if (profile.name.trim().length < 2) nextErrors.name = 'Enter a name with at least 2 characters.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) nextErrors.email = 'Enter a valid email address, such as alex@example.com.'
    if (!roles.some((role) => role.value === profile.role)) nextErrors.role = 'Choose your role from the list.'
    setProfileErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) { requestAnimationFrame(() => document.getElementById(`profile-${firstError}`)?.focus()); return }
    const nextProfile = { ...profile, name: profile.name.trim(), email: profile.email.trim(), bio: profile.bio.trim() }
    setProfile(nextProfile)
    save({ ...saved, profile: nextProfile }, 'Your profile is up to date')
  }
  function saveWorkspace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (workspace.name.trim().length < 2) { setWorkspaceError('Give your workspace a name with at least 2 characters.'); requestAnimationFrame(() => document.getElementById('workspace-name')?.focus()); return }
    setWorkspaceError('')
    const nextWorkspace = { ...workspace, name: workspace.name.trim() }
    setWorkspace(nextWorkspace)
    save({ ...saved, workspace: nextWorkspace }, 'Workspace preferences saved')
  }
  function resetDemo() {
    let cleared = true
    try { for (const key of Object.values(demoStorageKeys)) localStorage.removeItem(key) } catch { cleared = false }
    setSaved(defaults)
    setProfile(defaults.profile)
    setWorkspace(defaults.workspace)
    setPreferences(defaults.preferences)
    setProfileErrors({})
    setWorkspaceError('')
    notify('A fresh start', cleared ? 'Demo projects, saved discoveries, and settings have been reset in this browser.' : 'Settings reset for this session. Browser storage could not be cleared.')
  }
  const profileDirty = JSON.stringify(profile) !== JSON.stringify(saved.profile)
  const workspaceDirty = JSON.stringify(workspace) !== JSON.stringify(saved.workspace)
  const preferencesDirty = JSON.stringify(preferences) !== JSON.stringify(saved.preferences)
  return <ExampleShell active="settings" notice={notice} dismissNotice={dismiss}>
    <div className="fw-page-heading"><div><p className="fw-eyebrow">A space that works for you</p><h1>Make yourself at home.</h1><p className="fw-page-subtitle">A few thoughtful details make working together a little easier.</p></div><Badge variant="soft"><LockKeyhole size={12} aria-hidden="true" />Only saved in this browser</Badge></div>
    <div className="fw-settings-grid">
      <div>
        <Tabs defaultValue="profile">
          <TabsList className="fw-settings-tabs" aria-label="Studio settings"><TabsTrigger value="profile">Your profile</TabsTrigger><TabsTrigger value="workspace">Workspace</TabsTrigger><TabsTrigger value="preferences">Preferences</TabsTrigger></TabsList>
          <TabsContent value="profile"><Card className="fw-settings-card"><h2>A name, a face, a point of view.</h2><p>Let the people you work with know a little more about you.</p>
            <div className="fw-settings-avatar"><Avatar className="size-12"><AvatarFallback className="text-base">{profile.name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join('').toUpperCase() || '?'}</AvatarFallback></Avatar><div><strong>{profile.name || 'Your name here'}</strong><p>Your initials are used as your profile image.</p></div></div>
            <form noValidate onSubmit={saveProfile}>
              <div className="fw-form-grid">
                <Field id="profile-name" label="Full name" required error={profileErrors.name}><Input name="name" autoComplete="name" maxLength={80} value={profile.name} onChange={(event) => { setProfile({ ...profile, name: event.target.value }); setProfileErrors({ ...profileErrors, name: undefined }) }} /></Field>
                <Field id="profile-email" label="Email address" required error={profileErrors.email}><Input name="email" type="email" autoComplete="email" maxLength={254} value={profile.email} onChange={(event) => { setProfile({ ...profile, email: event.target.value }); setProfileErrors({ ...profileErrors, email: undefined }) }} /></Field>
                <Field id="profile-role" className="fw-full-width" label="Your role" required description="Choose the closest fit. Good work rarely stays in one lane." error={profileErrors.role}><Combobox options={roles} value={profile.role} onValueChange={(role) => { setProfile({ ...profile, role }); setProfileErrors({ ...profileErrors, role: undefined }) }} searchPlaceholder="Find your discipline…" name="role" /></Field>
                <Field className="fw-full-width" label="A little about you" description={`${profile.bio.length}/280 characters. A sentence or two is plenty.`}><Textarea name="bio" maxLength={280} rows={4} placeholder="What are you curious about? What do you like making?" value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} /></Field>
              </div>
              <div className="fw-form-footer"><span className="fw-local-note">{profileDirty ? 'You have unsaved changes.' : 'Your profile is up to date.'}</span><Button type="submit" disabled={!profileDirty}><Save aria-hidden="true" />Save profile</Button></div>
            </form>
          </Card></TabsContent>
          <TabsContent value="workspace"><Card className="fw-settings-card"><h2>The shape of your studio.</h2><p>Shared defaults help everyone find their rhythm.</p>
            <form noValidate onSubmit={saveWorkspace}>
              <div className="grid gap-5">
                <Field id="workspace-name" label="Workspace name" required error={workspaceError}><Input name="workspaceName" maxLength={80} value={workspace.name} onChange={(event) => { setWorkspace({ ...workspace, name: event.target.value }); setWorkspaceError('') }} /></Field>
                <Field label="Studio time zone" description="A shared reference for project dates and planning."><Combobox options={timezones} value={workspace.timezone} onValueChange={(timezone) => setWorkspace({ ...workspace, timezone })} searchPlaceholder="Search by city or time zone…" name="timezone" /></Field>
                <Field label="Start the week on"><Select value={workspace.weekStart} onValueChange={(weekStart) => setWorkspace({ ...workspace, weekStart })} name="weekStart"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monday">Monday</SelectItem><SelectItem value="sunday">Sunday</SelectItem></SelectContent></Select></Field>
                <div className="fw-toggle-row"><div><label htmlFor="project-digest">Weekly project roundup</label><p>Keep a summary of the week's progress in your studio preferences.</p></div><Switch id="project-digest" checked={workspace.projectDigest} onCheckedChange={(projectDigest) => setWorkspace({ ...workspace, projectDigest })} /></div>
              </div>
              <Alert variant="soft" className="mt-3"><AlertDescription className="flex gap-2 text-xs"><CircleCheck size={16} className="mt-0.5 shrink-0" aria-hidden="true" />This is a local demo. No invitations or emails are sent.</AlertDescription></Alert>
              <div className="fw-form-footer"><span className="fw-local-note">{workspaceDirty ? 'You have unsaved changes.' : 'Workspace preferences are up to date.'}</span><Button type="submit" disabled={!workspaceDirty}><Save aria-hidden="true" />Save workspace</Button></div>
            </form>
          </Card></TabsContent>
          <TabsContent value="preferences"><Card className="fw-settings-card"><h2>Find a quieter rhythm.</h2><p>Choose what deserves your attention, and leave room for the work.</p>
            <form onSubmit={(event) => { event.preventDefault(); save({ ...saved, preferences }, 'Your preferences are saved') }}>
              <Field label="How would you like to catch up?" description="A local preview of your notification preferences."><RadioGroup value={preferences.delivery} onValueChange={(delivery) => setPreferences({ ...preferences, delivery })} name="delivery" className="gap-2">
                <div className="fw-radio-option"><RadioGroupItem value="weekly" id="delivery-weekly" /><label htmlFor="delivery-weekly">A weekly digest<small>One considered roundup, once a week.</small></label></div>
                <div className="fw-radio-option"><RadioGroupItem value="instant" id="delivery-instant" /><label htmlFor="delivery-instant">As things happen<small>A timely note when the work moves forward.</small></label></div>
                <div className="fw-radio-option"><RadioGroupItem value="none" id="delivery-none" /><label htmlFor="delivery-none">I'll check in myself<small>Keep email quiet. Everything stays in the workspace.</small></label></div>
              </RadioGroup></Field>
              <div className="mt-5"><div className="fw-toggle-row"><div><label htmlFor="notify-mentions">When someone mentions me</label><p>Make it easier to pick up a conversation.</p></div><Switch id="notify-mentions" checked={preferences.mentions} onCheckedChange={(mentions) => setPreferences({ ...preferences, mentions })} /></div><div className="fw-toggle-row"><div><label htmlFor="notify-notes">Notes from the studio</label><p>Occasional ideas and things worth sharing.</p></div><Switch id="notify-notes" checked={preferences.studioNotes} onCheckedChange={(studioNotes) => setPreferences({ ...preferences, studioNotes })} /></div></div>
              <div className="mt-6 rounded-xl bg-muted p-4"><Field label={<span className="flex items-center justify-between gap-4"><span>Weekly focus goal</span><span className="font-normal tabular-nums">{preferences.focusHours} hours</span></span>} description="A planning intention, not a timesheet. Adjust in two-hour steps."><Slider min={0} max={40} step={2} value={[preferences.focusHours]} onValueChange={([focusHours]) => setPreferences({ ...preferences, focusHours })} thumbLabels={['Weekly focus goal in hours']} /></Field></div>
              <div className="fw-form-footer"><span className="fw-local-note">{preferencesDirty ? 'You have unsaved changes.' : 'Your preferences are up to date.'}</span><Button type="submit" disabled={!preferencesDirty}><Save aria-hidden="true" />Save preferences</Button></div>
            </form>
          </Card></TabsContent>
        </Tabs>
        <div className="fw-danger-zone"><div><h3>Start the demo again</h3><p>Restore sample projects, clear saved discoveries, and reset these settings.</p></div><AlertDialog><AlertDialogTrigger asChild><Button variant="outline" size="sm"><RotateCcw aria-hidden="true" />Reset demo</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Reset this local demo?</AlertDialogTitle><AlertDialogDescription>This removes the projects you created, saved discoveries, and profile changes from this browser. The original Fieldwork examples will be restored. No account or server data is affected.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep my changes</AlertDialogCancel><AlertDialogAction onClick={resetDemo}>Reset demo data</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>
      </div>
      <aside className="fw-settings-aside" aria-label="Profile setup progress"><Card className="fw-onboarding"><Leaf size={26} className="text-primary" aria-hidden="true" /><h2>{completeCount === 4 ? 'A good place to begin.' : 'The small details matter.'}</h2><p>{completeCount === 4 ? 'Your profile is ready. Bring your point of view to the work.' : 'Help the people around you understand what you bring to the work.'}</p><div className="mb-2 flex justify-between text-[10px] text-muted-foreground"><span>Profile setup</span><span>{completeCount} of 4 complete</span></div><Progress value={completeCount * 25} aria-label="Profile setup progress" /><ul className="fw-checklist">{checklist.map((item) => <li key={item.label}>{item.complete ? <Check size={14} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}<span>{item.label}<span className="sr-only">: {item.complete ? 'complete' : 'incomplete'}</span></span></li>)}</ul>{completeCount === 4 && <Button asChild variant="soft" size="sm" className="mt-5 w-full"><a href="#/examples/dashboard">Back to the work<ArrowRight aria-hidden="true" /></a></Button>}</Card><div className="fw-settings-help"><h3>Your own pace.</h3><p>Nothing here needs to be perfect. You can come back and change any of these details whenever you like.</p></div></aside>
    </div>
  </ExampleShell>
}

export default Settings
