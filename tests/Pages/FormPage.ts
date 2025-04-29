import { Page, expect, FrameLocator } from '@playwright/test';
import { FormLocator } from '../Locators/FormLocator';
import {chatbotLocators } from '../Locators/Login_chatbotLocator';


export class FillPersonalInfopage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
  }

  async fillPersonalInfo(name: string, gender: string) {
   
    const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
    await this.frameLocator.locator(FormLocator.usernameField).fill(name);
    // Gender radio button
    await this.frameLocator.getByRole(FormLocator.genderRadio(gender).role as "radio", {
      name: FormLocator.genderRadio(gender).name,
    }).check();
    await this.frameLocator.getByRole('button', {
      name: FormLocator.startButton.name,
    }).click();

    // Start button
    const startButton = this.frameLocator.getByRole('button', {
      name: FormLocator.startButton.name,
    });
    await expect(startButton).toBeVisible();
    //await startButton.click();
  }

  async fillinvalidPersonalInfo(name: string, gender: string) {

    const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  
    await this.frameLocator.getByRole('button', {
      name: FormLocator.startButton.name,
    }).click();
    // Start button
    const startButton = this.frameLocator.getByRole('button', {
      name: FormLocator.startButton.name,
    });
    await expect(startButton).toBeVisible();
    //await startButton.click();
    
  // Assert error message for missing gender
  await expect(iframe.getByText('נא להזין את המגדר שלך')).toBeVisible();
  
  // Assert error message for missing name
  await expect(iframe.getByText('אנא הכנס את שמך')).toBeVisible();
  }
  
}