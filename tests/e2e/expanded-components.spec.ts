import { test, expect, type Locator } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Temporarily associate the actual demo controls with a native form to inspect
// successful controls without adding submission behavior to documentation demos.
async function nativeFormValues(controls: Locator, name?: string) {
  return controls.evaluateAll((elements, suppliedName) => {
    const form = document.createElement('form')
    form.id = 'expanded-components-native-form'
    form.hidden = true
    document.body.append(form)
    const original = elements.map((element) => ({ element, form: element.getAttribute('form'), name: element.getAttribute('name') }))
    for (const { element } of original) {
      element.setAttribute('form', form.id)
      if (suppliedName) element.setAttribute('name', suppliedName)
    }
    try {
      return Array.from(new FormData(form).entries()).map(([key, value]) => [key, typeof value === 'string' ? value : { name: value.name, size: value.size, type: value.type }])
    } finally {
      for (const record of original) {
        for (const attribute of ['form', 'name'] as const) {
          if (record[attribute] === null) record.element.removeAttribute(attribute)
          else record.element.setAttribute(attribute, record[attribute]!)
        }
      }
      form.remove()
    }
  }, name)
}

test('number fields retain empty editing, native keyboard steps, bounds and form values', async ({ page }) => {
  await page.goto('/#/components/number-input')
  const number = page.getByRole('spinbutton', { name: 'Team seats' })
  await page.getByText('Team seats', { exact: true }).click()
  await expect(number).toBeFocused()
  await expect(number).toHaveAccessibleDescription('Choose between 1 and 20 seats.')
  await number.fill('')
  await expect(number).toHaveValue('')
  await expect(page.getByText('Enter a seat count.')).toBeVisible()
  await number.fill('25')
  await number.press('Tab')
  await expect(number).toHaveValue('20')
  await expect(page.getByRole('button', { name: 'Add one seat' })).toBeDisabled()
  await number.focus()
  await number.press('ArrowDown')
  await expect(number).toHaveValue('19')
  await page.getByRole('button', { name: 'Remove one seat' }).click()
  await expect(number).toHaveValue('18')
  await expect(number).toBeFocused()
  expect(await nativeFormValues(number, 'seats')).toEqual([['seats', '18']])
  await number.fill('0')
  await number.press('Tab')
  await expect(number).toHaveValue('1')
  await expect(page.getByRole('button', { name: 'Remove one seat' })).toBeDisabled()
})

