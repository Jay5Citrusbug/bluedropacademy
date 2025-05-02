# Test info

- Name: BlueDrop test cases >> Hamburger Menu & History >> TC_14: Open Hamburger Menu
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:111:9

# Error details

```
Error: locator.click: Element is outside of the viewport
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'icon' }).nth(2)
    - locator resolved to <button data-testid="hamburger-click" class="bg-transparent border-0 p-0 m-0">…</button>
  - attempting click action
    - scrolling into view if needed
    - done scrolling

    at chatbotPage.OpenHamburgerMenu (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:160:19)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:112:7
```

# Test source

```ts
   60 | await expect(SubmitBtnEnable).toBeEnabled(); // Only works if it’s a real <button disabled>
   61 |
   62 |   }
   63 |
   64 |   async PredefinebuttonNotActive() {
   65 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   66 |     const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
   67 |     await expect(PreDefineBtn).toBeHidden(); // Only works if it’s a real <button disabled>
   68 |   }
   69 |
   70 |   async PredefinebuttonActive() {
   71 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   72 |     const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
   73 |     await expect(PreDefineBtn).toBeVisible(); // Only works if it’s a real <button disabled>
   74 |   }
   75 |   
   76 |   async SubmitQuery(testInfo: TestInfo) {
   77 |     this.userMessage = generateRandomQuestion(); // Generate a random question';
   78 |
   79 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
   80 |     
   81 |     await this.page
   82 |     .frameLocator(Chatbotlocator.iframeName)
   83 |     .getByTestId('seach-msg-input')
   84 |     .clear();
   85 |     await this.page
   86 |     .frameLocator(Chatbotlocator.iframeName)
   87 |     .getByTestId('seach-msg-input')
   88 |     .fill(this.userMessage);
   89 |     const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   90 |   await expect(submitBtn).toBeEnabled();
   91 |
   92 |   await submitBtn.click();
   93 |
   94 |   // Step 2: Wait for bot response
   95 |   await this.page.waitForTimeout(9000); // Consider replacing with smarter wait
   96 |
   97 |   // Step 3: Capture last bot response
   98 |   const botMessages = await frameLocator.locator('.system-message-text').all();
   99 |   const lastMessage = botMessages[botMessages.length - 1];
  100 |   const botResponse = (await lastMessage.textContent())?.trim();
  101 |
  102 |   // Step 4: Log in console and report
  103 |   console.log(`User: ${this.userMessage}`);
  104 |   console.log(`Bot: ${botResponse}`);
  105 |
  106 |   // ✅ Add to Playwright report
  107 |   testInfo.annotations.push({
  108 |     type: 'info',
  109 |     description: `Bot response: ${botResponse}`,
  110 |   });
  111 |
  112 |   // Optional assertion
  113 |   expect(botResponse).toBeTruthy();
  114 |
  115 |   }
  116 |
  117 | //Scrolling to the bottom of the page
  118 | async scrollToBottom() {
  119 |   
  120 |   await this.page.waitForTimeout(5000); // Wait for the chatbot complete loading
  121 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  122 |
  123 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).isVisible();
  124 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  125 |   await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  126 |
  127 |   }
  128 |
  129 |   async Pagereload() {
  130 |
  131 |     // Re-locate the iframe after reload
  132 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  133 |     
  134 |     // Assert that no bot messages are present after reload
  135 |     const botMessages = await frameLocator.locator('.system-message-text');
  136 |     
  137 |     // ✅ Assert that it is **not visible**
  138 |     await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
  139 |     
  140 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  141 |   
  142 |     }
  143 |
  144 |     async NewsesionChatbotPage() {
  145 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  146 |     
  147 |       // Assert that no bot messages are present after reload
  148 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).isVisible();
  149 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).click();      
  150 |
  151 | }
  152 |
  153 | async OpenHamburgerMenu() {
  154 |         
  155 |
  156 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  157 | const iconButtons = frameLocator.getByRole('button', { name: 'icon' }).nth(2);
  158 |
  159 | await iconButtons.isVisible();
> 160 | await iconButtons.click( { force: true });
      |                   ^ Error: locator.click: Element is outside of the viewport
  161 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  162 | await frameLocator.getByTestId('start-new-session').isVisible();
  163 | }
  164 |
  165 | async LoadmoreBtn() {
  166 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  167 |
  168 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  169 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  170 |   //const sessionList = this.page.locator('ul.session-list');
  171 |  // await expect(sessionList).toBeVisible();
  172 |   }
  173 |
  174 |
  175 |   async SearchHistory() {
  176 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  177 |     await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
  178 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  179 | const input = frame.locator(Chatbotlocator.Searchbar);
  180 |
  181 | await expect(input).toBeVisible();
  182 | await input.click({ force: true }); // optional if needed
  183 | await input.fill(this.userMessage);
  184 | //await expect(sessionList).toHaveText(this.userMessage);
  185 |     }
  186 |   
  187 |     async NoSearchHistory() {
  188 |       const userMessage = generateRandomQuestion()
  189 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  190 |       await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  191 |       await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
  192 |       await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  193 |       }
  194 |     
  195 | async CloseHamburgerMenu() {
  196 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  197 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  198 | await frameLocator.getByRole('button', { name: 'Close' }).click();
  199 | }
  200 |
  201 | async Newsession() {
  202 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  203 | const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });
  204 |
  205 | await HamburgericonButtons.nth(2).click();
  206 |
  207 | await frameLocator.getByTestId('start-new-session').isVisible();
  208 | await frameLocator.getByTestId('start-new-session').click();
  209 | }
  210 |
  211 | async Wait() {
  212 |   console.log('Waiting for 10 minutes...');
  213 |   this.page.setDefaultTimeout(11 * 60 * 1000);
  214 |
  215 |   // Optional: increase timeout for Playwright actions (e.g., expect)
  216 |   this.page.setDefaultTimeout(60 * 1000); // 1 minute timeout for actions
  217 |
  218 |   await this.page.waitForTimeout(10 * 60 * 1000); // wait 10 minutes
  219 |   console.log('Wait complete!');await expect(this.page.locator('text=היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.')).toBeVisible();
  220 |
  221 |
  222 |   }
  223 |
  224 |   async LikeBtn() {
  225 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  226 |     await frameLocator.locator(Chatbotlocator.LikeBtn).isVisible();
  227 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  228 |     await expect(
  229 |       frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)
  230 |     ).toHaveAttribute('src', /fill='%23008AFC'/);
  231 |      
  232 |       }
  233 |
  234 |   async DisLikeBtn() {
  235 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  236 | await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  237 |
  238 | await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  239 |
  240 | await expect(
  241 |   frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)
  242 | ).toHaveAttribute('src', /fill='%23008AFC'/);
  243 |  
  244 |   }
  245 |
  246 |   async CopyBtn() {
  247 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  248 |     await frameLocator.locator(Chatbotlocator.Copybtn).isVisible();
  249 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  250 |   }
  251 |
  252 | }
```