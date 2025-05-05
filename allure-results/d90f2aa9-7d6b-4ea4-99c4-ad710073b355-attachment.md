# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_11: Click on predefined button click
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:95:10

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Explain me in detail so i can get it' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Explain me in detail so i can get it' })

    at chatbotPage.PredefinedBtnClick (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:226:33)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:96:27
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
  126 |
  127 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  128 |     const menuButton = frameLocator.getByRole('button', { name: 'icon' }).nth(2);
  129 |
  130 |     console.log('📂 Opening hamburger menu...');
  131 |     await expect(menuButton).toBeVisible();
  132 |     await menuButton.click({ force: true });
  133 |
  134 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
  135 |     await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
  136 |   }
  137 |
  138 |   async LoadmoreBtn() {
  139 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  140 |
  141 |     console.log('📜 Clicking Load More button...');
  142 |     await expect(frameLocator.locator(Chatbotlocator.LoadMoreBtn)).toBeVisible();
  143 |     await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  144 |   }
  145 |
  146 |   async SearchHistory() {
  147 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  148 |     console.log(`🔍 Searching for message: "${this.userMessage}"`);
  149 |
  150 |     const input = frameLocator.locator(Chatbotlocator.Searchbar);
  151 |     await expect(input).toBeVisible();
  152 |     await input.click({ force: true });
  153 |     await input.fill(this.userMessage);
  154 |   }
  155 |
  156 |   async NoSearchHistory() {
  157 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  158 |     const randomQuery = generateRandomQuestion();
  159 |
  160 |     console.log(`🔍 Searching for non-existent history: "${randomQuery}"`);
  161 |     await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  162 |     await frameLocator.locator(Chatbotlocator.Searchbar).fill(randomQuery);
  163 |     await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  164 |   
  165 |   }
  166 |
  167 |   async CloseHamburgerMenu() {
  168 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  169 |
  170 |     console.log('❌ Closing hamburger menu...');
  171 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
  172 |     await frameLocator.getByRole('button', { name: 'Close' }).click();
  173 |   }
  174 |
  175 |   async Newsession() {
  176 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  177 |
  178 |     console.log('🔁 Creating new session from hamburger menu...');
  179 |     await frameLocator.getByRole('button', { name: 'icon' }).nth(2).click();
  180 |     await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
  181 |     await frameLocator.getByTestId('start-new-session').click();
  182 |   }
  183 |
  184 |   async Wait() {
  185 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  186 |     
  187 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  188 |     this.page.setDefaultTimeout(11 * 60 * 1000);
  189 |     await this.page.waitForTimeout(10 * 60 * 1000);
  190 |     
  191 |     console.log('✅ Verifying idle timeout message appears...');
  192 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  193 |   }
  194 |
  195 |   async LikeBtn() {
  196 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  197 |
  198 |     console.log('👍 Clicking Like button...');
  199 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  200 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  201 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  202 |   }
  203 |
  204 |   async DisLikeBtn() {
  205 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  206 |
  207 |     console.log('👎 Clicking Dislike button...');
  208 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  209 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  210 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  211 |   }
  212 |
  213 |   async CopyBtn() {
  214 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  215 |
  216 |     console.log('📋 Clicking Copy button...');
  217 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  218 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  219 |   }
  220 |
  221 |   async PredefinedBtnClick(testInfo: TestInfo) {
  222 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  223 |     const predefinedBtn = frameLocator.getByRole('button', { name: 'Explain me in detail so i can get it' });
  224 |
  225 |     console.log('🔘 Clicking Predefined button...');
> 226 |     await expect(predefinedBtn).toBeVisible();
      |                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  227 |     await predefinedBtn.click();
  228 |     await this.page.waitForTimeout(9000);
  229 |
  230 |     const botMessages = await frameLocator.locator('.system-message-text').all();
  231 |     const lastMessage = botMessages[botMessages.length - 1];
  232 |     const botResponse = (await lastMessage.textContent())?.trim();
  233 |
  234 |     console.log(`✅ Bot response received: "${botResponse}"`);
  235 |
  236 |     testInfo.annotations.push({
  237 |       type: 'info',
  238 |       description: `Bot response: ${botResponse}`,
  239 |     });
  240 |
  241 |     expect(botResponse).toBeTruthy();
  242 |
  243 |
  244 |
  245 | }
  246 | }
```