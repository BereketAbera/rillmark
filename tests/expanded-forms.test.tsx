import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field } from '@/components/ui/field'
import { NumberInput } from '@/components/ui/number-input'
import { TagInput } from '@/components/ui/tag-input'
import { FileDropzone } from '@/components/ui/file-dropzone'
import { Stepper } from '@/components/ui/stepper'
import { Timeline, TimelineItem, TimelineTitle, TimelineTime } from '@/components/ui/timeline'
import { Meter } from '@/components/ui/meter'
import { Spinner } from '@/components/ui/spinner'
import { Kbd } from '@/components/ui/kbd'

describe('NumberInput', () => {
  it('retains empty editing, clamps on blur, steps within bounds and resets with its form', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(<form><Field label="Seats" description="Between 1 and 10."><NumberInput name="seats" min={1} max={10} defaultValue={3} onValueChange={change}/></Field><button type="reset">Reset</button></form>)
    const input = screen.getByRole('spinbutton', { name: 'Seats' })
    expect(input).toHaveAccessibleDescription('Between 1 and 10.')
    await user.clear(input)
    expect(input).toHaveValue(null)
    expect(change).toHaveBeenLastCalledWith('')
    await user.type(input, '12')
    expect(input).toHaveValue(12)
    await user.tab()
    expect(input).toHaveValue(10)
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(input).toHaveValue(9)
    expect(input).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(input).toHaveValue(3)
  })

  it('steps decimals in controlled mode and disables every action through Field', async () => {
    const user = userEvent.setup()
    function Example() { const [value, setValue] = React.useState<number | ''>(0.2); return <Field label="Distance"><NumberInput value={value} onValueChange={setValue} min={0} max={1} step={0.1}/></Field> }
    const { rerender } = render(<Example/>)
    await user.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(screen.getByRole('spinbutton')).toHaveValue(0.3)
    await user.clear(screen.getByRole('spinbutton'))
    await user.type(screen.getByRole('spinbutton'), '0.7')
    expect(screen.getByRole('spinbutton')).toHaveValue(0.7)
    rerender(<Field label="Fixed distance" disabled><NumberInput defaultValue={2}/></Field>)
    expect(screen.getByRole('spinbutton')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled()
  })
})

