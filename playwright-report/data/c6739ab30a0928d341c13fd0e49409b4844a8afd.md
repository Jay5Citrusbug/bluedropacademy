# Test info

- Name: BlueDrop Chatbot Test Suite >> TC_01: ✅ Confirm chatbot screen elements are visible
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:26:7

# Error details

```
Error: expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('שיחות עם בלו')
Expected: visible
Received: undefined
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('שיחות עם בלו')

    at chatbotPage.verifyConfirmationElements (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:23:58)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:53:5
```

# Test source

```ts
   1 | import { Chatbotlocator } from '../Locators/chatbotLocator';
   2 | import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
   3 | import { generateRandomQuestion } from '../Utils/testData';
   4 | import { MenuLocator } from '../Locators/HamburgerMenuLocator';
   5 | import { time } from 'console';
   6 |
   7 | export class chatbotPage {
   8 |   readonly page: Page;
   9 |   private userMessage: string = '';
   10 |
   11 |   constructor(page: Page) {
   12 |     this.page = page;
   13 |   }
   14 |
   15 |   async verifyConfirmationElements() {
   16 |     console.log('🔍 Waiting for confirmation iframe to appear...');
   17 |     await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
   18 |
   19 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   20 |
   21 |     console.log('✅ Verifying confirmation message and title...');
   22 |     await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible();
>  23 |     await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible();
      |                                                          ^ Error: expect(locator).toBeVisible()
   24 |   }
   25 |
   26 |   async InitialbotMessage(expectedName: string) {
   27 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   28 |     const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);
   29 |
   30 |     console.log('💬 Waiting for initial bot message...');
   31 |
   32 |     // Wait until message is non-empty
   33 |     await this.page.waitForTimeout(5000); // Waits for 5 seconds
   34 |     const messageText = (await messageLocator.first().textContent())?.trim() || '';
   35 |     console.log(`📨 Bot message received: "${messageText}"`);
   36 |     await this.page.waitForTimeout(4000); // Waits for 4 seconds
   37 |     // Assert the message contains the expected name
   38 |     expect(messageText).toContain(expectedName);
   39 |     console.log(`✅ Bot message contains expected name: "${expectedName}"`);
   40 |   }
   41 |
   42 |   async SubmitbtnNotActive() {
   43 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   44 |     console.log('🔒 Verifying Submit button is disabled...');
   45 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeDisabled();
   46 |   }
   47 |
   48 |   async SubmitbtnActive() {
   49 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   50 |     this.userMessage = generateRandomQuestion();
   51 |     console.log(`💬 Typing message: ${this.userMessage}`);
   52 |
   53 |     await frameLocator.getByTestId('seach-msg-input').fill(this.userMessage);
   54 |
   55 |     console.log('✅ Verifying Submit button is enabled...');
   56 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeEnabled();
   57 |     await frameLocator.getByTestId('seach-msg-input').clear();
   58 |     console.log('🔄 Clearing input field after verification...');
   59 |
   60 |   }
   61 |
   62 |   async PredefinebuttonNotActive() {
   63 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   64 |     console.log('🔒 Verifying predefined buttons are hidden...');
   65 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeHidden();
   66 |   }
   67 |
   68 |   async PredefinebuttonActive() {
   69 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   70 |     console.log('🔓 Verifying predefined buttons are visible...');
   71 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeVisible();
   72 |   }
   73 |
   74 |   //  async SubmitQuery(testInfo: TestInfo): Promise<string> {
   75 |
   76 |   //   this.userMessage = generateRandomQuestion();
   77 |   //   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   78 |   //   const input = frameLocator.getByTestId('seach-msg-input');
   79 |   //   const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   80 |   //   const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
   81 |
   82 |   //   console.log(`💬 Submitting query: "${this.userMessage}"`);
   83 |   //   await input.fill(this.userMessage);
   84 |   //  // await expect(submitBtn).toBeEnabled();
   85 |   //   await input.press('Enter');
   86 |
   87 |   //   console.log('🕐 Waiting for AI response to complete (predefined button visible)...');
   88 |   //  // await predefinedBtn.waitFor({ state: 'visible' });
   89 |
   90 |   //   const botMessages = await frameLocator.locator('.system-message-text').all();
   91 |   //   const lastMessage = botMessages[botMessages.length - 1];
   92 |   //   const botResponse = (await lastMessage.textContent())?.trim();
   93 |
   94 |   //   console.log(`✅ Bot response received: "${botResponse}"`);
   95 |
   96 |   //   testInfo.annotations.push({
   97 |   //     type: 'info',
   98 |   //     description: `Bot response: ${botResponse}`,
   99 |   //   });
  100 |
  101 |   //   await expect(lastMessage).toBeVisible({ timeout: 90000 });
  102 |   //   //expect(botResponse).toBeTruthy();
  103 |
  104 |   //   // Return the message
  105 |   //   return this.userMessage;  // <-- ensure this line exists at the end
  106 |   // }
  107 |   // async SubmitQuery(testInfo: TestInfo): Promise<string> {
  108 |   //   this.userMessage = generateRandomQuestion();
  109 |   //   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  110 |   //   const input = frameLocator.getByTestId('seach-msg-input');
  111 |   //   const systemMessages = frameLocator.locator('.system-message-text');
  112 |
  113 |   //   console.log(`💬 Submitting query: "${this.userMessage}"`);
  114 |   //   await input.fill(this.userMessage);
  115 |   //   await input.press('Enter');
  116 |
  117 |   //   console.log('🕐 Waiting for bot response to begin...');
  118 |   //   await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 60000 });
  119 |
  120 |   //   // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  121 |   //   let botResponse: string | undefined = '';
  122 |   //   await expect
  123 |   //     .poll(async () => {
```