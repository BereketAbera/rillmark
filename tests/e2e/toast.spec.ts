import { test, expect } from '@playwright/test'

for (const theme of ['light', 'dark'] as const) {
  test(`Toast has visible keyboard focus and can be dismissed in ${theme} mode`, async ({ page }) => {
    await page.goto('/#/components/toast')
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark theme', exact: true }).click()
    const save = page.getByRole('button', { name: 'Save changes', exact: true })
    await save.click()
    const notifications = page.getByRole('region', { name: 'Notifications (F8)', exact: true })
    const viewport = notifications.getByRole('list')
    const toast = notifications.getByRole('listitem')
    await expect(toast).toContainText('Changes saved')
    const unfocusedShadow = await toast.evaluate((element) => getComputedStyle(element).boxShadow)

    await page.keyboard.press('F8')
    await expect(viewport).toBeFocused()
    await expect(viewport).toHaveCSS('--tw-ring-offset-width', '2px')
    await expect(viewport).not.toHaveCSS('box-shadow', 'none')

    await page.keyboard.press('Tab')
    await expect(toast).toBeFocused()
    expect(await toast.evaluate((element) => element.matches(':focus-visible'))).toBe(true)
    await expect(toast).toHaveCSS('--tw-ring-offset-width', '2px')
    await expect.poll(() => toast.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe(unfocusedShadow)
    await page.keyboard.press('Escape')
    await expect(toast).toBeHidden()

    await save.click()
    await page.keyboard.press('F8')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const dismiss = notifications.getByRole('button', { name: 'Dismiss notification', exact: true })
    await expect(dismiss).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(toast).toBeHidden()
  })
}
