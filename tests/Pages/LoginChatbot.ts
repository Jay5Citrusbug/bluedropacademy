import { Page, expect, Locator, FrameLocator } from '@playwright/test';
import { chatbotLocators } from '../Locators/Login_chatbotLocator';

export class ChatbotLoginPage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator(chatbotLocators.iframeName);
  }

  // Navigates to the chatbot login page
   async goto() {
    console.log('Navigating to the admin page...');
 const Chatboturl = process.env.URL_CHATBOT ?? 'https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site';
    if (!Chatboturl) {
      throw new Error('Environment variable URL_CHATBOT is not defined.');
    }
    console.log('Navigating to the chatbot page...');
   await this.page.goto(Chatboturl);
    console.log('Successfully navigated to chatbot login page.');
  }
 
  // Logs in to chatbot using email and password
  async login(email: string, password: string) {
    const timeoutLimit = 30000; // assuming 30 seconds timeout (adjust as per your global config)

    try {
      console.log('Clicking "Login with Email" button...');
      await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();

      console.log(`Filling in email: ${email}`);
      await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);

      console.log('Filling in password...');
      await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);

      console.log('Clicking "Submit" to log in...');
      await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();

      console.log('Waiting for page navigation after login...');
      await this.page.waitForURL(/.*chat6.*/, { timeout: timeoutLimit });
      console.log('URL indicates successful navigation to chat page.');

      // const iframeName = chatbotLocators.iframeName.replace('iframe[name="', '').replace('"]', '');
      // console.log(`Waiting for iframe [${iframeName}] to be visible in DOM...`);
      // await this.page.waitForSelector(`iframe[name="${iframeName}"]`, { timeout: timeoutLimit });

     // console.log('Locating title inside iframe for verification...');
      const iframeLocator = this.page.frameLocator(chatbotLocators.iframeName);
      const verifyTitle = iframeLocator.getByRole('heading', { name: chatbotLocators.FormTitle.name });

      await expect(verifyTitle).toBeVisible({ timeout: timeoutLimit });

      console.log('✅ Login process completed and iframe title located successfully.');
    } catch (error) {
      console.error(`❌ Error during login: ${error}`);
      console.error(`Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`);
      throw error;
    }
  }
}
