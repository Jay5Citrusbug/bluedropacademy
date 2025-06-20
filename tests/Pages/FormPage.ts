import { Page, expect, FrameLocator } from '@playwright/test';
import { FormLocator } from '../Locators/FormLocator';
import { Chatbotlocator } from '../Locators/chatbotLocator';

export class FillPersonalInfopage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
  }

  // Fill personal info form with valid data
  async fillPersonalInfo(name: string, gender: string) {
  const timeoutLimit = 3000;

  try {
    console.log('Starting to fill personal information form...');

    const frame = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log(`Filling name: ${name}`);
    await frame.locator(FormLocator.usernameField).fill(name);

    const genderLabel = FormLocator.genderRadio(gender).name;
    console.log(`Selecting gender: ${genderLabel}`);

    // Click the gender label by visible text (like "זכר 👨" or "נקבה 👩")
    await frame.locator('label').filter({ hasText: genderLabel }).click();

    console.log('Checking visibility of "Start" button...');
    const startButton = frame.getByText(FormLocator.startButton.name, { exact: true });
    await expect(startButton).toBeVisible({ timeout: timeoutLimit });

    console.log('Clicking "Start" button...');
    await startButton.click();

    console.log('✅ Personal info submitted successfully.');
  } catch (error) {
    console.error(`❌ Error in fillPersonalInfo: ${error}`);
    console.error(`Test failed due to timeout after ${timeoutLimit} ms - check iframe load or form issues.`);
    throw error;
  }
}

  // Attempt to submit form without required fields and validate error messages
  async fillinvalidPersonalInfo(name: string, gender: string) {
    const timeoutLimit = 30000; // Adjust as needed

    try {
      console.log('Attempting to submit form with missing fields (invalid input)...');

      const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');

      const startButton = this.frameLocator.getByRole('button', {
        name: FormLocator.startButton.name,
      });

      console.log('Clicking "Start" button without filling fields...');
      await startButton.click();

      console.log('Waiting for validation error messages...');

      // Assert error message for missing gender
      await expect(iframe.getByText('נא להזין את המגדר שלך')).toBeVisible({ timeout: timeoutLimit });
      console.log('Verified gender required validation message.');

      // Assert error message for missing name
      await expect(iframe.getByText('אנא הכנס את שמך')).toBeVisible({ timeout: timeoutLimit });
      console.log('Verified name required validation message.');

      console.log('✅ Invalid input test completed with expected error validations.');
    } catch (error) {
      console.error(`❌ Error in fillinvalidPersonalInfo: ${error}`);
      console.error(`Test failed due to timeout after ${timeoutLimit} ms - check if error messages are rendering correctly.`);
      throw error;
    }
  }
}
