# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_04: Initial chatbot message
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:58:9

# Error details

```
Error: page.waitForSelector: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]') to be visible

    at ChatbotLoginPage.login (D:\Playwright\Bluedrop_academy\tests\Pages\LoginChatbot.ts:28:21)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:36:5
```

# Page snapshot

```yaml
- iframe
```

# Test source

```ts
   1 | import { Page, expect, Locator, FrameLocator } from '@playwright/test';
   2 | import {chatbotLocators } from '../Locators/Login_chatbotLocator';
   3 | import { assert, time } from 'console';
   4 |
   5 | export class ChatbotLoginPage {
   6 |   readonly page: Page;
   7 |   readonly frameLocator: FrameLocator;
   8 |
   9 |   constructor(page: Page) {
  10 |     this.page = page;
  11 |     this.frameLocator = page.frameLocator(chatbotLocators.iframeName);
  12 |   }
  13 |
  14 |   async goto() {
  15 |     await this.page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');
  16 |
  17 |   }
  18 |
  19 |   async login(email: string, password: string) {
  20 |       await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();
  21 |       await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);
  22 |       await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);
  23 |       await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();  
  24 |     // Wait for navigation to the expected URL
  25 |    await this.page.waitForURL(/.*chat6.*/);
  26 |   
  27 |     // Wait for iframe to appear in the DOM
> 28 |     await this.page.waitForSelector(`iframe[name="${chatbotLocators.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
     |                     ^ Error: page.waitForSelector: Target page, context or browser has been closed
  29 |   
  30 |     // Now safely locate and assert the heading inside the iframe
  31 |     const iframeLocator = this.page.frameLocator(chatbotLocators.iframeName);
  32 |     const verifytitle = iframeLocator.getByRole('heading', { name: chatbotLocators.FormTitle.name });
  33 |    // await expect(verifytitle).toBeVisible({timeout: 10000}); 
  34 |
  35 | }  
  36 |  
  37 | }
  38 |
  39 |
  40 |
```