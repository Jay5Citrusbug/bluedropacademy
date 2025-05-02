import { BrowserContext, Page, test, expect } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { adminCredentials, chatbotCredentials } from './Config/credentials';
import { AdminPage } from './Pages/AdminPage';
import { chatbotPage } from './Pages/chatbotPage';

let page: Page;
let context: BrowserContext;
let chatbot: ChatbotLoginPage;
let form: FillPersonalInfopage;
let chatbotscreen: chatbotPage;
let adminPage: AdminPage;

test.describe('BlueDrop test cases', () => {

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
    chatbotscreen = new chatbotPage(page);

    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.describe('Form Submission', () => {
    test('TC_01: Submit without required fields', async () => {
      await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
    });

    test('TC_02: Submit with valid data', async () => {
      await form.fillPersonalInfo(testUserData.name, testUserData.gender);
    });
  });

  test.describe('Chatbot Screen', () => {
    test('TC_03: Confirm chatbot screen elements', async () => {
      await chatbotscreen.verifyConfirmationElements();
    });

    test('TC_04: Initial chatbot message', async () => {
      await chatbotscreen.InitialbotMessage();
    });

    test('TC_05: Predefined buttons are not active', async () => {
      await chatbotscreen.PredefinebuttonNotActive();
    });

    test('TC_06: Submit button is disabled', async () => {
      await chatbotscreen.SubmitbtnNotActive();
    });

    test('TC_07: Submit button is enabled', async () => {
      await chatbotscreen.SubmitbtnActive();
    });

    test('TC_08: Submit query', async ({}, testInfo) => {
      await chatbotscreen.SubmitQuery(testInfo);
    });

    test('TC_09: Scroll to bottom', async () => {
      await chatbotscreen.scrollToBottom();
    });

    test('TC_10: Predefined buttons are active', async () => {
      await chatbotscreen.PredefinebuttonActive();
    });

    test('TC_11: Like and Dislike buttons', async () => {
      await chatbotscreen.LikeBtn();
    });

    test('TC_12: Dislike buttons', async () => {
     await chatbotscreen.DisLikeBtn();
    });

    
    test('TC_13: Copy buttons', async () => {
      await chatbotscreen.DisLikeBtn();
     });

    test('TC_14: Reload hides old chat', async () => {
      await page.reload();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });

    test('TC_15: Create new session using "edit" icon button', async () => {
      await chatbotscreen.NewsesionChatbotPage();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });
  });

  test.describe('Hamburger Menu & History', () => {
    test('TC_16: Open Hamburger Menu', async () => {
      await chatbotscreen.OpenHamburgerMenu();
    });

    test('TC_17: Load More button functionality', async () => {
      await chatbotscreen.LoadmoreBtn();
    });

    test('TC_18: Search in chat history', async () => {
      await chatbotscreen.SearchHistory();
    });

    test('TC_19: No result in chat history', async () => {
      await chatbotscreen.NoSearchHistory();
    });

    test('TC_20: Close Hamburger Menu', async () => {
      await chatbotscreen.CloseHamburgerMenu();
    });

    test('TC_21: New session with "שיחה חדשה"', async () => {
      await chatbotscreen.Newsession();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }

    const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
    if (videoPath) {
      testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
    }
  });

});
