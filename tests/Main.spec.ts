
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

test.describe('Login Test Suite (Post-login session)', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    
//     // await adminPage.goto();
//     // await adminPage.login(adminCredentials.email, adminCredentials.password);
//     // await adminPage.resetUserData(testUserData.email);
    chatbot = new ChatbotLoginPage(page);
    form = new FillPersonalInfopage(page);
    chatbotscreen = new chatbotPage(page);

    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
  });

  test.afterAll(async () => {
    await context.close();
  });


  test('TC_01: Submit form with invalid data', async () => {
    await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
  });

  test('TC_02: Submit form with valid data', async () => {
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);

  });

  test('TC_03: Verify chatbot confirmation screen', async () => {
    await chatbotscreen.verifyConfirmationElements();

  });
});
