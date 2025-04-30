import { Page, expect } from '@playwright/test';
import { adminPageLocators } from '../Locators/AdminpageLocator'; // Import the locators from the new file
import { testUserData } from '../Utils/testData'; // Import the test data


export class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://stg-chat.bluedropacademy.com/admin/');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: adminPageLocators.emailInput.name }).fill(email);
    await this.page.getByRole('textbox', { name: adminPageLocators.passwordInput.name }).fill(password);
    await this.page.getByRole('button', { name: adminPageLocators.signInButton.name }).click();
  }

  async resetUserData(userEmail: string) {
    await this.page.getByText(adminPageLocators.userDataTab.text).click();
    await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
    const cardBody = this.page.locator('.ant-card-body');
const targetRow = cardBody.getByRole('cell', { name: 'Reset' });
  await this.page.locator(adminPageLocators.resetButton.xpath).click();

    await expect(
      this.page.locator('div').filter({ hasText: adminPageLocators.successMessage.text }).nth(3)
    ).toBeVisible();

    // Refresh and confirm reset
    await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).clear();
    await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
    await this.page.locator('.ant-card-body').waitFor();
    await this.page.getByRole('cell', { name: testUserData.email }).waitFor();
    await this.page.locator(adminPageLocators.resetButton.xpath).click();
    await this.page.locator(adminPageLocators.resetButtonClick.xpath).click();
    
    const usageCell = this.page.locator(adminPageLocators.PlanUsagevalue.xpath)
    await expect(usageCell).toBeVisible()
    await expect(usageCell).toHaveText('0');
    await this.page.close();

  }
}
