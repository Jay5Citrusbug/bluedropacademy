# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_17: 🧭 Browser tab terminated and search history page is verified
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:136:6

# Error details

```
Error: locator.click: Target page, context or browser has been closed
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
   77 |       await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('switch', { name: 'icon' }).click();
   78 |       await chatbotscreen.SubmitQuery(testInfo);
   79 |     });
   80 |
   81 |   
   82 |     test('TC_08: ✅ Predefined buttons become active after response', async () => {
   83 |       await chatbotscreen.PredefinebuttonActive();
   84 |     });
   85 |
   86 |     test('TC_09: 👍 Like button functionality', async () => {
   87 |       await chatbotscreen.LikeBtn();
   88 |     });
   89 |
   90 |     test('TC_10: 👎 Dislike button functionality', async () => {
   91 |       await chatbotscreen.DisLikeBtn();
   92 |     });
   93 |
   94 |     test('TC_11: 📋 Copy button functionality', async () => {
   95 |       await chatbotscreen.CopyBtn(); // changed from DisLikeBtn to CopyBtn for clarity
   96 |     });
   97 |
   98 |     test('TC_07: 🔽 Scroll to bottom of chat', async ({},testInfo) => {
   99 |       await chatbotscreen.SubmitQuery(testInfo);
  100 |       await chatbotscreen.scrollToBottom();
  101 |     });
  102 |
  103 |     test('TC_12: 📍 Predefined button click triggers response', async ({}, testInfo) => {
  104 |       await chatbotscreen.PredefinedBtnClick(testInfo);
  105 |     });
  106 |
  107 |     test('TC_13: 🔄 Reload hides previous chat', async () => {
  108 |       await page.reload();
  109 |       await chatbotscreen.Pagereload();
  110 |       await chatbotscreen.InitialbotMessage();
  111 |     });
  112 |
  113 |     test('TC_14: ✏️ New session is created using edit icon', async () => {
  114 |       await chatbotscreen.NewsessionChatbotPage();
  115 |       await chatbotscreen.Pagereload();
  116 |       await chatbotscreen.InitialbotMessage();
  117 |     });
  118 |
  119 |  
  120 | test('TC_15: 🔄 Click on the Continue button to resume session', async () => {
  121 |       await chatbotscreen.InactivityPopup1();
  122 |
  123 |     }
  124 |     );
  125 |
  126 | const env = process.env.ENVIRONMENT || 'staging';
  127 | test.skip(env === 'production', '⏭️ Skipping in production environment');
  128 |
  129 | test('TC_16: ⏱️ Session pop-up displays after 1 minute and close pop-up', async () => {
  130 |         await chatbotscreen.InactivityPopup2();
  131 |         await page.reload();
  132 |         await chatbotscreen.InitialbotMessage();
  133 |     }
  134 |     );
  135 |     
  136 | test.only('TC_17: 🧭 Browser tab terminated and search history page is verified', async ({ page }, testInfo) => {
  137 |   // await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('switch', { name: 'icon' }).click();
  138 |   await page.evaluate(() => window.scrollTo(0, 0));
  139 | const frame = await page.frame({ name: 'htmlComp-iframe' });
  140 | await frame?.locator('button[data-testid="hamburger-click"]').click({ force: true });
  141 | await  console.log('Visible Hamburger Menu');
> 142 |   await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('hamburger-click').click({force: true});
      |                                                                                                      ^ Error: locator.click: Target page, context or browser has been closed
  143 |
  144 |   // const query = await chatbotscreen.SubmitQuery(testInfo);
  145 |   // await page.reload();
  146 |    const iframe = await page.frameLocator('iframe[name="htmlComp-iframe"]');
  147 |     const menuButton = iframe.locator(MenuLocator.hamburgerMenuBtn);
  148 |
  149 |   
  150 |   //console.log(`🔍 Searching for message: "${query}"`);
  151 |
  152 |   // const input = iframe.locator(MenuLocator.Searchbar);
  153 |   // await expect(input).toBeVisible();
  154 |   // await input.fill(query);
  155 |
  156 |   const sessionList = iframe.locator('.session-list');
  157 |
  158 |   await expect(sessionList).toBeVisible();
  159 |
  160 |   // Optionally wait a bit for the list to update
  161 |   await page.waitForTimeout(3000);
  162 |
  163 |   // Debug: log what’s actually inside the session list
  164 |   const sessionText = await sessionList.innerText();
  165 |   console.log(`📋 Session List Text: \n${sessionText}`);
  166 |
  167 |   // Assert: relaxed match (contains part of the query)
  168 |   await expect(sessionText.toLowerCase()).toContain(query.toLowerCase().trim());
  169 |
  170 |   // 🧪 Optional: stricter version, if needed:
  171 |   await expect(sessionList).toContainText(query);
  172 |
  173 |   await page.close();
  174 | });
  175 |
  176 |
  177 | test.afterEach(async ({ page }, testInfo) => {
  178 |   if (testInfo.status !== testInfo.expectedStatus) {
  179 |     const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
  180 |     await page.screenshot({ path: screenshotPath, fullPage: true });
  181 |     console.log(`❌ Test failed: ${testInfo.title}`);
  182 |     console.log(`📸 Screenshot saved at: ${screenshotPath}`);
  183 |   }
  184 |
  185 |   const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
  186 |   if (videoPath) {
  187 |     testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
  188 |   }
  189 | });
  190 | });
  191 | })
  192 |
```