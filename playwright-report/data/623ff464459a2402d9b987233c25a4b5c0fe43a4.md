# Test info

- Name: BlueDrop Chatbot Test Suite >> TC_05: 📤 Submit query message
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:74:9

# Error details

```
Error: expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('[data-testid="like-thumb"]')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 90000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('[data-testid="like-thumb"]')

    at chatbotPage.SubmitQuery (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:178:62)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:76:7
```

# Test source

```ts
   78 | //   const input = frameLocator.getByTestId('seach-msg-input');
   79 | //   const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   80 | //   const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
   81 |
   82 | //   console.log(`💬 Submitting query: "${this.userMessage}"`);
   83 | //   await input.fill(this.userMessage);
   84 | //  // await expect(submitBtn).toBeEnabled();
   85 | //   await input.press('Enter');
   86 |
   87 | //   console.log('🕐 Waiting for AI response to complete (predefined button visible)...');
   88 | //  // await predefinedBtn.waitFor({ state: 'visible' });
   89 |
   90 | //   const botMessages = await frameLocator.locator('.system-message-text').all();
   91 | //   const lastMessage = botMessages[botMessages.length - 1];
   92 | //   const botResponse = (await lastMessage.textContent())?.trim();
   93 |
   94 | //   console.log(`✅ Bot response received: "${botResponse}"`);
   95 |
   96 | //   testInfo.annotations.push({
   97 | //     type: 'info',
   98 | //     description: `Bot response: ${botResponse}`,
   99 | //   });
  100 |
  101 | //   await expect(lastMessage).toBeVisible({ timeout: 90000 });
  102 | //   //expect(botResponse).toBeTruthy();
  103 |
  104 | //   // Return the message
  105 | //   return this.userMessage;  // <-- ensure this line exists at the end
  106 | // }
  107 | // async SubmitQuery(testInfo: TestInfo): Promise<string> {
  108 | //   this.userMessage = generateRandomQuestion();
  109 | //   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  110 | //   const input = frameLocator.getByTestId('seach-msg-input');
  111 | //   const systemMessages = frameLocator.locator('.system-message-text');
  112 |
  113 | //   console.log(`💬 Submitting query: "${this.userMessage}"`);
  114 | //   await input.fill(this.userMessage);
  115 | //   await input.press('Enter');
  116 |
  117 | //   console.log('🕐 Waiting for bot response to begin...');
  118 | //   await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 60000 });
  119 |
  120 | //   // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  121 | //   let botResponse: string | undefined = '';
  122 | //   await expect
  123 | //     .poll(async () => {
  124 | //       const all = await systemMessages.all();
  125 | //       const last = all[all.length - 1];
  126 | //       botResponse = (await last.textContent())?.trim();
  127 | //       return botResponse && botResponse !== this.userMessage;
  128 | //     }, {
  129 | //       timeout: 60000,
  130 | //       message: 'Waiting for full bot response...',
  131 | //     })
  132 | //     .toBeTruthy();
  133 |
  134 | //   botResponse = botResponse || 'No response received';
  135 | //   console.log(`✅ Bot response received: "${botResponse}"`);
  136 |
  137 | //   testInfo.annotations.push({
  138 | //     type: 'info',
  139 | //     description: `Bot response: ${botResponse}`,
  140 | //   });
  141 |
  142 | //   return botResponse;
  143 | // }
  144 | async SubmitQuery(testInfo: TestInfo): Promise<string> {
  145 |   this.userMessage = generateRandomQuestion();
  146 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  147 |   const input = frameLocator.getByTestId('seach-msg-input');
  148 |   const systemMessages = frameLocator.locator('.system-message-text');
  149 |
  150 |   console.log(`💬 Submitting query: "${this.userMessage}"`);
  151 |   await input.fill(this.userMessage);
  152 |
  153 |   // Start timer before sending
  154 |   const startTime = Date.now();
  155 |   await input.press('Enter');
  156 |
  157 |   console.log('🕐 Waiting for first character of bot response...');
  158 |
  159 |   // Wait until the first non-empty bot message appears
  160 |   await expect
  161 |     .poll(async () => {
  162 |       const all = await systemMessages.all();
  163 |       if (all.length === 0) return false;
  164 |       const last = all[all.length - 1];
  165 |       const text = (await last.textContent())?.trim() || '';
  166 |       return text.length > 0 && text !== this.userMessage;
  167 |     }, {
  168 |       timeout: 90000,
  169 |       message: 'Waiting for first bot character...',
  170 |     })
  171 |     .toBeTruthy();
  172 |
  173 |   const firstCharTime = Date.now();
  174 |   const timeToFirstChar = ((firstCharTime - startTime) / 1000).toFixed(2);
  175 |   console.log(`⏳ Time to first character: ${timeToFirstChar}s`);
  176 |
  177 |   // Wait for Like button (signals full response)
> 178 |   await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 90000 });
      |                                                              ^ Error: expect(locator).toBeVisible()
  179 |
  180 |   // Wait until the bot's message stops changing (final response)
  181 |   let botResponse: string | undefined = '';
  182 |   await expect
  183 |     .poll(async () => {
  184 |       const all = await systemMessages.all();
  185 |       const last = all[all.length - 1];
  186 |       botResponse = (await last.textContent())?.trim();
  187 |       return botResponse && botResponse !== this.userMessage;
  188 |     }, {
  189 |       timeout: 60000,
  190 |       message: 'Waiting for full bot response...',
  191 |     })
  192 |     .toBeTruthy();
  193 |
  194 |   const endTime = Date.now();
  195 |   const timeToFullResponse = ((endTime - startTime) / 1000).toFixed(2);
  196 |   console.log(`✅ Time to full response: ${timeToFullResponse}s`);
  197 |   console.log(`🤖 Bot response: "${botResponse}"`);
  198 |
  199 |   // Add both timings to Playwright's HTML report
  200 |   // testInfo.annotations.push({
  201 |   //   type: 'Performance',
  202 |   //   description: `First char: ${timeToFirstChar}s | Full response: ${timeToFullResponse}s`
  203 |   // });
  204 |
  205 |   //   // Add asked question to report
  206 |   // testInfo.annotations.push({
  207 |   //   type: 'AskedQuestion',
  208 |   //   description: this.userMessage
  209 |   // });
  210 |
  211 |   // Add bot's final response to report
  212 |   testInfo.annotations.push({
  213 |     type: 'BotResponse',
  214 |     description: botResponse || 'No response received'
  215 |   });
  216 |
  217 |   return botResponse || 'No response received';
  218 | }
  219 |
  220 |
  221 |   async scrollToBottom() {
  222 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  223 |     console.log('🔽 Scrolling to bottom...');
  224 |
  225 |     await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
  226 |     await frameLocator.locator('body').evaluate((body) => {
  227 |   window.scrollTo(0, body.scrollHeight);
  228 | });
  229 |  //   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  230 |     await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  231 |   }
  232 |
  233 |   async Pagereload() {
  234 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  235 |     console.log('🔄 Reloading and verifying bot session is cleared...');
  236 |   }
  237 |
  238 |   async NewsessionChatbotPage() {
  239 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  240 |
  241 |     console.log('🔁 Starting a new chatbot session...');
  242 |     await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
  243 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  244 |
  245 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  246 |       console.log('🔄 Reloading and verifying bot session is cleared...');
  247 |   }
  248 |
  249 |   async Wait() {
  250 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  251 |     
  252 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  253 |     await this.page.waitForTimeout(10000);
  254 |     
  255 |     console.log('✅ Verifying idle timeout message appears...');
  256 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  257 |   }
  258 |
  259 |   async LikeBtn() {
  260 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  261 |
  262 |     console.log('👍 Clicking Like button...');
  263 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  264 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  265 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  266 |   }
  267 |
  268 |   async DisLikeBtn() {
  269 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  270 |
  271 |     console.log('👎 Clicking Dislike button...');
  272 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  273 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  274 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  275 |   }
  276 |
  277 |   async CopyBtn() {
  278 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
```