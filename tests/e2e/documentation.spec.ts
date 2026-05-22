import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import catalog from '../../src/generated/catalog.json' with { type: 'json' }
import fs from 'node:fs/promises'

test('documentation search, source, copy, theme and mobile navigation work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Interfaces with a point of view.' })).toBeVisible()
  await page.getByRole('textbox', { name: 'Search documentation' }).fill('combo')
  await page.getByRole('link', { name: 'Combobox', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Combobox')
  await page.getByRole('tab', { name: 'Source', exact: true }).click()
  await expect(page.locator('.component-demo pre')).toContainText('import { Combobox }')
  await page.getByRole('button', { name: 'Copy code', exact: true }).first().click()
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('export default function ComponentDemo')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveClass('dark')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('link', { name: 'Installation', exact: true }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Start with something real.')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

for (const theme of ['light', 'dark'] as const) {
  test(`all 32 live component pages meet automated accessibility checks in ${theme}`, async ({ page }) => {
    test.setTimeout(180_000)
    await page.addInitScript((mode) => localStorage.setItem('rillmark-theme', mode), theme)
    const errors: string[] = []
    const failures: unknown[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    for (const item of catalog) {
      await page.goto(`/#/components/${item.name}`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.title)
      await expect(page.locator('.demo-stage')).not.toContainText('Loading example…')
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      if (result.violations.length) failures.push({ page: `${theme}/${item.name}`, violations: result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })) })
    }
    expect(errors).toEqual([])
    expect(failures).toEqual([])
  })
}

test('guides, home and complete examples have accessible light, dark and mobile layouts', async ({ page }) => {
  test.setTimeout(150_000)
  const failures: unknown[] = []
  for (const dark of [false, true]) {
    await page.goto('/')
    const switcher = page.getByRole('button', { name: dark ? 'Switch to dark theme' : 'Switch to light theme' })
    if (await switcher.count()) await switcher.click()
    for (const path of ['/', '/docs/getting-started', '/docs/foundations', '/docs/ai', '/examples/dashboard', '/examples/settings', '/examples/discovery']) {
      await page.goto(`/#${path}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      if (result.violations.length) failures.push({ path, dark, violations: result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })) })
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/examples/dashboard', '/examples/settings', '/examples/discovery']) {
    await page.goto(`/#${path}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    if (result.violations.length) failures.push({ path, viewport: 'mobile', violations: result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })) })
  }
  expect(failures).toEqual([])
})

test('dialog traps focus, Escape restores it, and the edited value is applied', async ({ page }) => {
  await page.goto('/#/components/dialog')
  const trigger = page.getByRole('button', { name: 'Edit workspace' })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'A name for your work' })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Workspace name' })).toBeFocused()
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true)
  }
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.getByRole('textbox', { name: 'Workspace name' }).fill('A working studio')
  await page.getByRole('button', { name: 'Save name' }).click()
  await expect(page.getByText('Workspace: A working studio')).toBeVisible()
  await expect(trigger).toBeFocused()
})

test('confirmation starts with cancel; select and combobox work by keyboard', async ({ page }) => {
  await page.goto('/#/components/alert-dialog')
  await page.getByRole('button', { name: 'Archive project' }).click()
  await expect(page.getByRole('button', { name: 'Keep active' })).toBeFocused()
  await page.getByRole('alertdialog').evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)))
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Archive project' })).toBeFocused()
  await page.goto('/#/components/select')
  const select = page.getByRole('combobox', { name: 'Research region' })
  await select.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(select).toContainText('Northern highlands')
  await expect(select).toBeFocused()
  await page.goto('/#/components/combobox')
  const combo = page.getByRole('combobox', { name: 'Project lead' })
  await combo.fill('ecology')
  await expect(page.getByRole('option', { name: 'Ada Okafor' })).toBeVisible()
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.keyboard.press('Enter')
  await expect(combo).toHaveValue('Ada Okafor')
  await combo.fill('no-such-person')
  await expect(page.getByRole('status')).toContainText('No teammates match')
  await page.keyboard.press('Escape')
  await expect(combo).toHaveValue('Ada Okafor')
})

test('reduced motion removes loading animation and overlay motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/components/skeleton')
  const duration = await page.locator('[aria-hidden="true"].bg-muted').first().evaluate((element) => getComputedStyle(element).animationDuration)
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.00001)
  await page.goto('/#/components/dialog')
  await page.getByRole('button', { name: 'Edit workspace' }).click()
  const style = await page.getByRole('dialog').evaluate((element) => ({ animation: getComputedStyle(element).animationDuration, transform: getComputedStyle(element).transform }))
  expect(parseFloat(style.animation)).toBeLessThanOrEqual(0.00001)
  expect(style.transform).toBe('none')
})

test('capture documentation and design exploration at desktop and mobile sizes', async ({ page }) => {
  await fs.mkdir('docs/evidence', { recursive: true })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Save changes', exact: true })).toBeVisible()
  await page.screenshot({ path: 'docs/evidence/documentation-light.png', fullPage: true })
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await page.screenshot({ path: 'docs/evidence/documentation-dark.png', fullPage: true })
  await page.goto('/exploration.html')
  await expect(page.getByRole('heading', { name: /Fieldnotes/ }).first()).toBeVisible()
  await page.screenshot({ path: 'docs/evidence/exploration.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: 'docs/evidence/documentation-mobile.png', fullPage: true })
})
