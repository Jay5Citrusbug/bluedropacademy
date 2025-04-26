// tests/loginTest.spec.ts
import { test, expect } from '@playwright/test';
import { AdminPage } from './Pages/AdminPage';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { chatbotCredentials,adminCredentials } from './Config/credentials'; 
import { testUserData } from './Utils/testData';

let adminPage: AdminPage;

test.describe('Login Test Suite', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    adminPage = new AdminPage(page);

    await adminPage.goto();
    await adminPage.login(adminCredentials.email,adminCredentials.password);
    await adminPage.resetUserData(testUserData.email);
  });

  test('Login to chatbot and answer questions', async ({ page }) => {
    const chatbot = new ChatbotLoginPage(page);

    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
    await chatbot.fillPersonalInfo(testUserData.name,testUserData.gender);
  });
});