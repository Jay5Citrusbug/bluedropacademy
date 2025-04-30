import { time } from 'console';
import { Chatbotlocator } from '../Locators/chatbotLocator';
import { Page, expect, FrameLocator } from '@playwright/test'; 

export class chatbotPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyConfirmationElements() {
    // Wait until the iframe is present in the DOM
    await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
  
    // Step 1: Use frameLocator for visibility assertions
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  
    // ✅ Wait for the thank-you message to be visible
    await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible()
  
   await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible()
   // Now validate other elements

  }
  async InitialbotMessage() {
    // Wait until the iframe is present in the DOM  
    // Step 1: Use frameLocator for visibility assertions
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);// Assert that textContent is not empty or just whitespace
 await expect(messageLocator).not.toHaveText('', { timeout: 10000 }); 
  }

  async SubmitbtnNotActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const SubmitBtnDisable = frameLocator.locator(Chatbotlocator.SubmitBtn);// Assert that textContent is not empty or just whitespace

await expect(SubmitBtnDisable).toBeDisabled(); // Only works if it’s a real <button disabled>

  }

  async SubmitbtnActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    await this.page
    .frameLocator(Chatbotlocator.iframeName)
    .getByTestId('seach-msg-input')
    .fill('who is gandhi');
    const SubmitBtnEnable = frameLocator.locator(Chatbotlocator.SubmitBtn);
await expect(SubmitBtnEnable).toBeEnabled(); // Only works if it’s a real <button disabled>

  }


  async Submitquery() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    await this.page
    .frameLocator(Chatbotlocator.iframeName)
    const SubmitBtnEnable = frameLocator.locator(Chatbotlocator.SubmitBtn);
    await SubmitBtnEnable.click(); // ✅ Properly awaited

  }
  }
  
  