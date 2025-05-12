# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_12: 📍 Predefined button click triggers response
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:93:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Explain me in detail so i can get it' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Explain me in detail so i can get it' })

    at chatbotPage.PredefinedBtnClick (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:167:33)
    at D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:94:27
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
  140 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  141 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  142 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  143 |   }
  144 |
  145 |   async DisLikeBtn() {
  146 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  147 |
  148 |     console.log('👎 Clicking Dislike button...');
  149 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  150 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  151 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  152 |   }
  153 |
  154 |   async CopyBtn() {
  155 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  156 |
  157 |     console.log('📋 Clicking Copy button...');
  158 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  159 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  160 |   }
  161 |
  162 |   async PredefinedBtnClick(testInfo: TestInfo) {
  163 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  164 |     const predefinedBtn = frameLocator.getByRole('button', { name: 'Explain me in detail so i can get it' });
  165 |
  166 |     console.log('🔘 Clicking Predefined button...');
> 167 |     await expect(predefinedBtn).toBeVisible();
      |                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  168 |     await predefinedBtn.click();
  169 |     await this.page.waitForTimeout(9000);
  170 |
  171 |     const botMessages = await frameLocator.locator('.system-message-text').all();
  172 |     const lastMessage = botMessages[botMessages.length - 1];
  173 |     const botResponse = (await lastMessage.textContent())?.trim();
  174 |
  175 |     console.log(`✅ Bot response received: "${botResponse}"`);
  176 |
  177 |     testInfo.annotations.push({
  178 |       type: 'info',
  179 |       description: `Bot response: ${botResponse}`,
  180 |     });
  181 |
  182 |     expect(botResponse).toBeTruthy();
  183 |
  184 |
  185 |
  186 | }
  187 | }
```