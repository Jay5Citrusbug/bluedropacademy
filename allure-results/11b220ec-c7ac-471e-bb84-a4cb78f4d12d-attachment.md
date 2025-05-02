# Test info

- Name: BlueDrop test cases >> TC_09: Scroll to bottom
- Location: D:\Playwright\Bluedrop_academy\tests\Edge_case.spec.ts:64:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('//*[@id="root"]/div/div[2]/main/div/div/div[2]/div[1]/button/img')

    at chatbotPage.scrollToBottom (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:116:59)
    at D:\Playwright\Bluedrop_academy\tests\Edge_case.spec.ts:65:7
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
   67 |     await expect(PreDefineBtn).toBeVisible(); // Only works if it’s a real <button disabled>
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
> 116 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
      |                                                           ^ Error: locator.click: Target page, context or browser has been closed
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
  140 |       const botMessages = await frameLocator.locator('.system-message-text');
  141 |
  142 |       await botMessages.getByTestId(Chatbotlocator.NewsessionBtn).isVisible();
  143 |       await botMessages.getByTestId(Chatbotlocator.NewsessionBtn).click();
  144 |       
  145 |
  146 | }
  147 |
  148 | async OpenHamburgerMenu() {
  149 |         
  150 |
  151 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  152 | const iconButtons = frameLocator.getByRole('button', { name: 'icon' }).nth(2);
  153 |
  154 | await iconButtons.isVisible();
  155 | await iconButtons.click( { force: true });
  156 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  157 | await frameLocator.getByTestId('start-new-session').isVisible();
  158 | }
  159 |
  160 | async LoadmoreBtn() {
  161 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  162 |
  163 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  164 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  165 |   //const sessionList = this.page.locator('ul.session-list');
  166 |  // await expect(sessionList).toBeVisible();
  167 |   }
  168 |
  169 |
  170 |   async SearchHistory() {
  171 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  172 |     await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
  173 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  174 | const input = frame.locator(Chatbotlocator.Searchbar);
  175 |
  176 | await expect(input).toBeVisible();
  177 | await input.click({ force: true }); // optional if needed
  178 | await input.fill(this.userMessage);
  179 | //await expect(sessionList).toHaveText(this.userMessage);
  180 |     }
  181 |   
  182 |     async NoSearchHistory() {
  183 |       const userMessage = generateRandomQuestion()
  184 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  185 |       await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  186 |       await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
  187 |       await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  188 |       }
  189 |     
  190 | async CloseHamburgerMenu() {
  191 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  192 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  193 | await frameLocator.getByRole('button', { name: 'Close' }).click();
  194 | }
  195 |
  196 | async Newsession() {
  197 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  198 | const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });
  199 |
  200 | await HamburgericonButtons.nth(2).click();
  201 |
  202 | await frameLocator.getByTestId('start-new-session').isVisible();
  203 | await frameLocator.getByTestId('start-new-session').click();
  204 | }
  205 |
  206 | async Wait() {
  207 |   console.log('Waiting for 10 minutes...');
  208 | await this.page.waitForTimeout(630_000); // 630000 ms = 10 minutes and 30 seconds
  209 |   console.log('Wait complete!');
  210 |   await expect(this.page.locator('text=היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.')).toBeVisible();
  211 |
  212 |
  213 |   }
  214 |
  215 | }
```