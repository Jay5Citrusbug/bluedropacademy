import { BrowserContext, Page, test } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { adminCredentials, chatbotCredentials } from './Config/credentials';
import { AdminPage } from './Pages/AdminPage';
import { HamburgerMenuPage } from './Pages/HamburgerMenuPage';
import { chatbotPage } from './Pages/chatbotPage';

let page: Page;
let context: BrowserContext;
let chatbot: ChatbotLoginPage;
let form: FillPersonalInfopage;
let Menu: HamburgerMenuPage;
let chatbotscreen: chatbotPage;

test.describe('BlueDrop Hamburger Menu Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    // Create a new browser context and page
    const context = await browser.newContext();
    page = await context.newPage();

    // Initialize page objects
    chatbot = new ChatbotLoginPage(page);
    Menu = new HamburgerMenuPage(page);
    chatbotscreen = new chatbotPage(page);

    // Login once
    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
  });

  test.afterAll(async () => {
    await page.context().close(); // closes browser after suite
  });
  test.describe('Hamburger Menu & 📜 Chat History', () => {

    test('TC_15 🔓 Open Hamburger Menu', async () => {
      console.log('✅ TC_15: Open Hamburger Menu');
      await Menu.OpenHamburgerMenu();
    });

//   test('TC_18 🔍 Search in chat history', async ({}, testInfo) => {
//   console.log('✅ TC_18: Search in chat history');
//   const query = await chatbotscreen.SubmitQuery(testInfo);
//   await chatbotscreen.scrollToBottom()
//   //await chatbotscreen.PredefinebuttonActive()
//   await page.reload();
//   await chatbotscreen.InitialbotMessage();
//   await Menu.OpenHamburgerMenu();
//   await Menu.SearchHistory(query);  // Pass query to search
//   await Menu.CloseHamburgerMenu();

// });

// test.only('TC_17: 🧭 Browser tab terminated and search history page is verified', async ({ page }, testInfo) => {

//     console.log('📂 Opening hamburger menu...');
//     await page.evaluate(() => window.scrollTo(0, 0));
//   await expect(Menu.menuButton).toBeVisible();
//   await Menu.menuButton.click({ force: true });

//   const query = await chatbotscreen.SubmitQuery(testInfo);
//   await page.reload();
//    const iframe = await page.frameLocator('iframe[name="htmlComp-iframe"]');
  
//   console.log(`🔍 Searching for message: "${query}"`);

//   const input = iframe.locator(MenuLocator.Searchbar);
//   await expect(input).toBeVisible();
//   await input.fill(query);

//   const sessionList = iframe.locator('.session-list');

//   await expect(sessionList).toBeVisible();

//   // Optionally wait a bit for the list to update
//   await page.waitForTimeout(3000);

//   // Debug: log what’s actually inside the session list
//   const sessionText = await sessionList.innerText();
//   console.log(`📋 Session List Text: \n${sessionText}`);

//   // Assert: relaxed match (contains part of the query)
//   await expect(sessionText.toLowerCase()).toContain(query.toLowerCase().trim());

//   // 🧪 Optional: stricter version, if needed:
//   await expect(sessionList).toContainText(query);

//   await page.close();
// });

    test('TC_16 ➕ Load More button functionality', async () => {
      console.log('✅ TC_20: Load More button functionality');
      await Menu.LoadmoreBtn();
    });


    test('TC_17 ❌ No result in chat history', async () => {
      console.log('✅ TC_21: No result in chat history');
      await Menu.NoSearchHistory();
    });

    test('TC_18 ❎ Close Hamburger Menu', async () => {
      console.log('✅ TC_22: Close Hamburger Menu');
      await Menu.CloseHamburgerMenu();
    });

    test('TC_19 🆕 New session with "שיחה חדשה"', async () => {
      console.log('✅ TC_19: Start new session using "שיחה חדשה"');
      await Menu.Newsession();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage( testUserData.name);
    });

    test('TC_20 ✏️ Edit and save changes in chat history', async () => {
      console.log('✅ TC_20: Edit and save changes in chat history');
      await Menu.OpenHamburgerMenu();
      await Menu.Edithistory();
    });

    test('TC_21 🔁 Continue Chat Functionality', async () => {

      console.log('✅ TC_21: Continue Chat Functionality');
      await Menu.OpenHamburgerMenu();
      await page.evaluate(() => window.scrollTo(0, 0));
    await Menu.OpenHistory_ContinueSession();
    });

  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`🖼️ Screenshot saved: ${screenshotPath}`);
    }

    const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
    if (videoPath) {
      testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
    }
  });

});
