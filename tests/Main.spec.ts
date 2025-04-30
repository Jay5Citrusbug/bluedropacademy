
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
let adminPage: AdminPage


test.describe('Login Test Suite (Post-login session)', () => {
  test.beforeAll(async ({ browser }) => {
   // Step 1: Admin context and login
    const adminContext = await browser.newContext();
    const adminPageInstance = await adminContext.newPage();
    const adminPage = new AdminPage(adminPageInstance);
  
    await adminPage.goto();
    await adminPage.login(adminCredentials.email, adminCredentials.password);
    await adminPage.resetUserData(testUserData.email);
    await adminContext.close(); // Close admin session
  
    // Step 2: Chatbot context and login
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


  test('TC_01: Verify Form Submission by without entering the required value.', async () => {
    await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
  });

  test('TC_02: Verify Form Submission valid data', async () => {
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);

  });

  test('TC_03: Verify chatbot screen', async () => {
    await chatbotscreen.verifyConfirmationElements();

  });

  test('TC_04: Verify chatbot screen', async () => {

    await chatbotscreen.InitialbotMessage();
  });


  test('TC_05: Verify the Sumit button disable.', async () => {
    await chatbotscreen.SubmitbtnNotActive();
  }
  );
  test('TC_06: Verify the Sumit button enable.', async () => {
    await chatbotscreen.SubmitbtnActive();
  }
  );
  
test('TC_0: Verify the Sumit button.', async () => {
  await chatbotscreen.Submitquery();
}
);

} )
