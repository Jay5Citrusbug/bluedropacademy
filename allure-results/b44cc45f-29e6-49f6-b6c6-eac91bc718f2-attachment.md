# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_11: Like and Dislike buttons
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:84:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveAttribute(expected)

Locator: locator('[data-testid="like-thumb"] img')
Expected string: "1"
Received: <element(s) not found>
Call log:
  - expect.toHaveAttribute with timeout 5000ms
  - waiting for locator('[data-testid="like-thumb"] img')

    at chatbotPage.LikeBtn (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:224:7)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:85:7
```

# Test source

```ts
  124 |
  125 |     // Re-locate the iframe after reload
  126 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  127 |     
  128 |     // Assert that no bot messages are present after reload
  129 |     const botMessages = await frameLocator.locator('.system-message-text');
  130 |     
  131 |     // ✅ Assert that it is **not visible**
  132 |     await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
  133 |     
  134 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  135 |   
  136 |     }
  137 |
  138 |     async NewsesionChatbotPage() {
  139 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  140 |     
  141 |       // Assert that no bot messages are present after reload
  142 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).isVisible();
  143 |       await frameLocator.locator(Chatbotlocator.NewsessionBtn).click();      
  144 |
  145 | }
  146 |
  147 | async OpenHamburgerMenu() {
  148 |         
  149 |
  150 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  151 | const iconButtons = frameLocator.getByRole('button', { name: 'icon' }).nth(2);
  152 |
  153 | await iconButtons.isVisible();
  154 | await iconButtons.click( { force: true });
  155 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  156 | await frameLocator.getByTestId('start-new-session').isVisible();
  157 | }
  158 |
  159 | async LoadmoreBtn() {
  160 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  161 |
  162 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  163 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  164 |   //const sessionList = this.page.locator('ul.session-list');
  165 |  // await expect(sessionList).toBeVisible();
  166 |   }
  167 |
  168 |
  169 |   async SearchHistory() {
  170 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  171 |     await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
  172 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  173 | const input = frame.locator(Chatbotlocator.Searchbar);
  174 |
  175 | await expect(input).toBeVisible();
  176 | await input.click({ force: true }); // optional if needed
  177 | await input.fill(this.userMessage);
  178 | //await expect(sessionList).toHaveText(this.userMessage);
  179 |     }
  180 |   
  181 |     async NoSearchHistory() {
  182 |       const userMessage = generateRandomQuestion()
  183 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  184 |       await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  185 |       await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
  186 |       await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  187 |       }
  188 |     
  189 | async CloseHamburgerMenu() {
  190 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  191 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  192 | await frameLocator.getByRole('button', { name: 'Close' }).click();
  193 | }
  194 |
  195 | async Newsession() {
  196 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  197 | const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });
  198 |
  199 | await HamburgericonButtons.nth(2).click();
  200 |
  201 | await frameLocator.getByTestId('start-new-session').isVisible();
  202 | await frameLocator.getByTestId('start-new-session').click();
  203 | }
  204 |
  205 | async Wait() {
  206 |   console.log('Waiting for 10 minutes...');
  207 |   this.page.setDefaultTimeout(11 * 60 * 1000);
  208 |
  209 |   // Optional: increase timeout for Playwright actions (e.g., expect)
  210 |   this.page.setDefaultTimeout(60 * 1000); // 1 minute timeout for actions
  211 |
  212 |   await this.page.waitForTimeout(10 * 60 * 1000); // wait 10 minutes
  213 |   console.log('Wait complete!');await expect(this.page.locator('text=היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.')).toBeVisible();
  214 |
  215 |
  216 |   }
  217 |
  218 |   async LikeBtn() {
  219 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  220 |     await frameLocator.locator(Chatbotlocator.LikeBtn).isVisible();
  221 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  222 |     await expect(
  223 |       this.page.locator('[data-testid="like-thumb"] img')
> 224 |     ).toHaveAttribute('data-value', '1');
      |       ^ Error: Timed out 5000ms waiting for expect(locator).toHaveAttribute(expected)
  225 |     
  226 |   }
  227 |
  228 |   async DisLikeBtn() {
  229 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  230 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).isVisible();
  231 |     const dislikeBtn = this.page.locator(Chatbotlocator.DisLikeBtn);
  232 |     await dislikeBtn.click();
  233 |     await expect(dislikeBtn.locator('img')).toHaveAttribute('src', /fill='%23008AFC'/);
  234 |
  235 |
  236 |     
  237 |   }
  238 |
  239 | }
```