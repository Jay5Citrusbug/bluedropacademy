import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('hamburger-click').click();
  await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Close' }).click();
});