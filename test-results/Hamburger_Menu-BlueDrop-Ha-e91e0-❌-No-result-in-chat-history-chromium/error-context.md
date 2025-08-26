# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_17 ❌ No result in chat history
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:110:9

# Error details

```
Error: locator.clear: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().locator('input[placeholder="חפש"]')

    at HamburgerMenuPage.NoSearchHistory (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\HamburgerMenuPage.ts:86:55)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:112:7
```

# Page snapshot

```yaml
- region "top of page"
- link "wix האתר הזה נבנה באמצעות Wix. גם לך יכול להיות אתר כבר היום. אני רוצה לבנות אתר":
  - /url: https://www.wix.com/lpviral/enviral?utm_campaign=vir_wixad_live&adsVersion=banner_2024&orig_msid=aa99f552-cce6-4d9b-96f0-a304175f7068&orig_msid=d147380a-f3d1-419d-9ced-13400ea5a695&adsVersion=banner_2024
  - img "wix"
  - text: האתר הזה נבנה באמצעות Wix. גם לך יכול להיות אתר כבר היום. אני רוצה לבנות אתר
- main:
  - region "main content":
    - iframe
- region "bottom of page"
```

# Test source

```ts
   1 | import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
   2 | import { generateRandomQuestion } from '../Utils/testData';
   3 | import { MenuLocator } from '../Locators/HamburgerMenuLocator';
   4 | import { faker } from '@faker-js/faker';
   5 | let name = faker.food.dish();
   6 |
   7 |
   8 |
   9 | export class HamburgerMenuPage {
   10 |     private sessionName: string;
   11 |
   12 |   readonly page: Page;
   13 |   private userMessage: string = '';
   14 |
   15 |   constructor(page: Page) {
   16 |     this.page = page;
   17 |     this.sessionName = faker.person.fullName(); // generate once
   18 |
   19 |   }
   20 |
   21 |    get frameLocator() {
   22 |     return this.page.frameLocator(MenuLocator.iframeName);
   23 |   }
   24 |
   25 |   get menuButton() {
   26 |     return this.frameLocator.locator(MenuLocator.hamburgerMenuBtn);
   27 |   }
   28 |
   29 |   async openMenu() {
   30 |     await expect(this.menuButton).toBeVisible();
   31 |     await this.menuButton.click({ force: true });
   32 |   }
   33 |
   34 |   async OpenHamburgerMenu() {
   35 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   36 |     const menuButton = frameLocator.locator(MenuLocator.hamburgerMenuBtn);
   37 |
   38 |     console.log('📂 Opening hamburger menu...');
   39 |     await expect(menuButton).toBeVisible();
   40 |     await this.page.evaluate(() => window.scrollTo(0, 0));
   41 |     await menuButton.click({force: true});
   42 |
   43 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
   44 |     await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
   45 |
   46 | }
   47 |
   48 |   async LoadmoreBtn() {
   49 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   50 |   await this.page.evaluate(() => {
   51 |   window.scrollTo(0, document.body.scrollHeight);
   52 | });
   53 |     console.log('📜 Clicking Load More button...');
   54 |     await expect(frameLocator.locator(MenuLocator.LoadMoreBtn)).toBeVisible();
   55 |     await frameLocator.locator(MenuLocator.LoadMoreBtn).click();
   56 |   }
   57 |
   58 | async SearchHistory(query: string) {
   59 |   const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   60 |   console.log(`🔍 Searching for message: "${query}"`);
   61 |
   62 |   const input = frameLocator.locator(MenuLocator.Searchbar);
   63 |   await expect(input).toBeVisible();
   64 |
   65 |   await this.page.evaluate(() => window.scrollTo(0, 0)); // Ensure input is in view
   66 |   await input.fill(query); // Fill the search box with the query
   67 |   await this.page.waitForTimeout(2000); // Optional wait for results
   68 |   // ✅ Assertion: session list is visible
   69 |   const sessionList = frameLocator.locator('.session-list');
   70 |   await expect(sessionList).toBeVisible();
   71 |
   72 |   // ✅ Assertion: session list contains the searched query
   73 |   await expect(sessionList).toContainText(query);
   74 |
   75 |   console.log(`✅ Verified session list contains: "${query}"`);
   76 | }
   77 |
   78 |   async NoSearchHistory() {
   79 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   80 |       const randomSearchText = faker.lorem.words(2); // e.g., "quick fox"
   81 |
   82 |     await this.page.evaluate(() => {
   83 |   window.scrollTo(0, 0);
   84 | });
   85 |   console.log(`🔎 Using random search text: "${randomSearchText}"`);
>  86 |     await frameLocator.locator(MenuLocator.Searchbar).clear();
      |                                                       ^ Error: locator.clear: Target page, context or browser has been closed
   87 |     await frameLocator.locator(MenuLocator.Searchbar).fill(randomSearchText);
   88 |     await this.page.waitForTimeout(2000); // Optional wait for results
   89 |     await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
   90 |   
   91 |   }
   92 |
   93 |   async CloseHamburgerMenu() {
   94 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   95 |     await this.page.evaluate(() => window.scrollTo(0, 0));
   96 |
   97 |     console.log('❌ Closing hamburger menu...');
   98 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
   99 |     await frameLocator.getByRole('button', { name: 'Close' }).click();
  100 |   }
  101 |
  102 |   async Newsession() {
  103 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  104 |
  105 |     console.log('🔁 Creating new session from hamburger menu...');
  106 |    // await frameLocator.getByRole('button', { name: 'icon' }).nth(2).click();
  107 | await expect(frameLocator.getByTestId('new-session-click')).toBeVisible();
  108 | await frameLocator.getByTestId('new-session-click').click();
  109 |   }
  110 |
  111 |    async Pagereload() {
  112 |       const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  113 |   
  114 |       console.log('🔄 Reloading and verifying bot session is cleared...');
  115 |       const botMessages = await frameLocator.locator('.system-message-text');
  116 |       await expect(botMessages).toHaveCount(0);
  117 |   
  118 |       console.log('✅ Verified: Bot responses are cleared after reload.');
  119 |     }
  120 |
  121 |         
  122 | async Edithistory() {
  123 |
  124 | const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  125 |
  126 | await frameLocator.locator('li:nth-child(2) > .ant-btn').isVisible();
  127 |
  128 | await frameLocator.locator('li:nth-child(2) > .ant-btn').click();
  129 | await frameLocator.getByTestId('edit-session-input').isVisible();
  130 |
  131 | await frameLocator.getByTestId('edit-session-input').click();
  132 |  await frameLocator.getByTestId('edit-session-input').fill(this.sessionName);
  133 |
  134 | await frameLocator.getByTestId('edit-session-input').press('Enter');
  135 |
  136 | await frameLocator.getByText(name).isVisible();
  137 | await frameLocator.getByRole('button', { name: 'Close' }).click();
  138 |
  139 |
  140 |     }
  141 |
  142 | async OpenHistory_ContinueSession() {
  143 |
  144 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  145 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  146 |
  147 | await frameLocator.locator('ul.session-list > li >> .session-item').first().click();
  148 |   
  149 | // SCroll bottom of the page to ensure "המשך שיחה" button is visible
  150 | await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  151 |
  152 |     await frameLocator.getByText('המשך שיחה').isVisible();
  153 |     await frameLocator.getByText('המשך שיחה').click();
  154 |
  155 |
  156 | }
  157 |
  158 | }
```