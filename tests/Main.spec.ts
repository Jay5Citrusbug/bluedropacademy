import { test } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { adminCredentials } from './Config/credentials'
import { AdminPage } from './Pages/AdminPage';


test.describe('Login Test Suite (Post-login session)', () => {

  let adminPage: AdminPage;

test.describe('Login Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
   adminPage = new AdminPage(page);
   await ChatbotLoginPage
   const chatbot = new ChatbotLoginPage(page);
    

    // await adminPage.goto();
    // await adminPage.login(adminCredentials.email, adminCredentials.password);
    // await adminPage.resetUserData(testUserData.email);

  });

    test.beforeEach(async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);
   await chatbot.goto();
  });

  test('TC_01: Navigate to the chatbot page', async ({ page }) => {
   await page.close(); // Close the page after the test
  });

  test('TC_02: Verify Form Submission by without entering the required value.', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);

    const form = new FillPersonalInfopage(page);
    await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
  });

  test('TC_03: Verify Form Submission', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);
    const form = new FillPersonalInfopage(page);
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);
  });

  test('TC_04: Verify chatbot screen.', async ({ page }) => {
  
  });
});
  
});
