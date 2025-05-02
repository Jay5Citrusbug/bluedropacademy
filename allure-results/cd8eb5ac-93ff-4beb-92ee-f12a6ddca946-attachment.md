# Test info

- Name: BlueDrop test cases >> Hamburger Menu & History >> TC_13: Load More button functionality
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:105:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('button[data-testid="load-more-click"]')

    at chatbotPage.LoadmoreBtn (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:156:58)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:106:7
```

# Test source

```ts
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
   75 |     const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
   76 |   await expect(submitBtn).toBeEnabled();
   77 |
   78 |   await submitBtn.click();
   79 |
   80 |   // Step 2: Wait for bot response
   81 |   await this.page.waitForTimeout(9000); // Consider replacing with smarter wait
   82 |
   83 |   // Step 3: Capture last bot response
   84 |   const botMessages = await frameLocator.locator('.system-message-text').all();
   85 |   const lastMessage = botMessages[botMessages.length - 1];
   86 |   const botResponse = (await lastMessage.textContent())?.trim();
   87 |
   88 |   // Step 4: Log in console and report
   89 |   console.log(`User: ${this.userMessage}`);
   90 |   console.log(`Bot: ${botResponse}`);
   91 |
   92 |   // ✅ Add to Playwright report
   93 |   testInfo.annotations.push({
   94 |     type: 'info',
   95 |     description: `Bot response: ${botResponse}`,
   96 |   });
   97 |
   98 |   // Optional assertion
   99 |   expect(botResponse).toBeTruthy();
  100 |
  101 |   }
  102 |
  103 | //Scrolling to the bottom of the page
  104 | async scrollToBottom() {
  105 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  106 |
  107 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).isVisible();
  108 |   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  109 |   await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  110 |
  111 |   }
  112 |
  113 |   async Pagereload() {
  114 |
  115 |     // Re-locate the iframe after reload
  116 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  117 |     
  118 |     // Assert that no bot messages are present after reload
  119 |     const botMessages = await frameLocator.locator('.system-message-text');
  120 |     
  121 |     // ✅ Assert that it is **not visible**
  122 |     await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
  123 |     
  124 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  125 |   
  126 |     }
  127 |
  128 |     async NewsesionChatbotPage() {
  129 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  130 |     
  131 |       // Assert that no bot messages are present after reload
  132 |       const botMessages = await frameLocator.locator('.system-message-text');
  133 |
  134 |       await botMessages.getByTestId(Chatbotlocator.NewsessionBtn).isVisible();
  135 |       await botMessages.getByTestId(Chatbotlocator.NewsessionBtn).click();
  136 |       
  137 |
  138 | }
  139 |
  140 | async OpenHamburgerMenu() {
  141 |         
  142 |
  143 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  144 | const iconButtons = frameLocator.getByRole('button', { name: 'icon' });
  145 |
  146 | await iconButtons.nth(2).isVisible();
  147 | await iconButtons.nth(2).click( { force: true });
  148 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  149 | await frameLocator.getByTestId('start-new-session').isVisible();
  150 | }
  151 |
  152 | async LoadmoreBtn() {
  153 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  154 |
  155 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
> 156 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
      |                                                          ^ Error: locator.click: Target page, context or browser has been closed
  157 |   //const sessionList = this.page.locator('ul.session-list');
  158 |  // await expect(sessionList).toBeVisible();
  159 |   }
  160 |
  161 |
  162 |   async SearchHistory() {
  163 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  164 |     await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
  165 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  166 | const input = frame.locator(Chatbotlocator.Searchbar);
  167 |
  168 | await expect(input).toBeVisible();
  169 | await input.click({ force: true }); // optional if needed
  170 | await input.fill(this.userMessage);
  171 | //await expect(sessionList).toHaveText(this.userMessage);
  172 |     }
  173 |   
  174 |     async NoSearchHistory() {
  175 |       const userMessage = generateRandomQuestion()
  176 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  177 |       await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  178 |       await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
  179 |       await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  180 |       }
  181 |     
  182 | async CloseHamburgerMenu() {
  183 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  184 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  185 | await frameLocator.getByRole('button', { name: 'Close' }).click();
  186 | }
  187 |
  188 | async Newsession() {
  189 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  190 | const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });
  191 |
  192 | await HamburgericonButtons.nth(2).click();
  193 |
  194 | await frameLocator.getByTestId('start-new-session').isVisible();
  195 | await frameLocator.getByTestId('start-new-session').click();
  196 | }
  197 |
  198 |
  199 |
  200 | }
```