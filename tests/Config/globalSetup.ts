// globalSetup.ts
import { chromium } from '@playwright/test';
import { chatbotCredentials } from '../Config/credentials';
import { ChatbotLoginPage } from '../Pages/LoginChatbot';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const login = new ChatbotLoginPage(page);     
    await login.goto();

  const chatbot = new ChatbotLoginPage(page);
  await chatbot.goto();
  await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);

  // Save the session (cookies, local storage)
await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
