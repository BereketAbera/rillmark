import { Check, MessageSquare, Plus } from 'lucide-react'
import { Timeline, TimelineItem, TimelineTitle, TimelineDescription, TimelineTime } from 'rillmark/timeline'

export default function ComponentDemo() {
  return <Timeline aria-label="Project activity" className="w-full max-w-md"><TimelineItem icon={<Check/>}><TimelineTitle>Direction approved</TimelineTitle><TimelineDescription>Maya signed off on the concept. The next phase is ready.</TimelineDescription><TimelineTime dateTime="2026-11-04T10:30:00Z">Today, 10:30</TimelineTime></TimelineItem><TimelineItem icon={<MessageSquare/>}><TimelineTitle>Feedback shared</TimelineTitle><TimelineDescription>Three notes on the first exploration.</TimelineDescription><TimelineTime dateTime="2026-11-03T15:00:00Z">Yesterday, 15:00</TimelineTime></TimelineItem><TimelineItem icon={<Plus/>}><TimelineTitle>Project created</TimelineTitle><TimelineDescription>A new place for an idea to take shape.</TimelineDescription><TimelineTime dateTime="2026-11-02T09:00:00Z">November 2, 09:00</TimelineTime></TimelineItem></Timeline>
}
