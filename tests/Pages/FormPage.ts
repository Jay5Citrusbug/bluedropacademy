import { Page, expect, FrameLocator } from '@playwright/test';
import { FormLocator } from '../Locators/FormLocator';

export class FillPersonalInfopage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
  }

  async fillPersonalInfo(name: string, gender: string) {
    // Fill name field inside iframe
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
}