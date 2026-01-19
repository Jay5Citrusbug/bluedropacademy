# Test info

- Name: BlueDrop Chatbot Test Suite >> TC_13: 🔄 Session pop-up displays after 10 minutes and Click on the Continue button to resume session
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:118:5

# Error details

```
Error: expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 70000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]')

    at chatbotPage.InactivityPopup1 (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:352:35)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:123:23
```

# Test source

```ts
  252 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  253 |
  254 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  255 |     console.log('🔄 Reloading and verifying bot session is cleared...');
  256 |   }
  257 |
  258 |   async Wait() {
  259 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  260 |
  261 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  262 |     await this.page.waitForTimeout(10000);
  263 |
  264 |     console.log('✅ Verifying idle timeout message appears...');
  265 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  266 |   }
  267 |
  268 |   async LikeBtn() {
  269 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  270 |
  271 |     console.log('👍 Clicking Like button...');
  272 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  273 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  274 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  275 |   }
  276 |
  277 |   async DisLikeBtn() {
  278 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  279 |
  280 |     console.log('👎 Clicking Dislike button...');
  281 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  282 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  283 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  284 |   }
  285 |
  286 |   async CopyBtn() {
  287 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  288 |
  289 |     console.log('📋 Clicking Copy button...');
  290 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  291 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  292 |   }
  293 |
  294 |   async PredefinedBtnClick(testInfo: TestInfo) {
  295 |
  296 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  297 |     const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
  298 |
  299 |     await frameLocator.locator('body').evaluate(() => {
  300 |       window.scrollTo(0, document.body.scrollHeight);
  301 |     });
  302 |     await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('suggest-message-button').first().click();
  303 |     const systemMessages = frameLocator.locator('.system-message-text');
  304 |
  305 |     console.log('🔘 Clicking Predefined button...');
  306 |     await expect(predefinedBtn).toBeVisible();
  307 |     await this.page.waitForTimeout(1000); // Wait for button to be ready
  308 |     await predefinedBtn.click();
  309 |
  310 |     const input = frameLocator.getByTestId('seach-msg-input');
  311 |
  312 |     console.log('🕐 Waiting for bot response to begin...');
  313 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 30000 });
  314 |
  315 |     // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  316 |     let botResponse: string | undefined = '';
  317 |     await expect
  318 |       .poll(async () => {
  319 |         const all = await systemMessages.all();
  320 |         const last = all[all.length - 1];
  321 |         botResponse = (await last.textContent())?.trim();
  322 |         return botResponse && botResponse !== this.userMessage;
  323 |       }, {
  324 |         timeout: 40000,
  325 |         message: 'Waiting for full bot response...',
  326 |       })
  327 |       .toBeTruthy();
  328 |
  329 |     botResponse = botResponse || 'No response received';
  330 |     console.log(`✅ Bot response received: "${botResponse}"`);
  331 |
  332 |     testInfo.annotations.push({
  333 |       type: 'info',
  334 |       description: `Bot response: ${botResponse}`,
  335 |     });
  336 |
  337 |     return botResponse;
  338 |   }
  339 |
  340 |   async InactivityPopup1() {
  341 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  342 |     console.log('⏳ Waiting for inactivity popup to appear...');
  343 |
  344 |     const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
  345 |
  346 |     const env = process.env.ENVIRONMENT || 'staging';
  347 |     const timeout = env === 'production' ? 610_000 : 70_000; // 10m10s or 1m10s
  348 |
  349 |     console.log(`⏳ Waiting in ${env} with timeout: ${timeout / 1000}s`);
  350 |
  351 |     // Wait for popup to be visible with appropriate timeout
> 352 |     await expect(inactivityPopup).toBeVisible({ timeout });
      |                                   ^ Error: expect(locator).toBeVisible()
  353 |
  354 |     const popupFrame = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  355 |
  356 |     await expect(popupFrame.getByText('היי! לא ראינו פעילות ב-10')).toBeVisible();
  357 |     //await expect(this.page.locator('.anticon.anticon-close.ant-modal-close-icon')).toBeVisible();
  358 |
  359 |     console.log('✅ Inactivity popup is visible.');
  360 |
  361 |     await popupFrame.getByRole('dialog').getByRole('button', { name: 'המשך שיחה' }).click();
  362 |
  363 |     console.log('🔄 Clicked "Continue Chat" button.');
  364 |   }
  365 |
  366 |   async InactivityPopup2() {
  367 |
  368 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  369 |     const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
  370 |     // Wait for 1 minute and 10 seconds
  371 |     console.log('⏳ Waiting for inactivity popup to appear for close...');
  372 |
  373 |     await expect(inactivityPopup).toBeVisible({ timeout: 70000 });
  374 |     await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('היי! לא ראינו פעילות ב-10').isVisible();
  375 |
  376 |     console.log('✅ Inactivity popup is visible.');
  377 |
  378 |     // Check visibility of the close icon
  379 |     //const closeIcon = this.page.locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button');
  380 |
  381 |     //await expect(closeIcon).toBeVisible();  // Optional but recommended
  382 |
  383 |     // Click the close icon
  384 |     //await closeIcon.click();
  385 |
  386 |   }
  387 |
  388 | }
  389 |
```