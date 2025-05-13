import { Page, expect } from '@playwright/test';
import { adminPageLocators } from '../Locators/AdminpageLocator';


export class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the admin login page
  async goto() {
    const adminUrl = process.env.URL_ADMIN;
    console.log('Navigating to the admin page...');
    if (!adminUrl) {
      throw new Error('Admin URL is not defined in the environment variables.');
    }
    await this.page.goto(adminUrl);
    console.log('Successfully navigated to the admin page.');
  }

  // Perform login using the provided credentials
  async login(email: string, password: string) {
    console.log(`Starting login process for user: ${email}`);
    
    console.log('Filling in email input...');
    await this.page.getByRole('textbox', { name: adminPageLocators.emailInput.name }).fill(email);

    console.log('Filling in password input...');
    await this.page.getByRole('textbox', { name: adminPageLocators.passwordInput.name }).fill(password);

    console.log('Clicking on Sign In button...');
    await this.page.getByRole('button', { name: adminPageLocators.signInButton.name }).click();

    console.log('Login submitted, waiting for dashboard to load...');
  }

  // Reset user data for a specific user email
  async resetUserData(userEmail: string) {
    const timeoutLimit = 30000; // assuming 30s from your global config; adjust accordingly

    console.log(`Starting reset process for user: ${userEmail}`);

    try {
      console.log('Clicking on User Data tab...');
      await this.page.getByText(adminPageLocators.userDataTab.text).click();

      console.log(`Searching for user with email: ${userEmail}`);
      await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
      await this.page.waitForTimeout(3000);

      console.log('Waiting for user data to appear...');
      const cardBody = this.page.locator('.ant-card-body');
      const targetRow = cardBody.getByRole('cell', { name: 'Reset' });

      console.log('Clicking Reset button...');
      await this.page.locator(adminPageLocators.resetButton.xpath).click();

      console.log('Confirming the reset...');
      await this.page.getByRole('button', { name: 'Yes' }).click();

      console.log('Waiting for success message...');
      await expect(
        this.page.locator('div').filter({ hasText: adminPageLocators.successMessage.text }).nth(3)
      ).toBeVisible();
      console.log('Reset confirmation message is visible.');

      const usageCell = this.page.locator(adminPageLocators.PlanUsagevalue.xpath);

      console.log('Verifying usage value has been reset to 0...');
      await expect(usageCell).toBeVisible();
      await expect(usageCell).toHaveText('0');

      console.log(`✅ Reset process completed for user: ${userEmail}`);
      await this.page.close();
    } catch (error) {
      console.error(`❌ Error during resetUserData: ${error}`);
      console.error(`Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`);
      throw error;
    }
  }
}
function timeout(arg0: number) {
  throw new Error('Function not implemented.');
}

