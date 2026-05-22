import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Combobox } from '@/components/ui/combobox'

it.each(['disabled', 'loading'] as const)('blocks child activation when a slotted Button is %s, even if focused programmatically', async (state) => {
  const user = userEvent.setup()
  const action = vi.fn()
  const capture = vi.fn()
  const parentAction = vi.fn()
  render(<>
    <Button asChild disabled={state === 'disabled'} loading={state === 'loading'} onClick={parentAction}><a href="#destination" onClick={action} onClickCapture={capture}>Unavailable action</a></Button>
    <Button disabled>Native disabled</Button>
    <Button>Next action</Button>
  </>)
  const link = screen.getByRole('link', { name: 'Unavailable action' })
  const next = screen.getByRole('button', { name: 'Next action' })
  await user.tab()
  expect(next).toHaveFocus()
  expect(link).toHaveAttribute('tabindex', '-1')
  screen.getByRole('button', { name: 'Native disabled' }).focus()
  expect(next).toHaveFocus()
  link.focus()
  expect(link).toHaveFocus()
  await user.keyboard('{Enter}')
  expect(fireEvent.click(link)).toBe(false)
  expect(action).not.toHaveBeenCalled()
  expect(capture).not.toHaveBeenCalled()
  expect(parentAction).not.toHaveBeenCalled()
})

it('keeps native label activation connected with an explicit control id', async () => {
  const user = userEvent.setup()
  render(<Field label="Account name"><Input id="account-name" /></Field>)
  await user.click(screen.getByText('Account name'))
  expect(screen.getByRole('textbox', { name: 'Account name' })).toHaveFocus()
})

it('starts a default slider at its supplied minimum', () => {
  render(<Slider min={10} max={50} aria-label="Duration" />)
  expect(screen.getByRole('slider', { name: 'Duration' })).toHaveAttribute('aria-valuenow', '10')
})

it('keeps a nested explicit control id associated after it changes', async () => {
  const user = userEvent.setup()
  const { rerender } = render(<Field label="Account name" description="Visible to your team."><div><Input id="account-first" /></div></Field>)
  await user.click(screen.getByText('Account name'))
  expect(screen.getByRole('textbox', { name: 'Account name' })).toHaveFocus()
  rerender(<Field label="Account name" description="Visible to your team."><div><Input id="account-second" /></div></Field>)
  await user.click(screen.getByText('Account name'))
  const input = screen.getByRole('textbox', { name: 'Account name' })
  expect(input).toHaveFocus()
  expect(input).toHaveAttribute('id', 'account-second')
  expect(input).toHaveAccessibleDescription('Visible to your team.')
})

it('moves to the last enabled combobox option on initial ArrowUp', async () => {
  const user = userEvent.setup()
  render(<Combobox aria-label="Location" options={[{ value: 'a', label: 'Amsterdam' }, { value: 'b', label: 'Berlin' }, { value: 'c', label: 'Copenhagen' }]} />)
  await user.tab()
  await user.keyboard('{ArrowUp}{Enter}')
  expect(screen.getByRole('combobox', { name: 'Location' })).toHaveValue('Copenhagen')
})
