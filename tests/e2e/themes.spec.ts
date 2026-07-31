import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import fs from 'node:fs/promises'

const appearances = ['light', 'dark'] as const
const presets = ['fieldnotes', 'studio', 'play'] as const
const primary = { fieldnotes: ['rgb(36, 95, 85)', 'rgb(178, 213, 186)'], studio: ['rgb(41, 73, 184)', 'rgb(173, 190, 255)'], play: ['rgb(116, 55, 165)', 'rgb(217, 181, 248)'] }
const corners = { fieldnotes: '5px', studio: '6px', play: '22px' }
const durations = { fieldnotes: '0.18s', studio: '0.12s', play: '0.24s' }

test('presets change real controls, portal surfaces and motion; configuration persists and copies', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#/themes')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Same components.New character.')
  const config = page.locator('.theme-config code').first()
  const save = page.getByRole('button', { name: 'Save project', exact: true })
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const preset of presets) {
    await page.getByRole('combobox', { name: 'Visual preset' }).selectOption(preset)
    for (const [index, appearance] of appearances.entries()) {
      await page.getByRole('group', { name: 'Appearance', exact: true }).getByRole('button', { name: appearance === 'light' ? 'Light' : 'Dark', exact: true }).click()
      await expect(config).toContainText(`data-rillmark-preset="${preset}" data-rillmark-mode="${appearance}"`)
      await expect(save).toHaveCSS('background-color', primary[preset][index])
      await expect(save).toHaveCSS('border-top-right-radius', corners[preset])
      await expect(save).toHaveCSS('min-height', '44px')
      const trigger = page.getByRole('button', { name: 'Preview dialog' })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: 'Every detail follows.' })
      await expect(dialog).toBeVisible()
      await expect(dialog).toHaveCSS('animation-duration', durations[preset])
      expect(await dialog.evaluate((node) => {
        const probe = document.createElement('div'); probe.style.boxShadow = 'var(--shadow-overlay)'; document.body.append(probe)
        const expected = getComputedStyle(probe).boxShadow; probe.remove()
        return getComputedStyle(node).boxShadow.endsWith(expected)
      })).toBe(true)
      const styles = await dialog.evaluate((node) => ({ color: getComputedStyle(node).backgroundColor, body: getComputedStyle(document.body).getPropertyValue('--popover').trim(), root: getComputedStyle(document.documentElement).getPropertyValue('--popover').trim() }))
      expect(styles.body).toBe(styles.root)
      await expect(dialog).toHaveCSS('background-color', `rgb(${styles.root.slice(1).match(/../g)!.map((part) => parseInt(part, 16)).join(', ')})`)
      await dialog.evaluate((node) => Promise.all(node.getAnimations().map((animation) => animation.finished)))
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
      await page.keyboard.press('Escape')
      await expect(trigger).toBeFocused()
    }
  }
  await page.getByRole('button', { name: 'Copy configuration', exact: true }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('<html data-rillmark-preset="play" data-rillmark-mode="dark">')
  await page.getByRole('combobox', { name: 'Visual preset' }).selectOption('studio')
  await expect(page.getByRole('button', { name: 'Copy configuration', exact: true })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('data-rillmark-preset="play"')
  await page.getByRole('combobox', { name: 'Visual preset' }).selectOption('play')
  await page.reload()
  await expect(page.getByRole('combobox', { name: 'Visual preset' })).toHaveValue('play')
  await expect(page.locator('html')).toHaveAttribute('data-rillmark-mode', 'dark')
  await page.getByRole('link', { name: 'Build a project brief' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-rillmark-preset', 'play')
  await expect(page.locator('.fw-app')).toBeVisible()
  expect(errors).toEqual([])
})

test('system appearance responds live; explicit mode overrides legacy dark and reduced motion wins', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/#/themes')
  await page.getByRole('combobox', { name: 'Visual preset' }).selectOption('studio')
  await page.getByRole('button', { name: 'System', exact: true }).click()
  const save = page.getByRole('button', { name: 'Save project', exact: true })
  await expect(save).toHaveCSS('background-color', primary.studio[0])
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(save).toHaveCSS('background-color', primary.studio[1])
  await page.getByRole('button', { name: 'Light', exact: true }).click()
  await page.evaluate(() => document.documentElement.classList.add('dark'))
  await expect(save).toHaveCSS('background-color', primary.studio[0])
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('button', { name: 'Preview dialog' }).click()
  const duration = await page.getByRole('dialog').evaluate((node) => getComputedStyle(node).animationDuration)
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.00001)
})

test('preset explorer has accessible responsive layouts in every appearance', async ({ page }) => {
  test.setTimeout(150_000)
  await fs.mkdir('docs/evidence', { recursive: true })
  await page.goto('/#/themes')
  for (const preset of presets) {
    await page.getByRole('combobox', { name: 'Visual preset' }).selectOption(preset)
    for (const appearance of appearances) {
      await page.getByRole('button', { name: appearance === 'light' ? 'Light' : 'Dark', exact: true }).click()
      await expect(page.locator('html')).toHaveAttribute('data-rillmark-mode', appearance)
      await page.setViewportSize({ width: 1440, height: 1000 })
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
      await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }) })
      if (appearance === 'light') await page.screenshot({ path: `docs/evidence/presets-${preset}.png`, fullPage: true })
      await page.setViewportSize({ width: 390, height: 844 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    }
  }
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }) })
  await page.screenshot({ path: 'docs/evidence/presets-mobile.png', fullPage: true })
})
