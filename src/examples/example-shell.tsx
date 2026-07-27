import * as React from 'react'
import { ArrowUpRight, Compass, Inbox, LayoutGrid, NotebookPen, Settings2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import './example.css'

export const demoStorageKeys = {
  projects: 'rillmark-fieldwork-projects-v1',
  settings: 'rillmark-fieldwork-settings-v1',
  bookmarks: 'rillmark-fieldwork-bookmarks-v1',
  brief: 'rillmark-fieldwork-brief-v1',
  activity: 'rillmark-fieldwork-activity-v1',
} as const

export function readDemoValue<T>(key: string, fallback: T, validate: (value: unknown) => value is T): T {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    return validate(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeDemoValue(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

type Notice = { id: number; title: string; description: string } | null

export function useDemoNotice() {
  const [notice, setNotice] = React.useState<Notice>(null)
  const nextId = React.useRef(0)
  function notify(title: string, description = 'Saved in this browser. No data is sent to a server.') {
    setNotice({ id: ++nextId.current, title, description })
  }
  return { notice, notify, dismiss: () => setNotice(null) }
}

const navigation = [
  { id: 'dashboard', name: 'Workspace', icon: LayoutGrid },
  { id: 'onboarding', name: 'Brief', icon: NotebookPen },
  { id: 'activity', name: 'Inbox', icon: Inbox },
  { id: 'discovery', name: 'Discover', icon: Compass },
  { id: 'settings', name: 'Settings', icon: Settings2 },
] as const

export function FieldworkMark({ className }: { className?: string }) {
  return <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M7 4h7L7 24H0L7 4Z" fill="currentColor" /><path d="M20 4h8l-7 20h-8l7-20Z" fill="currentColor" /></svg>
}

export function ExampleShell({ active, notice, dismissNotice, children }: { active: typeof navigation[number]['id']; notice: Notice; dismissNotice: () => void; children: React.ReactNode }) {
  return <ToastProvider>
    <div className="fw-app">
      <header className="fw-app-header">
        <a href="#/examples/dashboard" className="fw-brand"><FieldworkMark /><span>Fieldwork<span className="fw-brand-dot">®</span></span></a>
        <nav aria-label="Fieldwork example navigation" className="fw-nav">
          {navigation.map(({ id, name, icon: Icon }) => <a key={id} href={`#/examples/${id}`} aria-current={active === id ? 'page' : undefined}><Icon size={15} aria-hidden="true" /><span>{name}</span></a>)}
        </nav>
        <div className="fw-header-end"><Badge variant="outline" className="fw-demo-label">Local demo</Badge><a href="#/examples/settings" aria-label="AL — Open Alex Lee's profile" className="fw-profile-link"><Avatar className="size-8"><AvatarFallback>AL</AvatarFallback></Avatar></a></div>
      </header>
      <div className="fw-page">{children}</div>
      <footer className="fw-footer"><span><span className="fw-status-dot" /> A small studio. A shared point of view.</span><a href="#/docs/getting-started">Built with Rillmark <ArrowUpRight size={13} aria-hidden="true" /></a></footer>
    </div>
    {notice && <Toast key={notice.id} open onOpenChange={(open) => { if (!open) dismissNotice() }} variant="success"><ToastTitle>{notice.title}</ToastTitle><ToastDescription>{notice.description}</ToastDescription><ToastClose /></Toast>}
    <ToastViewport />
  </ToastProvider>
}