test('tag fields add unique values, remove by keyboard and submit repeated names', async ({ page }) => {
  await page.goto('/#/components/tag-input')
  const input = page.getByRole('textbox', { name: 'Project topics' })
  await input.fill(' Ecology ')
  await input.press('Enter')
  await expect(page.getByRole('button', { name: 'Remove Ecology' })).toBeVisible()
  await input.fill('ecology')
  await input.press('Enter')
  await expect(page.locator('[data-slot="tag-input"] [role="status"]')).toHaveText('ecology is already included.')
  expect(await nativeFormValues(page.locator('[data-slot="tag-input"] input[type="hidden"]'))).toEqual([['topics', 'Research'], ['topics', 'Design'], ['topics', 'Ecology']])
  await input.fill('')
  await input.press('Backspace')
  await expect(page.getByRole('button', { name: 'Remove Ecology' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(input).toBeFocused()
  await expect(page.getByRole('button', { name: 'Remove Ecology' })).toHaveCount(0)
  expect(await nativeFormValues(page.locator('[data-slot="tag-input"] input[type="hidden"]'))).toEqual([['topics', 'Research'], ['topics', 'Design']])
})

test('file selection validates count, dropped type and size, and keeps native files in sync', async ({ page }) => {
  const outbound: string[] = []
  page.on('request', (request) => { if (request.method() !== 'GET') outbound.push(request.url()) })
  await page.goto('/#/components/file-dropzone')
  const input = page.getByLabel('Project references', { exact: true })
  await input.setInputFiles(['one', 'two', 'three', 'four'].map((name) => ({ name: `${name}.pdf`, mimeType: 'application/pdf', buffer: Buffer.from('brief') })))
  await expect(page.getByRole('alert')).toContainText('Choose up to 3 files.')
  expect(await input.evaluate((element: HTMLInputElement) => element.files?.length)).toBe(3)
  expect((await nativeFormValues(input, 'references')).map((entry) => entry[1])).toEqual([
    { name: 'one.pdf', size: 5, type: 'application/pdf' },
    { name: 'two.pdf', size: 5, type: 'application/pdf' },
    { name: 'three.pdf', size: 5, type: 'application/pdf' },
  ])
  const transfer = await page.evaluateHandle(() => {
    const data = new DataTransfer()
    data.items.add(new File(['brief'], 'accepted.pdf', { type: 'application/pdf' }))
    data.items.add(new File(['notes'], 'notes.txt', { type: 'text/plain' }))
    data.items.add(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'large.pdf', { type: 'application/pdf' }))
    return data
  })
  await page.locator('[data-slot="file-dropzone"] > div').first().dispatchEvent('drop', { dataTransfer: transfer })
  await transfer.dispose()
  await expect(page.getByRole('alert')).toContainText('notes.txt: file type is not accepted.')
  await expect(page.getByRole('alert')).toContainText('large.pdf: exceeds the 5 MB limit.')
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByRole('list', { name: 'Selected files' })).toContainText('accepted.pdf')
  expect(await nativeFormValues(input, 'references')).toEqual([['references', { name: 'accepted.pdf', size: 5, type: 'application/pdf' }]])
  await page.getByRole('button', { name: 'Remove accepted.pdf' }).click()
  await expect(input).toBeFocused()
  expect(await input.evaluate((element: HTMLInputElement) => element.files?.length)).toBe(0)
  await expect(page.getByRole('list', { name: 'Selected files' })).toHaveCount(0)
  expect(outbound).toEqual([])
})

for (const preset of ['fieldnotes', 'studio', 'play'] as const) {
  for (const appearance of ['light', 'dark'] as const) {
    test(`expanded overlays work by keyboard and pass axe in ${preset} ${appearance}`, async ({ page }) => {
      await page.addInitScript(({ preset, appearance }) => {
        localStorage.setItem('rillmark-preset', preset)
        localStorage.setItem('rillmark-theme', appearance)
      }, { preset, appearance })
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      const checkAxe = async ({ include, exclude }: { include?: string; exclude?: string } = {}) => {
        let audit = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        if (include) audit = audit.include(include)
        if (exclude) audit = audit.exclude(exclude)
        const result = await audit.analyze()
        expect.soft(result.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) }))).toEqual([])
      }

      await page.goto('/#/components/command')
      const trigger = page.getByRole('button', { name: 'Find an action', exact: true })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: 'A little momentum' })
      const search = dialog.getByRole('searchbox', { name: 'Find an action' })
      await expect(search).toBeFocused()
      await search.fill('favorites')
      await search.press('ArrowDown')
      await expect(dialog.getByRole('button', { name: /Show saved projects/ })).toBeFocused()
      await dialog.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)))
      await checkAxe()
      await page.keyboard.press('Enter')
      await expect(dialog).toHaveCount(0)
      await expect(trigger).toBeFocused()
      await expect(page.getByText('Your saved projects are ready to review.')).toBeVisible()

      await page.goto('/#/components/context-menu')
      const contextTrigger = page.locator('.demo-stage [aria-haspopup="menu"]')
      await contextTrigger.focus()
      await contextTrigger.press('Shift+F10')
      const pin = page.getByRole('menuitemcheckbox', { name: 'Pin to workspace' })
      await expect(pin).toBeFocused()
      const menu = page.getByRole('menu')
      await page.keyboard.press('Tab')
      await expect(pin).toBeFocused()
      await page.keyboard.press('Shift+Tab')
      await expect(pin).toBeFocused()
      await page.locator('#root a').first().evaluate((element: HTMLElement) => element.focus())
      await expect.poll(() => menu.evaluate((element) => element.contains(document.activeElement))).toBe(true)
      await menu.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)))
      // Radix hides the background with aria-hidden and traps focus in JavaScript.
      // Axe does not infer role=menu modality, so audit the menu and verify its
      // background focus isolation directly above instead of disabling a rule.
      await checkAxe({ include: '[role="menu"]' })
      await pin.focus()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('menu')).toHaveCount(0)
      await expect(contextTrigger).toBeFocused()
      await expect(page.getByText('Pinned · 0 copies created')).toBeVisible()
      await contextTrigger.press('Shift+F10')
      await page.keyboard.press('Escape')
      await expect(contextTrigger).toBeFocused()

      await page.goto('/#/components/navigation-menu')
      const navigationTrigger = page.getByRole('button', { name: 'Explore components' })
      await navigationTrigger.focus()
      await navigationTrigger.press('Enter')
      const navigation = page.locator('.demo-stage nav')
      for (const name of [/^Actions/, /^Forms/, /^Focused tasks/, /^Foundations$/]) {
        await page.keyboard.press('Tab')
        await expect(navigation.getByRole('link', { name })).toBeFocused()
        expect(await page.evaluate(() => document.activeElement?.closest('[aria-hidden="true"]'))).toBeNull()
      }
      for (const name of [/^Focused tasks/, /^Forms/, /^Actions/]) {
        await page.keyboard.press('Shift+Tab')
        await expect(navigation.getByRole('link', { name })).toBeFocused()
        expect(await page.evaluate(() => document.activeElement?.closest('[aria-hidden="true"]'))).toBeNull()
      }
      await page.keyboard.press('Shift+Tab')
      await expect(navigationTrigger).toBeFocused()
      await navigationTrigger.press('ArrowDown')
      await expect(page.locator('.demo-stage').getByRole('link', { name: /Actions/ })).toBeFocused()
      await page.locator('.demo-stage').evaluate((element) => Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished)))
      const proxy = '.demo-stage nav li:first-child > span[aria-hidden="true"][tabindex="0"]'
      await expect(page.locator(proxy)).toHaveCount(1)
      // This primitive focus proxy redirects Tab immediately; the full forward
      // and reverse traversal above verifies no key leaves focus on hidden content.
      await checkAxe({ exclude: proxy })
      await navigation.getByRole('link', { name: /^Actions/ }).focus()
      await page.keyboard.press('Escape')
      await expect(navigationTrigger).toBeFocused()
      await expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false')
      expect(errors).toEqual([])
    })
  }
}
