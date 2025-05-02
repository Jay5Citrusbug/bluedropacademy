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
    // Step 1: Admin context and login
    const adminContext = await browser.newContext();
    const adminPageInstance = await adminContext.newPage();
    const adminPage = new AdminPage(adminPageInstance);
    // await adminPage.goto();
    // await adminPage.login(adminCredentials.email, adminCredentials.password);
    // await adminPage.resetUserData(testUserData.email);
    // await adminContext.close();

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

  test.describe('Form Submission', () => {

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
    });
  
    test('TC_08: Submit query', async ({}, testInfo) => {
      await chatbotscreen.SubmitQuery(testInfo);
    });
  
    test('TC_09: Scroll to bottom', async () => {
      await chatbotscreen.scrollToBottom();
    });
    
    test('TC_10: Wait 10 min', async () => {
        await chatbotscreen.Wait();
      });
   
 
  });
