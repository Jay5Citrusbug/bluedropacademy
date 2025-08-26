# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_10: 📍 Predefined button click triggers response
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:108:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('suggest-message-button').first()

    at chatbotPage.PredefinedBtnClick (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:289:122)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:109:27
```

# Page snapshot

```yaml
- region "top of page"
- link "wix האתר הזה נבנה באמצעות Wix. גם לך יכול להיות אתר כבר היום. אני רוצה לבנות אתר":
  - /url: https://www.wix.com/lpviral/enviral?utm_campaign=vir_wixad_live&adsVersion=banner_2024&orig_msid=aa99f552-cce6-4d9b-96f0-a304175f7068&orig_msid=d147380a-f3d1-419d-9ced-13400ea5a695&adsVersion=banner_2024
  - img "wix"
  - text: האתר הזה נבנה באמצעות Wix. גם לך יכול להיות אתר כבר היום. אני רוצה לבנות אתר
- main:
  - region "main content":
    - iframe
- region "bottom of page"
```

# Test source

```ts
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
  279 |
  280 |     console.log('📋 Clicking Copy button...');
  281 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  282 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  283 |   }
  284 |
  285 |   async PredefinedBtnClick(testInfo: TestInfo) {
  286 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  287 |     const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
  288 |
> 289 |   await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('suggest-message-button').first().click();
      |                                                                                                                          ^ Error: locator.click: Target page, context or browser has been closed
  290 |  const systemMessages = frameLocator.locator('.system-message-text');
  291 |
  292 |     console.log('🔘 Clicking Predefined button...');
  293 |   await expect(predefinedBtn).toBeVisible();
  294 |   await this.page.waitForTimeout(1000); // Wait for button to be ready
  295 |   await predefinedBtn.click();
  296 |
  297 |   const input = frameLocator.getByTestId('seach-msg-input');
  298 |
  299 |   console.log('🕐 Waiting for bot response to begin...');
  300 |   await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 30000 });
  301 |
  302 |   // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  303 |   let botResponse: string | undefined = '';
  304 |   await expect
  305 |     .poll(async () => {
  306 |       const all = await systemMessages.all();
  307 |       const last = all[all.length - 1];
  308 |       botResponse = (await last.textContent())?.trim();
  309 |       return botResponse && botResponse !== this.userMessage;
  310 |     }, {
  311 |       timeout: 40000,
  312 |       message: 'Waiting for full bot response...',
  313 |     })
  314 |     .toBeTruthy();
  315 |
  316 |   botResponse = botResponse || 'No response received';
  317 |   console.log(`✅ Bot response received: "${botResponse}"`);
  318 |
  319 |   testInfo.annotations.push({
  320 |     type: 'info',
  321 |     description: `Bot response: ${botResponse}`,
  322 |   });
  323 |
  324 |   return botResponse;
  325 | }
  326 |
  327 | async InactivityPopup1() {
  328 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  329 |   console.log('⏳ Waiting for inactivity popup to appear...');
  330 |
  331 |   const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
  332 |
  333 |   const env = process.env.ENVIRONMENT || 'staging';
  334 |   const timeout = env === 'production' ? 610_000 : 70_000; // 10m10s or 1m10s
  335 |
  336 |   console.log(`⏳ Waiting in ${env} with timeout: ${timeout / 1000}s`);
  337 |
  338 |   // Wait for popup to be visible with appropriate timeout
  339 |   await expect(inactivityPopup).toBeVisible({ timeout });
  340 |
  341 |   const popupFrame = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  342 |
  343 |   await expect(popupFrame.getByText('היי! לא ראינו פעילות ב-10')).toBeVisible();
  344 |  //await expect(this.page.locator('.anticon.anticon-close.ant-modal-close-icon')).toBeVisible();
  345 |
  346 |   console.log('✅ Inactivity popup is visible.');
  347 |
  348 |   await popupFrame.getByRole('dialog').getByRole('button', { name: 'המשך שיחה' }).click();
  349 |
  350 |   console.log('🔄 Clicked "Continue Chat" button.');
  351 | }
  352 |
  353 | async InactivityPopup2(){
  354 |
  355 |  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  356 |   const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
  357 |  // Wait for 1 minute and 10 seconds
  358 |   console.log('⏳ Waiting for inactivity popup to appear for close...');
  359 |
  360 |   await expect(inactivityPopup).toBeVisible({ timeout: 70000  });
  361 |   await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('היי! לא ראינו פעילות ב-10').isVisible();
  362 |
  363 |   console.log('✅ Inactivity popup is visible.');
  364 |
  365 | // Check visibility of the close icon
  366 | //const closeIcon = this.page.locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button');
  367 |
  368 | //await expect(closeIcon).toBeVisible();  // Optional but recommended
  369 |
  370 | // Click the close icon
  371 | //await closeIcon.click();
  372 |
  373 |     }                                                                                                             
  374 |
  375 | }
  376 |
```