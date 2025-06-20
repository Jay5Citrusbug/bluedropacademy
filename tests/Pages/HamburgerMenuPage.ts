import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import { generateRandomQuestion } from '../Utils/testData';
import { MenuLocator } from '../Locators/HamburgerMenuLocator';
import { faker } from '@faker-js/faker';
let name = faker.food.dish();



export class HamburgerMenuPage {
    private sessionName: string;

  readonly page: Page;
  private userMessage: string = '';

  constructor(page: Page) {
    this.page = page;
    this.sessionName = faker.person.fullName(); // generate once

  }

   get frameLocator() {
    return this.page.frameLocator(MenuLocator.iframeName);
  }

  get menuButton() {
    return this.frameLocator.locator(MenuLocator.hamburgerMenuBtn);
  }

  async openMenu() {
    await expect(this.menuButton).toBeVisible();
    await this.menuButton.click({ force: true });
  }

  async OpenHamburgerMenu() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    const menuButton = frameLocator.locator(MenuLocator.hamburgerMenuBtn);

    console.log('📂 Opening hamburger menu...');
    await expect(menuButton).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await menuButton.click({force: true});

    await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();

}

  async LoadmoreBtn() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  await this.page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});
    console.log('📜 Clicking Load More button...');
    await expect(frameLocator.locator(MenuLocator.LoadMoreBtn)).toBeVisible();
    await frameLocator.locator(MenuLocator.LoadMoreBtn).click();
  }

async SearchHistory(query: string) {
  const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  console.log(`🔍 Searching for message: "${query}"`);

  const input = frameLocator.locator(MenuLocator.Searchbar);
  await expect(input).toBeVisible();

  await this.page.evaluate(() => window.scrollTo(0, 0)); // Ensure input is in view
  await input.fill(query); // Fill the search box with the query
  await this.page.waitForTimeout(2000); // Optional wait for results
  // ✅ Assertion: session list is visible
  const sessionList = frameLocator.locator('.session-list');
  await expect(sessionList).toBeVisible();

  // ✅ Assertion: session list contains the searched query
  await expect(sessionList).toContainText(query);

  console.log(`✅ Verified session list contains: "${query}"`);
}

  async NoSearchHistory() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
      const randomSearchText = faker.lorem.words(2); // e.g., "quick fox"

    await this.page.evaluate(() => {
  window.scrollTo(0, 0);
});
  console.log(`🔎 Using random search text: "${randomSearchText}"`);
    await frameLocator.locator(MenuLocator.Searchbar).clear();
    await frameLocator.locator(MenuLocator.Searchbar).fill(randomSearchText);
    await this.page.waitForTimeout(2000); // Optional wait for results
    await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  
  }

  async CloseHamburgerMenu() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    await this.page.evaluate(() => window.scrollTo(0, 0));

    console.log('❌ Closing hamburger menu...');
    await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
    await frameLocator.getByRole('button', { name: 'Close' }).click();
  }

  async Newsession() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);

    console.log('🔁 Creating new session from hamburger menu...');
   // await frameLocator.getByRole('button', { name: 'icon' }).nth(2).click();
await expect(frameLocator.getByTestId('new-session-click')).toBeVisible();
await frameLocator.getByTestId('new-session-click').click();
  }

   async Pagereload() {
      const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  
      console.log('🔄 Reloading and verifying bot session is cleared...');
      const botMessages = await frameLocator.locator('.system-message-text');
      await expect(botMessages).toHaveCount(0);
  
      console.log('✅ Verified: Bot responses are cleared after reload.');
    }

        
async Edithistory() {

const frameLocator = this.page.frameLocator(MenuLocator.iframeName);

await frameLocator.locator('li:nth-child(2) > .ant-btn').isVisible();

await frameLocator.locator('li:nth-child(2) > .ant-btn').click();
await frameLocator.getByTestId('edit-session-input').isVisible();

await frameLocator.getByTestId('edit-session-input').click();
 await frameLocator.getByTestId('edit-session-input').fill(this.sessionName);

await frameLocator.getByTestId('edit-session-input').press('Enter');

await frameLocator.getByText(name).isVisible();
await frameLocator.getByRole('button', { name: 'Close' }).click();


    }

async OpenHistory_ContinueSession() {

    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    await this.page.evaluate(() => window.scrollTo(0, 0));

await frameLocator.locator('ul.session-list > li >> .session-item').first().click();
  
// SCroll bottom of the page to ensure "המשך שיחה" button is visible
await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await frameLocator.getByText('המשך שיחה').isVisible();
    await frameLocator.getByText('המשך שיחה').click();


}

}