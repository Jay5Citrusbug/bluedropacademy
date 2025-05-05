# Test info

- Name: BlueDrop test cases >> Hamburger Menu & History >> TC_20: Close Hamburger Menu
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:132:9

# Error details

```
Error: Timed out 30000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('heading', { name: 'תכירו את "בלו"' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 30000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('heading', { name: 'תכירו את "בלו"' })

    at ChatbotLoginPage.login (D:\Playwright\Bluedrop_academy\tests\Pages\LoginChatbot.ts:49:33)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:34:5
```

# Page snapshot

```yaml
- region "top of page"
- button "לדלג לתוכן הראשי"
- link "האתר הזה עוצב בעזרת הכלי לבניית אתרים של wix .com . רוצים ליצור אתר משלכם? התחילו עכשיו":
  - /url: //www.wix.com/lpviral/enviral?utm_campaign=vir_wixad_live&orig_msid=d147380a-f3d1-419d-9ced-13400ea5a695&adsVersion=white
  - text: האתר הזה עוצב בעזרת הכלי לבניית אתרים של
  - img "wix"
  - text: .com . רוצים ליצור אתר משלכם? התחילו עכשיו
- main:
  - iframe
- region "bottom of page"
- iframe
```

# Test source

```ts
   1 | import { Page, expect, Locator, FrameLocator } from '@playwright/test';
   2 | import { chatbotLocators } from '../Locators/Login_chatbotLocator';
   3 |
   4 | export class ChatbotLoginPage {
   5 |   readonly page: Page;
   6 |   readonly frameLocator: FrameLocator;
   7 |
   8 |   constructor(page: Page) {
   9 |     this.page = page;
  10 |     this.frameLocator = page.frameLocator(chatbotLocators.iframeName);
  11 |   }
  12 |
  13 |   // Navigates to the chatbot login page
  14 |   async goto() {
  15 |     console.log('Navigating to chatbot login page...');
  16 |     await this.page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');
  17 |     console.log('Successfully navigated to chatbot login page.');
  18 |   }
  19 |
  20 |   // Logs in to chatbot using email and password
  21 |   async login(email: string, password: string) {
  22 |     const timeoutLimit = 30000; // assuming 30 seconds timeout (adjust as per your global config)
  23 |
  24 |     try {
  25 |       console.log('Clicking "Login with Email" button...');
  26 |       await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();
  27 |
  28 |       console.log(`Filling in email: ${email}`);
  29 |       await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);
  30 |
  31 |       console.log('Filling in password...');
  32 |       await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);
  33 |
  34 |       console.log('Clicking "Submit" to log in...');
  35 |       await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();
  36 |
  37 |       console.log('Waiting for page navigation after login...');
  38 |       await this.page.waitForURL(/.*chat6.*/, { timeout: timeoutLimit });
  39 |       console.log('URL indicates successful navigation to chat page.');
  40 |
  41 |       // const iframeName = chatbotLocators.iframeName.replace('iframe[name="', '').replace('"]', '');
  42 |       // console.log(`Waiting for iframe [${iframeName}] to be visible in DOM...`);
  43 |       // await this.page.waitForSelector(`iframe[name="${iframeName}"]`, { timeout: timeoutLimit });
  44 |
  45 |      // console.log('Locating title inside iframe for verification...');
  46 |       const iframeLocator = this.page.frameLocator(chatbotLocators.iframeName);
  47 |       const verifyTitle = iframeLocator.getByRole('heading', { name: chatbotLocators.FormTitle.name });
  48 |
> 49 |       await expect(verifyTitle).toBeVisible({ timeout: timeoutLimit });
     |                                 ^ Error: Timed out 30000ms waiting for expect(locator).toBeVisible()
  50 |
  51 |       console.log('✅ Login process completed and iframe title located successfully.');
  52 |     } catch (error) {
  53 |       console.error(`❌ Error during login: ${error}`);
  54 |       console.error(`Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`);
  55 |       throw error;
  56 |     }
  57 |   }
  58 | }
  59 |
```