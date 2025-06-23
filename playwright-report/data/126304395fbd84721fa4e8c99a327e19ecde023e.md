# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_01: ✅ Confirm chatbot screen elements are visible
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:58:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: 'התחברות עם כתובת מייל' })

    at ChatbotLoginPage.login (D:\Playwright\Bluedrop_academy\tests\Pages\LoginChatbot.ts:33:18)
    at D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:42:19
```

# Test source

```ts
   1 | import { expect, FrameLocator, Page } from "@playwright/test";
   2 | import { chatbotLocators } from "../Locators/Login_chatbotLocator";
   3 |
   4 | export class ChatbotLoginPage {
   5 |     readonly page: Page;
   6 |     readonly frameLocator: FrameLocator;
   7 |
   8 |     constructor(page: Page) {
   9 |         this.page = page;
  10 |         this.frameLocator = page.frameLocator(chatbotLocators.iframeName);
  11 |     }
  12 |
  13 |     // Navigates to the chatbot login page
  14 |     async goto() {
  15 |         console.log("Navigating to the admin page...");
  16 |         const Chatboturl = process.env.URL_CHATBOT;
  17 |         if (!Chatboturl) {
  18 |             throw new Error("Environment variable URL_CHATBOT is not defined.");
  19 |         }
  20 |         console.log("Navigating to the chatbot page...");
  21 |         await this.page.goto(Chatboturl);
  22 |         console.log("Successfully navigated to chatbot login page.");
  23 |     }
  24 |
  25 |     // Logs in to chatbot using email and password
  26 |     async login(email: string, password: string) {
  27 |         const timeoutLimit = 40000; // assuming 30 seconds timeout (adjust as per your global config)
  28 |
  29 |         try {
  30 |             console.log('Clicking "Login with Email" button...');
  31 |             await this.page
  32 |                 .getByRole("button", { name: chatbotLocators.loginWithEmailBtn.name })
> 33 |                 .click();
     |                  ^ Error: locator.click: Target page, context or browser has been closed
  34 |
  35 |             console.log(`Filling in email: ${email}`);
  36 |             await this.page
  37 |                 .getByRole("textbox", { name: chatbotLocators.emailInput.name })
  38 |                 .fill(email);
  39 |
  40 |             console.log("Filling in password...");
  41 |             await this.page
  42 |                 .getByRole("textbox", { name: chatbotLocators.passwordInput.name })
  43 |                 .fill(password);
  44 |
  45 |             console.log('Clicking "Submit" to log in...');
  46 |             await this.page
  47 |                 .getByRole("button", { name: chatbotLocators.submitLoginBtn.name })
  48 |                 .click();
  49 |
  50 |             console.log("Waiting for page navigation after login...");
  51 |             // await this.page.waitForURL(/.*chat6.*/, { timeout: timeoutLimit });
  52 |             // console.log('URL indicates successful navigation to chat page.');
  53 |
  54 |             // const iframeName = chatbotLocators.iframeName.replace('iframe[name="', '').replace('"]', '');
  55 |             // console.log(`Waiting for iframe [${iframeName}] to be visible in DOM...`);
  56 |             // await this.page.waitForSelector(`iframe[name="${iframeName}"]`, { timeout: timeoutLimit });
  57 |
  58 |             // console.log('Locating title inside iframe for verification...');
  59 |             const iframeLocator = this.page.frameLocator(chatbotLocators.iframeName);
  60 |             const verifyTitle = iframeLocator.getByRole("heading", {
  61 |                 name: chatbotLocators.FormTitle.name,
  62 |             });
  63 |
  64 |             //await expect(verifyTitle).toBeVisible({ timeout: timeoutLimit });
  65 |
  66 |            // console.log("✅ Login process completed and iframe title located successfully.");
  67 |         } catch (error) {
  68 |             console.error(`❌ Error during login: ${error}`);
  69 |             console.error(
  70 |                 `Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`
  71 |             );
  72 |             throw error;
  73 |         }
  74 |     }
  75 | }
  76 |
```