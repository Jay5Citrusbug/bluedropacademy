# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_17: 🧭 Browser tab terminated and search history page is verified
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:135:6

# Error details

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('hamburger-click')

    at D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:142:102
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
   42 |     await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
   43 |     await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
   44 |     await form.fillPersonalInfo(testUserData.name, testUserData.gender);
   45 |     console.log('✅ Chatbot login and form submitted');
   46 |   });
   47 |
   48 |   test.afterAll(async () => {
   49 |     console.log('🧹 Closing context');
   50 |     await context.close();
   51 |   });
   52 |
   53 |   test.describe('💬 Chatbot Screen', () => {
   54 |
   55 |     test('TC_01: ✅ Confirm chatbot screen elements are visible', async () => {
   56 |       await chatbotscreen.verifyConfirmationElements();
   57 |     });
   58 |
   59 |     test('TC_02: 🧠 Initial chatbot message is displayed', async () => {
   60 |       await chatbotscreen.InitialbotMessage();
   61 |     });
   62 |
   63 |
   64 |     test('TC_03: 🚫 Predefined buttons are not active', async () => {
   65 |       await chatbotscreen.PredefinebuttonNotActive();
   66 |     });
   67 |
   68 |     test('TC_04: 🚫 Submit button is disabled initially', async () => {
   69 |       await chatbotscreen.SubmitbtnNotActive();
   70 |     });
   71 |
   72 |     test('TC_05: ✅ Submit button is enabled after input', async () => {
   73 |       await chatbotscreen.SubmitbtnActive();
   74 |     });
   75 |
   76 |     test('TC_06: 📤 Submit query message', async ({}, testInfo) => {
   77 |       await chatbotscreen.SubmitQuery(testInfo);
   78 |     });
   79 |
   80 |     test('TC_07: 🔽 Scroll to bottom of chat', async () => {
   81 |       await chatbotscreen.scrollToBottom();
   82 |     });
   83 |
   84 |     test('TC_08: ✅ Predefined buttons become active after response', async () => {
   85 |       await chatbotscreen.PredefinebuttonActive();
   86 |     });
   87 |
   88 |     test('TC_09: 👍 Like button functionality', async () => {
   89 |       await chatbotscreen.LikeBtn();
   90 |     });
   91 |
   92 |     test('TC_10: 👎 Dislike button functionality', async () => {
   93 |       await chatbotscreen.DisLikeBtn();
   94 |     });
   95 |
   96 |     test('TC_11: 📋 Copy button functionality', async () => {
   97 |       await chatbotscreen.CopyBtn(); // changed from DisLikeBtn to CopyBtn for clarity
   98 |     });
   99 |
  100 |     test('TC_12: 📍 Predefined button click triggers response', async ({}, testInfo) => {
  101 |       await chatbotscreen.PredefinedBtnClick(testInfo);
  102 |     });
  103 |
  104 |     test('TC_13: 🔄 Reload hides previous chat', async () => {
  105 |       await page.reload();
  106 |       await chatbotscreen.Pagereload();
  107 |       await chatbotscreen.InitialbotMessage();
  108 |     });
  109 |
  110 |     test('TC_14: ✏️ New session is created using edit icon', async () => {
  111 |       await chatbotscreen.NewsessionChatbotPage();
  112 |       await chatbotscreen.Pagereload();
  113 |       await chatbotscreen.InitialbotMessage();
  114 |     });
  115 |
  116 |  
  117 | test('TC_15: 🔄 Click on the Continue button to resume session', async () => {
  118 |       await chatbotscreen.InactivityPopup1();
  119 |
  120 |     }
  121 |     );
  122 |
  123 | const env = process.env.ENVIRONMENT || 'staging';
  124 | test.skip(env === 'production', '⏭️ Skipping in production environment');
  125 |
  126 | test('TC_16: ⏱️ Session pop-up displays after 1 minute and close pop-up', async () => {
  127 |         await chatbotscreen.InactivityPopup2();
  128 |         await page.reload();
  129 |         await chatbotscreen.InitialbotMessage();
  130 |
  131 |
  132 |     }
  133 |     );
  134 |     
  135 | test.only('TC_17: 🧭 Browser tab terminated and search history page is verified', async ({ page }, testInfo) => {
  136 |
  137 |   const query = await chatbotscreen.SubmitQuery(testInfo);
  138 |   await page.reload();
  139 |   const Menu = new HamburgerMenuPage(page);
  140 |   const iframe = await page.frameLocator('iframe[name="htmlComp-iframe"]');
  141 |
> 142 |   await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('hamburger-click').click();
      |                                                                                                      ^ Error: locator.click: Test timeout of 180000ms exceeded.
  143 |   console.log(`🔍 Searching for message: "${query}"`);
  144 |
  145 |   const input = iframe.locator(MenuLocator.Searchbar);
  146 |   await expect(input).toBeVisible();
  147 |   await input.fill(query);
  148 |
  149 |   const sessionList = iframe.locator('.session-list');
  150 |
  151 |   await expect(sessionList).toBeVisible();
  152 |
  153 |   // Optionally wait a bit for the list to update
  154 |   await page.waitForTimeout(3000);
  155 |
  156 |   // Debug: log what’s actually inside the session list
  157 |   const sessionText = await sessionList.innerText();
  158 |   console.log(`📋 Session List Text: \n${sessionText}`);
  159 |
  160 |   // Assert: relaxed match (contains part of the query)
  161 |   await expect(sessionText.toLowerCase()).toContain(query.toLowerCase().trim());
  162 |
  163 |   // 🧪 Optional: stricter version, if needed:
  164 |   await expect(sessionList).toContainText(query);
  165 |
  166 |   await page.close();
  167 | });
  168 |
  169 |
  170 | test.afterEach(async ({ page }, testInfo) => {
  171 |   if (testInfo.status !== testInfo.expectedStatus) {
  172 |     const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
  173 |     await page.screenshot({ path: screenshotPath, fullPage: true });
  174 |     console.log(`❌ Test failed: ${testInfo.title}`);
  175 |     console.log(`📸 Screenshot saved at: ${screenshotPath}`);
  176 |   }
  177 |
  178 |   const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
  179 |   if (videoPath) {
  180 |     testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
  181 |   }
  182 | });
  183 | });
  184 | })
  185 |
```