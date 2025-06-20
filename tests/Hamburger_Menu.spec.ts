import { BrowserContext, Page, test, expect } from '@playwright/test';
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
let adminPage: AdminPage;
let Menu: HamburgerMenuPage;
let chatbotscreen: chatbotPage;


test.describe('BlueDrop Hamburgermenu Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    const adminContext = await browser.newContext();
    const adminPageInstance = await adminContext.newPage();
    const adminPage = new AdminPage(adminPageInstance);
    await adminPage.goto();
    await adminPage.login(adminCredentials.email, adminCredentials.password);
    await adminPage.resetUserData(testUserData.email);
    await adminContext.close();

    context = await browser.newContext();
    page = await context.newPage();
    chatbot = new ChatbotLoginPage(page);
    form = new FillPersonalInfopage(page);
    Menu = new HamburgerMenuPage(page);
    chatbotscreen = new chatbotPage(page);

    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
    await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.describe('Hamburger Menu & 📜 Chat History', () => {

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

    test('TC_19 🔓 Open Hamburger Menu', async () => {
      console.log('✅ TC_19: Open Hamburger Menu');
      await Menu.OpenHamburgerMenu();
    });

    test('TC_20 ➕ Load More button functionality', async () => {
      console.log('✅ TC_20: Load More button functionality');
      await Menu.LoadmoreBtn();
    });


    test('TC_21 ❌ No result in chat history', async () => {
      console.log('✅ TC_21: No result in chat history');
      await Menu.NoSearchHistory();
    });

    test('TC_22 ❎ Close Hamburger Menu', async () => {
      console.log('✅ TC_22: Close Hamburger Menu');
      await Menu.CloseHamburgerMenu();
    });

    test('TC_23 🆕 New session with "שיחה חדשה"', async () => {
      console.log('✅ TC_23: Start new session using "שיחה חדשה"');
      await Menu.Newsession();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage( testUserData.name);
    });

    test('TC_24 ✏️ Edit and save changes in chat history', async () => {
      console.log('✅ TC_24: Edit and save changes in chat history');
      await Menu.OpenHamburgerMenu();
      await Menu.Edithistory();
    });

    test('TC_25 🔁 Continue Chat Functionality', async () => {
     
     console.log('✅ TC_25: Continue Chat Functionality');
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
