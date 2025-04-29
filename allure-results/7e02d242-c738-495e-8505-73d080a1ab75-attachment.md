# Test info

- Name: Login Test Suite >> Login to chatbot and answer questions
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:27:7

# Error details

```
Error: locator.click: Test timeout of 20000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'התחברות עם כתובת מייל' })

    at ChatbotLoginPage.login (D:\Playwright\Bluedrop_academy\tests\Pages\LoginChatbot.ts:20:91)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:29:19
```

# Test source

```ts
   1 | import { Page, expect, Locator, FrameLocator } from '@playwright/test';
   2 | import {chatbotLocators } from '../Locators/Login_chatbotLocator';
   3 |
   4 | export class ChatbotLoginPage {
   5 |   readonly page: Page;
   6 |   readonly frameLocator: FrameLocator;
   7 |
   8 |   constructor(page: Page) {
   9 |     this.page = page;
  10 |     this.frameLocator = page.frameLocator('iframe[name="htmlComp-iframe"]');
  11 |   }
  12 |
  13 |   async goto() {
  14 |     await this.page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');
  15 |     const LoginTitle = this.page.locator('//*[@id="loginHeadline_SM_ROOT_COMP524"]');
  16 |     await expect(LoginTitle).toBeVisible()
  17 |   }
  18 |
  19 |   async login(email: string, password: string) {
> 20 |     await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();
     |                                                                                           ^ Error: locator.click: Test timeout of 20000ms exceeded.
  21 |     await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);
  22 |     await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);
  23 |     await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();
  24 |     await this.page.waitForURL(/.*chat6.*/);
  25 |   }
  26 |
  27 |   async fillPersonalInfo(name: string, gender: string) {
  28 |     const textbox = this.frameLocator.getByRole('textbox', {
  29 |       name: chatbotLocators.userNameInput.name,
  30 |     });
  31 |     await textbox.click();
  32 |     await textbox.fill(name);
  33 |     await this.frameLocator.getByRole(chatbotLocators.genderRadio(gender).role as "radio", {
  34 |       name: chatbotLocators.genderRadio(gender).name,
  35 |     }).check();
  36 |     await this.frameLocator.getByRole('button', {
  37 |       name: chatbotLocators.startButton.name,
  38 |     }).click();
  39 |   }
  40 | }
```