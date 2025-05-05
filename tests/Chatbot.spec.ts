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
      await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
      await form.fillPersonalInfo(testUserData.name, testUserData.gender);


    });  

  test.afterAll(async () => {
    await context.close();
  });

  test.describe('Chatbot Screen', () => {
    test('TC_02: Confirm chatbot screen elements', async () => {
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

    test('TC_11: Like buttons', async () => {
      await chatbotscreen.LikeBtn();
    });

    test('TC_12: Dislike buttons', async () => {
     await chatbotscreen.DisLikeBtn();
    });

    
    test('TC_13: Copy buttons', async () => {
      await chatbotscreen.DisLikeBtn();
     });

     test('TC_11: Click on predefined button click', async ({}, testInfo) => {
      await chatbotscreen.PredefinedBtnClick(testInfo);
    });

    test('TC_14: Reload hides old chat', async () => {
      await page.reload();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });

    test('TC_15: Create new session using "edit" icon button', async () => {
      await chatbotscreen.NewsessionChatbotPage();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });
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




