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
  
  }
  
  