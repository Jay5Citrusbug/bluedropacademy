import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');
await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.main-chat-buttons-wrapper').click();

});