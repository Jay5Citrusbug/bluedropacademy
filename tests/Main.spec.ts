import { test } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { chatbotCredentials } from './Config/credentials';
import { testUserData } from './Utils/testData';

//let adminPage: AdminPage;

test.describe('Login Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // adminPage = new AdminPage(page);
  
    // await adminPage.goto();
    // await adminPage.login(adminCredentials.email, adminCredentials.password);
    // await adminPage.resetUserData(testUserData.email);
  
    // await context.close(); // Optional: Clean up after admin tasks
  });

  test('TC_01: Navigate to the Bluedrop page.', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);
    await chatbot.goto();
    await page.close(); // Close the page after the test
  });

  test('TC_02: Login with valid credentials.', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);
    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
  });
  
  test('TC_03: Form submission after login', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);
    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);

    const form = new FillPersonalInfopage(page);
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);

  // If needed later, fix and use this test too:
  // test('TC_04: Another form test.', async ({ page }) => {
  //   const chatbot = new ChatbotLoginPage(page);
  //   await chatbot.fillPersonalInfo(testUserData.name, testUserData.gender);
 });
});

