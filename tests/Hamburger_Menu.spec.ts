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

    test('TC_16 🔓 Open Hamburger Menu', async () => {
      console.log('✅ TC_15: Open Hamburger Menu');
      await Menu.OpenHamburgerMenu();
    });

    test('TC_17 ➕ Load More button functionality', async () => {
      console.log('✅ TC_16: Load More button functionality');
      await Menu.LoadmoreBtn();
    });

    test('TC_18 🔍 Search in chat history', async () => {
      console.log('✅ TC_17: Search in chat history');
      await Menu.SearchHistory();
    });

    test('TC_19 ❌ No result in chat history', async () => {
      console.log('✅ TC_18: No result in chat history');
      await Menu.NoSearchHistory();
    });

    test('TC_20 ❎ Close Hamburger Menu', async () => {
      console.log('✅ TC_19: Close Hamburger Menu');
      await Menu.CloseHamburgerMenu();
    });

    test('TC_21 🆕 New session with "שיחה חדשה"', async () => {
      console.log('✅ TC_20: Start new session using "שיחה חדשה"');
      await Menu.Newsession();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });

    test('TC_22 ✏️ Edit and save changes in chat history', async () => {
      console.log('✅ TC_21: Edit and save changes in chat history');
      await Menu.OpenHamburgerMenu();
      await Menu.Edithistory();
    });

    test('TC_23 🔁 Continue Chat Functionality', async () => {
      console.log('✅ TC_22: Continue Chat Functionality');
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
