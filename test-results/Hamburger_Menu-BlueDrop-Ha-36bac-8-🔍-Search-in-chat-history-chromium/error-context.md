# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_18 🔍 Search in chat history
- Location: D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:48:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.main-chat-buttons-wrapper')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('.main-chat-buttons-wrapper')

    at chatbotPage.PredefinebuttonActive (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:62:70)
    at D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:52:23
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
   30 |     await expect
   31 |       .poll(async () => (await messageLocator.textContent())?.trim(), { timeout: 30000 })
   32 |       .not.toBe('');
   33 |     console.log('✅ Initial bot message received.');
   34 |   }
   35 |
   36 |   async SubmitbtnNotActive() {
   37 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   38 |     console.log('🔒 Verifying Submit button is disabled...');
   39 |     await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeDisabled();
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
>  62 |     await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeVisible();
      |                                                                      ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   63 |   }
   64 |
   65 |  async SubmitQuery(testInfo: TestInfo): Promise<string> {
   66 |   this.userMessage = generateRandomQuestion();
   67 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   68 |   const input = frameLocator.getByTestId('seach-msg-input');
   69 |   const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   70 |
   71 |   console.log(`💬 Submitting query: "${this.userMessage}"`);
   72 |
   73 |   await input.clear();
   74 |   await input.fill(this.userMessage);
   75 |   await expect(submitBtn).toBeEnabled();
   76 |   await submitBtn.click();
   77 |
   78 |   console.log('🕐 Waiting for bot response...');
   79 |   await this.page.waitForTimeout(30000);
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
   98 |
   99 |   async scrollToBottom() {
  100 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  101 |
  102 |     console.log('🔽 Scrolling to bottom...');
  103 |     await this.page.waitForTimeout(9000);
  104 |
  105 |     await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
  106 |     await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  107 |     await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  108 |   }
  109 |
  110 |   async Pagereload() {
  111 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  112 |     console.log('🔄 Reloading and verifying bot session is cleared...');
  113 |     const botMessages = await frameLocator.locator('.system-message-text');
  114 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  115 |   }
  116 |
  117 |   async NewsessionChatbotPage() {
  118 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  119 |
  120 |     console.log('🔁 Starting a new chatbot session...');
  121 |     await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
  122 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  123 |
  124 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  125 |       console.log('🔄 Reloading and verifying bot session is cleared...');
  126 |     const botMessages = await frameLocator.locator('.system-message-text');
  127 |     await expect(botMessages).toHaveCount(0);
  128 |
  129 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  130 |   }
  131 |
  132 |   async Wait() {
  133 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  134 |     
  135 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  136 |     await this.page.waitForTimeout(10000);
  137 |     
  138 |     console.log('✅ Verifying idle timeout message appears...');
  139 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  140 |   }
  141 |
  142 |   async LikeBtn() {
  143 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  144 |
  145 |     console.log('👍 Clicking Like button...');
  146 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  147 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  148 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  149 |   }
  150 |
  151 |   async DisLikeBtn() {
  152 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  153 |
  154 |     console.log('👎 Clicking Dislike button...');
  155 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  156 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  157 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  158 |   }
  159 |
  160 |   async CopyBtn() {
  161 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  162 |
```