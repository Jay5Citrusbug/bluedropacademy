# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_18 🔍 Search in chat history
- Location: D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:48:7

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('[data-test-id="predefined-button-0"]') to be visible

    at chatbotPage.SubmitQuery (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:79:23)
    at D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:50:17
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
   30 |     
   31 |     await expect
   32 |       .poll(async () => (await messageLocator.textContent())?.trim(), { timeout: 40000 })
   33 |       .not.toBe('');
   34 |     console.log('✅ Initial bot message received.');
   35 |   }
   36 |
   37 |   async SubmitbtnNotActive() {
   38 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   39 |     console.log('🔒 Verifying Submit button is disabled...');
   40 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeDisabled();
   41 |   }
   42 |
   43 |   async SubmitbtnActive() {
   44 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   45 |     this.userMessage = generateRandomQuestion();
   46 |     console.log(`💬 Typing message: ${this.userMessage}`);
   47 |
   48 |     await frameLocator.getByTestId('seach-msg-input').fill(this.userMessage);
   49 |
   50 |     console.log('✅ Verifying Submit button is enabled...');
   51 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeEnabled();
   52 |   }
   53 |
   54 |   async PredefinebuttonNotActive() {
   55 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   56 |     console.log('🔒 Verifying predefined buttons are hidden...');
   57 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeHidden();
   58 |   }
   59 |
   60 |   async PredefinebuttonActive() {
   61 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   62 |     console.log('🔓 Verifying predefined buttons are visible...');
   63 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeVisible();
   64 |   }
   65 |
   66 |  async SubmitQuery(testInfo: TestInfo): Promise<string> {
   67 |   this.userMessage = generateRandomQuestion();
   68 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   69 |   const input = frameLocator.getByTestId('seach-msg-input');
   70 |   const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   71 |   const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
   72 |
   73 |   console.log(`💬 Submitting query: "${this.userMessage}"`);
   74 |   await input.fill(this.userMessage);
   75 |   await expect(submitBtn).toBeEnabled();
   76 |   await submitBtn.click();
   77 |
   78 |   console.log('🕐 Waiting for AI response to complete (predefined button visible)...');
>  79 |   await predefinedBtn.waitFor({ state: 'visible' });
      |                       ^ Error: locator.waitFor: Target page, context or browser has been closed
   80 |
   81 |   const botMessages = await frameLocator.locator('.system-message-text').all();
   82 |   const lastMessage = botMessages[botMessages.length - 1];
   83 |   const botResponse = (await lastMessage.textContent())?.trim();
   84 |
   85 |   console.log(`✅ Bot response received: "${botResponse}"`);
   86 |
   87 |   testInfo.annotations.push({
   88 |     type: 'info',
   89 |     description: `Bot response: ${botResponse}`,
   90 |   });
   91 |
   92 |   expect(botResponse).toBeTruthy();
   93 |
   94 |   // Return the message
   95 |   return this.userMessage;  // <-- ensure this line exists at the end
   96 | }
   97 |
   98 |   async scrollToBottom() {
   99 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  100 |     console.log('🔽 Scrolling to bottom...');
  101 |
  102 |     await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
  103 |     await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  104 |     await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  105 |   }
  106 |
  107 |   async Pagereload() {
  108 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  109 |     console.log('🔄 Reloading and verifying bot session is cleared...');
  110 |     const botMessages = await frameLocator.locator('.system-message-text');
  111 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  112 |   }
  113 |
  114 |   async NewsessionChatbotPage() {
  115 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  116 |
  117 |     console.log('🔁 Starting a new chatbot session...');
  118 |     await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
  119 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  120 |
  121 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  122 |       console.log('🔄 Reloading and verifying bot session is cleared...');
  123 |     const botMessages = await frameLocator.locator('.system-message-text');
  124 |     await expect(botMessages).toHaveCount(0);
  125 |
  126 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  127 |   }
  128 |
  129 |   async Wait() {
  130 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  131 |     
  132 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  133 |     await this.page.waitForTimeout(10000);
  134 |     
  135 |     console.log('✅ Verifying idle timeout message appears...');
  136 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  137 |   }
  138 |
  139 |   async LikeBtn() {
  140 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  141 |
  142 |     console.log('👍 Clicking Like button...');
  143 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  144 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  145 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  146 |   }
  147 |
  148 |   async DisLikeBtn() {
  149 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  150 |
  151 |     console.log('👎 Clicking Dislike button...');
  152 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  153 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  154 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  155 |   }
  156 |
  157 |   async CopyBtn() {
  158 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  159 |
  160 |     console.log('📋 Clicking Copy button...');
  161 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  162 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  163 |   }
  164 |
  165 |   async PredefinedBtnClick(testInfo: TestInfo) {
  166 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  167 |     const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
  168 |
  169 |
  170 |     console.log('🔘 Clicking Predefined button...');
  171 |
  172 |     await expect(predefinedBtn).toBeVisible();
  173 |     await predefinedBtn.click();
  174 |   await predefinedBtn.waitFor({ state: 'visible' });
  175 |
  176 |     const botMessages = await frameLocator.locator('.system-message-text').all();
  177 |     const lastMessage = botMessages[botMessages.length - 1];
  178 |     const botResponse = (await lastMessage.textContent())?.trim();
  179 |
```