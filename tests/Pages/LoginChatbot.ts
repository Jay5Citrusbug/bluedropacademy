import { Page, expect, Locator, FrameLocator } from '@playwright/test';
import {chatbotLocators } from '../Locators/Login_chatbotLocator';
import { assert, time } from 'console';

export class ChatbotLoginPage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator(chatbotLocators.iframeName);
  }

  async goto() {
    await this.page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');

  }

  async login(email: string, password: string) {
      await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();
      await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);
      await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);
      await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();  
    // Wait for navigation to the expected URL
   await this.page.waitForURL(/.*chat6.*/);
  
    // Wait for iframe to appear in the DOM
    await this.page.waitForSelector(`iframe[name="${chatbotLocators.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
  
    // Now safely locate and assert the heading inside the iframe
    const iframeLocator = this.page.frameLocator(chatbotLocators.iframeName);
    const verifytitle = iframeLocator.getByRole('heading', { name: chatbotLocators.FormTitle.name });
   // await expect(verifytitle).toBeVisible({timeout: 10000}); 

}  
 
}


