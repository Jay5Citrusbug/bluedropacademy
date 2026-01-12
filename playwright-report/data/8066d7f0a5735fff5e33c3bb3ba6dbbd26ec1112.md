# Test info

- Name: BlueDrop Chatbot Test Suite >> TC_11: 🔄 Reload hides previous chat
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:105:11

# Error details

```
Error: page.reload: Target page, context or browser has been closed
Call log:
  - waiting for navigation until "load"
    - navigated to "https://www.bluedropacademy.com/blue"

    at D:\Automation\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:106:20
```

# Test source

```ts
   6 | import { HamburgerMenuPage } from './Pages/HamburgerMenuPage';
   7 | import { ChatbotLoginPage } from './Pages/LoginChatbot';
   8 | import { testUserData } from './Utils/testData';
   9 |
   10 | let page: Page;
   11 | let context: BrowserContext;
   12 | let chatbot: ChatbotLoginPage;
   13 | let form: FillPersonalInfopage;
   14 | let chatbotscreen: chatbotPage;
   15 | let adminPage: AdminPage;
   16 | let Menu: HamburgerMenuPage;
   17 |
   18 |
   19 |   test.afterAll(async () => {
   20 |     await context.close();
   21 |
   22 |   });
   23 |
   24 | test.describe('BlueDrop Chatbot Test Suite', () => {
   25 |
   26 |   test('TC_01: ✅ Confirm chatbot screen elements are visible', async ({ browser }) => {
   27 |
   28 |     // 🔹 Step 1: Reset user from Admin
   29 |     const adminContext = await browser.newContext();
   30 |     const adminPageInstance = await adminContext.newPage();
   31 |     const admin = new AdminPage(adminPageInstance);
   32 |
   33 |     await admin.goto();
   34 |     await admin.login(adminCredentials.email, adminCredentials.password);
   35 |     await admin.resetUserData(testUserData.email);
   36 |     await adminContext.close();
   37 |     console.log('✅ User reset complete');
   38 |
   39 |     // 🔹 Step 2: Login chatbot and fill form
   40 |     context = await browser.newContext();
   41 |     page = await context.newPage();
   42 |     chatbot = new ChatbotLoginPage(page);
   43 |     form = new FillPersonalInfopage(page);
   44 |     chatbotscreen = new chatbotPage(page);
   45 |
   46 |     await chatbot.goto();
   47 |     await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
   48 |     await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
   49 |     await form.fillPersonalInfo(testUserData.name, testUserData.gender);
   50 |     console.log('✅ Chatbot login and form submitted');
   51 |
   52 |     // 🔹 Step 3: Run main test
   53 |     await chatbotscreen.verifyConfirmationElements();
   54 |
   55 |   });
   56 |
   57 |     test('TC_02: 🧠 Initial chatbot message is displayed', async () => {
   58 |       await chatbotscreen.InitialbotMessage(testUserData.name);
   59 |     });
   60 |
   61 |
   62 |     test('TC_03: 🚫 Predefined buttons are not active', async () => {
   63 |       await chatbotscreen.PredefinebuttonNotActive();
   64 |     });
   65 |
   66 |     // test('TC_04: 🚫 Submit button is disabled initially', async () => {
   67 |     //   await chatbotscreen.SubmitbtnNotActive();
   68 |     // });
   69 |
   70 |     test('TC_04: ✅ Submit button is enabled after input', async () => {
   71 |       await chatbotscreen.SubmitbtnActive();
   72 |     });
   73 |
   74 |     test('TC_05: 📤 Submit query message', async ({}, testInfo) => {
   75 |      // await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('switch', { name: 'icon' }).click();
   76 |       await chatbotscreen.SubmitQuery(testInfo);
   77 |     });
   78 |
   79 |     test('TC_06: 🔽 Scroll to bottom of chat', async ({},testInfo) => {
   80 |       await chatbotscreen.scrollToBottom();
   81 |     });
   82 |
   83 |   
   84 |     // test('TC_08: ✅ Predefined buttons become active after response', async () => {
   85 |     //   await chatbotscreen.PredefinebuttonActive();
   86 |     // });
   87 |
   88 |     test('TC_07: 👍 Like button functionality', async () => {
   89 |       await chatbotscreen.LikeBtn();
   90 |     });
   91 |
   92 |     test('TC_08: 👎 Dislike button functionality', async () => {
   93 |       await chatbotscreen.DisLikeBtn();
   94 |     });
   95 |
   96 |     test('TC_09: 📋 Copy button functionality', async () => {
   97 |       await chatbotscreen.CopyBtn(); // changed from DisLikeBtn to CopyBtn for clarity
   98 |     });
   99 |
  100 |
  101 |     test('TC_10: 📍 Predefined button click triggers response', async ({}, testInfo) => {
  102 |       await chatbotscreen.PredefinedBtnClick(testInfo);
  103 |     });
  104 |
  105 |       test('TC_11: 🔄 Reload hides previous chat', async () => {
> 106 |         await page.reload();
      |                    ^ Error: page.reload: Target page, context or browser has been closed
  107 |         await chatbotscreen.Pagereload();
  108 |         await chatbotscreen.InitialbotMessage(testUserData.name);
  109 |     });
  110 |
  111 |     test('TC_12: ✏️ New session is created using edit icon', async () => {
  112 |       await chatbotscreen.NewsessionChatbotPage();
  113 |       await chatbotscreen.Pagereload();
  114 |       await chatbotscreen.InitialbotMessage(testUserData.name);
  115 |     });
  116 |
  117 |  
  118 | test('TC_13: 🔄 Session pop-up displays after 10 minutes and Click on the Continue button to resume session', async () => {
  119 |  const env = process.env.ENVIRONMENT || 'staging';
  120 |   if (env === 'production') {
  121 |     test.setTimeout(610_000); // 10 min 10 sec
  122 |   }
  123 |   await chatbotscreen.InactivityPopup1();
  124 | });
  125 |
  126 | const env = process.env.ENVIRONMENT || 'staging';
  127 |
  128 |   // Skip this test in production
  129 |   test('TC_14: ⏱️ Session pop-up displays after 10 minutes and close pop-up', async ({ page }) => {
  130 |   test.skip(env === 'production', 'Skipping in production environment');
  131 |
  132 |     await chatbotscreen.InactivityPopup2();
  133 |     await page.reload();
  134 |     await chatbotscreen.InitialbotMessage(testUserData.name);
  135 |   });
  136 |
  137 |
  138 |
  139 | test.afterEach(async ({ page }, testInfo) => {
  140 |   if (testInfo.status !== testInfo.expectedStatus) {
  141 |     const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
  142 |     await page.screenshot({ path: screenshotPath, fullPage: true });
  143 |     console.log(`❌ Test failed: ${testInfo.title}`);
  144 |     console.log(`📸 Screenshot saved at: ${screenshotPath}`);
  145 |   }
  146 |
  147 |   // const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
  148 |   // if (videoPath) {
  149 |   //   testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
  150 |   // }
  151 | });
  152 |
  153 |
  154 | });
```