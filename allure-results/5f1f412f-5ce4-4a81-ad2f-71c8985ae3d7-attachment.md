# Test info

- Name: BlueDrop test cases >> Hamburger Menu & History >> TC_16: Close Hamburger Menu
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:117:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Close' })

    at chatbotPage.CloseHamburgerMenu (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:184:59)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:118:7
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
- iframe
```

# Test source

```ts
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
  146 | await iconButtons.nth(2).click();
  147 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
  148 | await frameLocator.getByTestId('start-new-session').isVisible();
  149 | }
  150 |
  151 | async LoadmoreBtn() {
  152 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  153 |
  154 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  155 |   await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  156 |   //const sessionList = this.page.locator('ul.session-list');
  157 |  // await expect(sessionList).toBeVisible();
  158 |   }
  159 |
  160 |
  161 |   async SearchHistory() {
  162 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  163 |     await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
  164 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  165 | const input = frame.locator(Chatbotlocator.Searchbar);
  166 |
  167 | await expect(input).toBeVisible();
  168 | await input.click({ force: true }); // optional if needed
  169 | await input.fill(this.userMessage);
  170 | //await expect(sessionList).toHaveText(this.userMessage);
  171 |     }
  172 |   
  173 |     async NoSearchHistory() {
  174 |       const userMessage = generateRandomQuestion()
  175 |       const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  176 |       await frameLocator.locator(Chatbotlocator.Searchbar).clear();
  177 |       await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
  178 |       await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  179 |       }
  180 |     
  181 | async CloseHamburgerMenu() {
  182 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  183 | await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
> 184 | await frameLocator.getByRole('button', { name: 'Close' }).click();
      |                                                           ^ Error: locator.click: Target page, context or browser has been closed
  185 | }
  186 |
  187 | async Newsession() {
  188 | const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  189 | const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });
  190 |
  191 | await HamburgericonButtons.nth(2).click();
  192 |
  193 | await frameLocator.getByTestId('start-new-session').isVisible();
  194 | await frameLocator.getByTestId('start-new-session').click();
  195 | }
  196 |
  197 |
  198 |
  199 | }
```