describe('TagInput', () => {
  it('adds trimmed unique tags, submits repeated values, enforces limits and removes from the keyboard', async () => {
    const user = userEvent.setup()
    render(<form data-testid="tags"><Field label="Topics" required><TagInput name="topics" defaultValue={['Design']} maxTags={2}/></Field></form>)
    const input = screen.getByRole('textbox', { name: 'Topics' }) as HTMLInputElement
    await user.type(input, ' design {Enter}')
    expect(screen.getByRole('status')).toHaveTextContent('design is already included.')
    await user.clear(input)
    await user.type(input, ' Research,{Enter}')
    expect(within(screen.getByRole('list', { name: 'Added tags' })).getAllByRole('listitem')).toHaveLength(2)
    expect(new FormData(screen.getByTestId('tags') as HTMLFormElement).getAll('topics')).toEqual(['Design', 'Research'])
    await user.type(input, 'Writing{Enter}')
    expect(screen.getByRole('status')).toHaveTextContent('Add up to 2 tags.')
    await user.clear(input)
    await user.keyboard('{Backspace}')
    expect(screen.getByRole('button', { name: 'Remove Research' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(input).toHaveFocus()
    expect(screen.queryByRole('button', { name: 'Remove Research' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove Design' }))
    await user.type(input, 'Uncommitted')
    expect(input.validity.valid).toBe(false)
    await user.keyboard('{Enter}')
    expect(input.validity.valid).toBe(true)
  })

  it('supports controlled state, form reset and a read-only collection', async () => {
    const user = userEvent.setup()
    function Controlled() { const [tags, setTags] = React.useState(['One']); return <Field label="Controlled"><TagInput value={tags} onValueChange={setTags}/></Field> }
    const { rerender } = render(<Controlled/>)
    await user.type(screen.getByRole('textbox'), 'Two{Enter}')
    expect(screen.getByRole('button', { name: 'Remove Two' })).toBeInTheDocument()
    rerender(<form><TagInput aria-label="Resettable" defaultValue={['Initial']}/><button type="reset">Reset</button></form>)
    await user.type(screen.getByRole('textbox'), 'More{Enter}')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.queryByRole('button', { name: 'Remove More' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove Initial' })).toBeInTheDocument()
    rerender(<TagInput aria-label="Fixed topics" value={['Design']} readOnly/>)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

describe('FileDropzone', () => {
  it('selects through the native input, removes a file and clears the actual input', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(<Field label="References" description="Local selection only." required><FileDropzone accept="image/*,.pdf" maxFiles={2} onFilesChange={change}/></Field>)
    const input = screen.getByLabelText(/^References/) as HTMLInputElement
    const file = new File(['photo'], 'cover.png', { type: 'image/png' })
    await user.upload(input, file)
    expect(change).toHaveBeenLastCalledWith([file])
    expect(input.files).toHaveLength(1)
    expect(screen.getByRole('list', { name: 'Selected files' })).toHaveTextContent('cover.png')
    await user.click(screen.getByRole('button', { name: 'Remove cover.png' }))
    expect(input.files).toHaveLength(0)
    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
    expect(input).toBeRequired()
  })

  it('validates dropped type, size and count and reports errors without claiming upload', () => {
    const change = vi.fn()
    const { container } = render(<Field label="References"><FileDropzone accept=".pdf" maxSize={4} maxFiles={1} onFilesChange={change}/></Field>)
    const valid = new File(['ok'], 'brief.pdf', { type: 'application/pdf' })
    const wrong = new File(['ok'], 'notes.txt', { type: 'text/plain' })
    const large = new File(['too large'], 'large.pdf', { type: 'application/pdf' })
    const extra = new File(['ok'], 'extra.pdf', { type: 'application/pdf' })
    fireEvent.drop(container.querySelector('[data-dragging]') ?? container.querySelector('[data-slot="file-dropzone"] > div')!, { dataTransfer: { files: [valid, wrong, large, extra] } })
    expect(change).toHaveBeenCalledWith([valid])
    expect(screen.getByRole('alert')).toHaveTextContent('notes.txt: file type is not accepted.')
    expect(screen.getByRole('alert')).toHaveTextContent('large.pdf: exceeds')
    expect(screen.getByRole('alert')).toHaveTextContent('Choose up to 1 file.')
    expect(screen.getByLabelText('References')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText(/Files stay on your device/)).toBeInTheDocument()
  })

  it('ignores drops while disabled and replaces controlled selection', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    const file = new File(['data'], 'reference.pdf', { type: 'application/pdf' })
    const { container, rerender } = render(<Field label="References" disabled><FileDropzone onFilesChange={change}/></Field>)
    const drop = container.querySelector('[data-slot="file-dropzone"] > div')!
    fireEvent.drop(drop, { dataTransfer: { files: [file] } })
    expect(change).not.toHaveBeenCalled()
    expect(screen.getByLabelText('References')).toBeDisabled()
    function Controlled() { const [files, setFiles] = React.useState<File[]>([]); return <Field label="References"><FileDropzone files={files} onFilesChange={setFiles}/></Field> }
    rerender(<Controlled/>)
    await user.upload(screen.getByLabelText('References'), file)
    expect(screen.getByRole('list', { name: 'Selected files' })).toHaveTextContent('reference.pdf')
    const next = new File(['data'], 'next.pdf', { type: 'application/pdf' })
    await user.upload(screen.getByLabelText('References'), next)
    expect(screen.queryByRole('button', { name: 'Remove reference.pdf' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove next.pdf' })).toBeInTheDocument()
  })
})

describe('progress and supporting semantics', () => {
  it('exposes the current step and supports native keyboard navigation with disabled future steps', async () => {
    const user = userEvent.setup()
    const steps = [{ id: 'brief', title: 'Brief' }, { id: 'team', title: 'Team' }, { id: 'review', title: 'Review', disabled: true }]
    function Example() { const [step, setStep] = React.useState('brief'); return <Stepper steps={steps} value={step} onValueChange={setStep}/> }
    render(<Example/>)
    expect(screen.getByRole('button', { name: 'Brief' })).toHaveAttribute('aria-current', 'step')
    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Team' })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByRole('button', { name: 'Brief, completed' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('button', { name: 'Review' })).toBeDisabled()
  })

  it('retains timeline heading/time semantics, native measurements and readable loading labels', () => {
    render(<><Timeline aria-label="Activity"><TimelineItem><TimelineTitle as="h2">Approved</TimelineTitle><TimelineTime dateTime="2026-11-04">Today</TimelineTime></TimelineItem></Timeline><Meter aria-label="Storage" value={150} max={100}/><Spinner label="Refreshing files"/><Kbd>Esc</Kbd></>)
    expect(screen.getByRole('list', { name: 'Activity' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Approved' })).toBeInTheDocument()
    expect(screen.getByText('Today')).toHaveAttribute('datetime', '2026-11-04')
    expect(screen.getByRole('meter', { name: 'Storage' })).toHaveAttribute('value', '100')
    expect(screen.getByRole('status')).toHaveTextContent('Refreshing files')
    expect(screen.getByText('Esc').tagName).toBe('KBD')
  })
})
