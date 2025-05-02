# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_10: Predefined buttons are active
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:82:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.main-chat-buttons-wrapper')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.main-chat-buttons-wrapper')

    at chatbotPage.PredefinebuttonActive (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:67:32)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:83:27
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
   34 |  await expect(messageLocator).not.toHaveText('', { timeout: 10000 }); 
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
>  67 |     await expect(PreDefineBtn).toBeVisible(); // Only works if it’s a real <button disabled>
      |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   68 |   }
   69 |   
   70 |   async SubmitQuery(testInfo: TestInfo) {
   71 |     this.userMessage = generateRandomQuestion(); // Generate a random question';
   72 |
   73 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   74 |     
   75 |     await this.page
   76 |     .frameLocator(Chatbotlocator.iframeName)
   77 |     .getByTestId('seach-msg-input')
   78 |     .clear();
   79 |     await this.page
   80 |     .frameLocator(Chatbotlocator.iframeName)
   81 |     .getByTestId('seach-msg-input')
   82 |     .fill(this.userMessage);
   83 |     const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   84 |   await expect(submitBtn).toBeEnabled();
   85 |
   86 |   await submitBtn.click();
   87 |
   88 |   // Step 2: Wait for bot response
   89 |   await this.page.waitForTimeout(9000); // Consider replacing with smarter wait
   90 |
   91 |   // Step 3: Capture last bot response
   92 |   const botMessages = await frameLocator.locator('.system-message-text').all();
   93 |   const lastMessage = botMessages[botMessages.length - 1];
   94 |   const botResponse = (await lastMessage.textContent())?.trim();
   95 |
   96 |   // Step 4: Log in console and report
   97 |   console.log(`User: ${this.userMessage}`);
   98 |   console.log(`Bot: ${botResponse}`);
   99 |
  100 |   // ✅ Add to Playwright report
  101 |   testInfo.annotations.push({
  102 |     type: 'info',
  103 |     description: `Bot response: ${botResponse}`,
  104 |   });
  105 |
  106 |   // Optional assertion
  107 |   expect(botResponse).toBeTruthy();
  108 |
  109 |   }
  110 |
  111 | //Scrolling to the bottom of the page
  112 | async scrollToBottom() {
  113 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  114 |
  115 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).isVisible();
  116 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  117 |   await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  118 |
  119 |   }
  120 |
  121 |   async Pagereload() {
  122 |
  123 |     // Re-locate the iframe after reload
  124 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  125 |     
  126 |     // Assert that no bot messages are present after reload
  127 |     const botMessages = await frameLocator.locator('.system-message-text');
  128 |     
  129 |     // ✅ Assert that it is **not visible**
  130 |     await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
  131 |     
  132 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  133 |   
  134 |     }
  135 |
  136 |     async NewsesionChatbotPage() {
  137 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  138 |     
  139 |       // Assert that no bot messages are present after reload
  140 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).isVisible();
  141 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).click();      
  142 |
  143 | }
  144 |
  145 | async OpenHamburgerMenu() {
  146 |         
  147 |
  148 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  149 | const iconButtons = frameLocator.getByRole('button', { name: 'icon' }).nth(2);
  150 |
  151 | await iconButtons.isVisible();
  152 | await iconButtons.click( { force: true });
  153 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  154 | await frameLocator.getByTestId('start-new-session').isVisible();
  155 | }
  156 |
  157 | async LoadmoreBtn() {
  158 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  159 |
  160 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  161 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  162 |   //const sessionList = this.page.locator('ul.session-list');
  163 |  // await expect(sessionList).toBeVisible();
  164 |   }
  165 |
  166 |
  167 |   async SearchHistory() {
```