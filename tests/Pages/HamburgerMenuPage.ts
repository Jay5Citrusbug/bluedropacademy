import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import { generateRandomQuestion } from '../Utils/testData';
import { MenuLocator } from '../Locators/HamburgerMenuLocator';

export class HamburgerMenuPage {
  readonly page: Page;
  private userMessage: string = '';

  constructor(page: Page) {
    this.page = page;
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

    console.log('📜 Clicking Load More button...');
    await expect(frameLocator.locator(MenuLocator.LoadMoreBtn)).toBeVisible();
    await frameLocator.locator(MenuLocator.LoadMoreBtn).click();
  }

  async SearchHistory() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    console.log(`🔍 Searching for message: "${this.userMessage}"`);
    const input = frameLocator.locator(MenuLocator.Searchbar);
    await expect(input).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await input.click({ force: true });
    await input.fill(this.userMessage);
  }

  async NoSearchHistory() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    const randomQuery = generateRandomQuestion();

    console.log(`🔍 Searching for non-existent history: "${randomQuery}"`);
    await frameLocator.locator(MenuLocator.Searchbar).clear();
    await frameLocator.locator(MenuLocator.Searchbar).fill(randomQuery);
    await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
  
  }

  async CloseHamburgerMenu() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);

    console.log('❌ Closing hamburger menu...');
    await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
    await frameLocator.getByRole('button', { name: 'Close' }).click();
  }

  async Newsession() {
    const frameLocator = this.page.frameLocator(MenuLocator.iframeName);

    console.log('🔁 Creating new session from hamburger menu...');
    await frameLocator.getByRole('button', { name: 'icon' }).nth(2).click();
    await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
    await frameLocator.getByTestId('start-new-session').click();
  }

   async Pagereload() {
      const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  
      console.log('🔄 Reloading and verifying bot session is cleared...');
      const botMessages = await frameLocator.locator('.system-message-text');
      await expect(botMessages).toHaveCount(0);
  
      console.log('✅ Verified: Bot responses are cleared after reload.');
    }
}