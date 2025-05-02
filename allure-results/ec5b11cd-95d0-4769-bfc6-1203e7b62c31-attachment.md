# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_11: Reload hides old chat
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:86:9

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).not.toHaveText(expected)

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.system-message-text')
Expected string: not ""
Received: <element(s) not found>
Call log:
  - expect.not.toHaveText with timeout 10000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.system-message-text')

    at chatbotPage.InitialbotMessage (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:34:35)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:89:27
```

# Test source

```ts
   1 | import { Chatbotlocator } from '../Locators/chatbotLocator';
   2 | import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
   3 | import {generateRandomQuestion} from '../Utils/testData'; // Import the test data
   4 | import { chatbotLocators } from '../Locators/Login_chatbotLocator';
   5 |
   6 | export class chatbotPage {
   7 |   readonly page: Page;
   8 |   private userMessage: string = '';
   9 |
   10 |
   11 |   constructor(page: Page) {
   12 |     this.page = page;
   13 |   }
   14 |
   15 |   async verifyConfirmationElements() {
   16 |     // Wait until the iframe is present in the DOM
   17 |     await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
   18 |   
   19 |     // Step 1: Use frameLocator for visibility assertions
   20 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   21 |   
   22 |     // ✅ Wait for the thank-you message to be visible
   23 |     await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible()
   24 |   
   25 |    await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible()
   26 |    // Now validate other elements
   27 |
   28 |   }
   29 |   async InitialbotMessage() {
   30 |     // Wait until the iframe is present in the DOM  
   31 |     // Step 1: Use frameLocator for visibility assertions
   32 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   33 |     const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);// Assert that textContent is not empty or just whitespace
>  34 |  await expect(messageLocator).not.toHaveText('', { timeout: 10000 }); 
      |                                   ^ Error: Timed out 10000ms waiting for expect(locator).not.toHaveText(expected)
   35 |   }
   36 |
   37 |   async SubmitbtnNotActive() {
   38 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   39 |     const SubmitBtnDisable = frameLocator.locator(Chatbotlocator.SubmitBtn);// Assert that textContent is not empty or just whitespace
   40 |
   41 | await expect(SubmitBtnDisable).toBeDisabled(); // Only works if it’s a real <button disabled>
   42 |
   43 |   }
   44 |
   45 |   async SubmitbtnActive() {
   46 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   47 |      this.userMessage = generateRandomQuestion();
   48 |
   49 |     await this.page
   50 |     .frameLocator(Chatbotlocator.iframeName)
   51 |     .getByTestId('seach-msg-input')
   52 |     .fill(this.userMessage);
   53 |     const SubmitBtnEnable = frameLocator.locator(Chatbotlocator.SubmitBtn);
   54 | await expect(SubmitBtnEnable).toBeEnabled(); // Only works if it’s a real <button disabled>
   55 |
   56 |   }
   57 |
   58 |   async PredefinebuttonNotActive() {
   59 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   60 |     const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
   61 |     await expect(PreDefineBtn).toBeHidden(); // Only works if it’s a real <button disabled>
   62 |   }
   63 |
   64 |   async PredefinebuttonActive() {
   65 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   66 |     const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
   67 |     await expect(PreDefineBtn).toBeVisible(); // Only works if it’s a real <button disabled>
   68 |   }
   69 |   
   70 |   async SubmitQuery(testInfo: TestInfo) {
   71 |     this.userMessage = generateRandomQuestion(); // Generate a random question';
   72 |
   73 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   74 |
   75 |     const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   76 |   await expect(submitBtn).toBeEnabled();
   77 |
   78 |   await submitBtn.click();
   79 |
   80 |   // Step 2: Wait for bot response
   81 |   await this.page.waitForTimeout(9000); // Consider replacing with smarter wait
   82 |
   83 |   // Step 3: Capture last bot response
   84 |   const botMessages = await frameLocator.locator('.system-message-text').all();
   85 |   const lastMessage = botMessages[botMessages.length - 1];
   86 |   const botResponse = (await lastMessage.textContent())?.trim();
   87 |
   88 |   // Step 4: Log in console and report
   89 |   console.log(`User: ${this.userMessage}`);
   90 |   console.log(`Bot: ${botResponse}`);
   91 |
   92 |   // ✅ Add to Playwright report
   93 |   testInfo.annotations.push({
   94 |     type: 'info',
   95 |     description: `Bot response: ${botResponse}`,
   96 |   });
   97 |
   98 |   // Optional assertion
   99 |   expect(botResponse).toBeTruthy();
  100 |
  101 |   }
  102 |
  103 | //Scrolling to the bottom of the page
  104 | async scrollToBottom() {
  105 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  106 |
  107 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).isVisible();
  108 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  109 |   await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  110 |
  111 |   }
  112 |
  113 |   async Pagereload() {
  114 |
  115 |     // Re-locate the iframe after reload
  116 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  117 |     
  118 |     // Assert that no bot messages are present after reload
  119 |     const botMessages = await frameLocator.locator('.system-message-text');
  120 |     
  121 |     // ✅ Assert that it is **not visible**
  122 |     await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
  123 |     
  124 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  125 |   
  126 |     }
  127 |
  128 |     async NewsesionChatbotPage() {
  129 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  130 |     
  131 |       // Assert that no bot messages are present after reload
  132 |       const botMessages = await frameLocator.locator('.system-message-text');
  133 |
  134 |       await botMessages.getByTestId(Chatbotlocator.NewsessionBtn).isVisible();
```