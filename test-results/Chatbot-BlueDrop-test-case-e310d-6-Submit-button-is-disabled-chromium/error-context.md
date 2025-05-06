# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_06: Submit button is disabled
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:58:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeEnabled()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('button[data-testid="send-message-button"]')
Expected: enabled
Received: disabled
Call log:
  - expect.toBeEnabled with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('button[data-testid="send-message-button"]')
    9 × locator resolved to <button disabled type="button" data-testid="send-message-button" class="ant-btn css-1m63z2v ant-btn-default ant-btn-color-default ant-btn-variant-outlined button send-btn mobile-send-btn">…</button>
      - unexpected value "disabled"

    at chatbotPage.SubmitbtnNotActive (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:39:66)
    at D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:59:27
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
   1 | import { Chatbotlocator } from '../Locators/chatbotLocator';
   2 | import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
   3 | import { generateRandomQuestion } from '../Utils/testData';
   4 | import { MenuLocator } from '../Locators/HamburgerMenuLocator';
   5 |
   6 | export class chatbotPage {
   7 |   readonly page: Page;
   8 |   private userMessage: string = '';
   9 |
   10 |   constructor(page: Page) {
   11 |     this.page = page;
   12 |   }
   13 |
   14 |   async verifyConfirmationElements() {
   15 |     console.log('🔍 Waiting for confirmation iframe to appear...');
   16 |     await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
   17 |
   18 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   19 |
   20 |     console.log('✅ Verifying confirmation message and title...');
   21 |     await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible();
   22 |     await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible();
   23 |   }
   24 |
   25 |   async InitialbotMessage() {
   26 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   27 |     const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);
   28 |
   29 |     console.log('💬 Waiting for initial bot message...');
   30 |     await expect
   31 |       .poll(async () => (await messageLocator.textContent())?.trim(), { timeout: 30000 })
   32 |       .not.toBe('');
   33 |     console.log('✅ Initial bot message received.');
   34 |   }
   35 |
   36 |   async SubmitbtnNotActive() {
   37 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   38 |     console.log('🔒 Verifying Submit button is disabled...');
>  39 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeEnabled();
      |                                                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeEnabled()
   40 |   }
   41 |
   42 |   async SubmitbtnActive() {
   43 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   44 |     this.userMessage = generateRandomQuestion();
   45 |     console.log(`💬 Typing message: ${this.userMessage}`);
   46 |
   47 |     await frameLocator.getByTestId('seach-msg-input').fill(this.userMessage);
   48 |
   49 |     console.log('✅ Verifying Submit button is enabled...');
   50 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeEnabled();
   51 |   }
   52 |
   53 |   async PredefinebuttonNotActive() {
   54 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   55 |     console.log('🔒 Verifying predefined buttons are hidden...');
   56 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeHidden();
   57 |   }
   58 |
   59 |   async PredefinebuttonActive() {
   60 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   61 |     console.log('🔓 Verifying predefined buttons are visible...');
   62 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeVisible();
   63 |   }
   64 |
   65 |   async SubmitQuery(testInfo: TestInfo) {
   66 |     this.userMessage = generateRandomQuestion();
   67 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   68 |     const input = frameLocator.getByTestId('seach-msg-input');
   69 |     const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   70 |
   71 |     console.log(`💬 Submitting query: "${this.userMessage}"`);
   72 |
   73 |     await input.clear();
   74 |     await input.fill(this.userMessage);
   75 |     await expect(submitBtn).toBeEnabled();
   76 |     await submitBtn.click();
   77 |
   78 |     console.log('🕐 Waiting for bot response...');
   79 |     await this.page.waitForTimeout(9000);
   80 |
   81 |     const botMessages = await frameLocator.locator('.system-message-text').all();
   82 |     const lastMessage = botMessages[botMessages.length - 1];
   83 |     const botResponse = (await lastMessage.textContent())?.trim();
   84 |
   85 |     console.log(`✅ Bot response received: "${botResponse}"`);
   86 |
   87 |     testInfo.annotations.push({
   88 |       type: 'info',
   89 |       description: `Bot response: ${botResponse}`,
   90 |     });
   91 |
   92 |     expect(botResponse).toBeTruthy();
   93 |   }
   94 |
   95 |   async scrollToBottom() {
   96 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   97 |
   98 |     console.log('🔽 Scrolling to bottom...');
   99 |     await this.page.waitForTimeout(5000);
  100 |
  101 |     await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
  102 |     await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  103 |     await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  104 |   }
  105 |
  106 |   async Pagereload() {
  107 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  108 |
  109 |     console.log('🔄 Reloading and verifying bot session is cleared...');
  110 |     const botMessages = await frameLocator.locator('.system-message-text');
  111 |     await expect(botMessages).toHaveCount(0);
  112 |
  113 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  114 |   }
  115 |
  116 |   async NewsessionChatbotPage() {
  117 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  118 |
  119 |     console.log('🔁 Starting a new chatbot session...');
  120 |     await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
  121 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  122 |
  123 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  124 |   }
  125 |
  126 |   async Wait() {
  127 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  128 |     
  129 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  130 |     await this.page.waitForTimeout(10000);
  131 |     
  132 |     console.log('✅ Verifying idle timeout message appears...');
  133 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  134 |   }
  135 |
  136 |   async LikeBtn() {
  137 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  138 |
  139 |     console.log('👍 Clicking Like button...');
```