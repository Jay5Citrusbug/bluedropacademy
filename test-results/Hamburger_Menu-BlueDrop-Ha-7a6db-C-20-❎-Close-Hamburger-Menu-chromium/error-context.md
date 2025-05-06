# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_20 ❎ Close Hamburger Menu
- Location: D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:68:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Close' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'Close' })

    at HamburgerMenuPage.CloseHamburgerMenu (D:\Playwright\Bluedrop_academy\tests\Pages\HamburgerMenuPage.ts:69:71)
    at D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:70:18
```

# Page snapshot

```yaml
- region "top of page"
- button "לדלג לתוכן הראשי"
- link "האתר הזה עוצב בעזרת הכלי לבניית אתרים של wix .com . רוצים ליצור אתר משלכם? התחילו עכשיו":
  - /url: //www.wix.com/lpviral/enviral?utm_campaign=vir_wixad_live&orig_msid=d147380a-f3d1-419d-9ced-13400ea5a695&adsVersion=white
  - text: האתר הזה עוצב בעזרת הכלי לבניית אתרים של
  - img "wix"
  - text: .com . רוצים ליצור אתר משלכם? התחילו עכשיו
- main:
  - iframe
- region "bottom of page"
- iframe
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
   21 | async OpenHamburgerMenu() {
   22 |
   23 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   24 |     const menuButton = frameLocator.locator(MenuLocator.hamburgerMenuBtn);
   25 |
   26 |     console.log('📂 Opening hamburger menu...');
   27 |     await expect(menuButton).toBeVisible();
   28 |     await this.page.evaluate(() => window.scrollTo(0, 0));
   29 |     await menuButton.click({force: true});
   30 |
   31 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
   32 |     await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
   33 |
   34 | }
   35 |
   36 |   async LoadmoreBtn() {
   37 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   38 |
   39 |     console.log('📜 Clicking Load More button...');
   40 |     await expect(frameLocator.locator(MenuLocator.LoadMoreBtn)).toBeVisible();
   41 |     await frameLocator.locator(MenuLocator.LoadMoreBtn).click();
   42 |   }
   43 |
   44 |   async SearchHistory() {
   45 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   46 |     console.log(`🔍 Searching for message: "${this.userMessage}"`);
   47 |     const input = frameLocator.locator(MenuLocator.Searchbar);
   48 |     await expect(input).toBeVisible();
   49 |     await this.page.evaluate(() => window.scrollTo(0, 0));
   50 |     await input.click({ force: true });
   51 |     await input.fill(this.userMessage);
   52 |   }
   53 |
   54 |   async NoSearchHistory() {
   55 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   56 |     const randomQuery = generateRandomQuestion();
   57 |
   58 |     console.log(`🔍 Searching for non-existent history: "${randomQuery}"`);
   59 |     await frameLocator.locator(MenuLocator.Searchbar).clear();
   60 |     await frameLocator.locator(MenuLocator.Searchbar).fill(randomQuery);
   61 |     await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
   62 |   
   63 |   }
   64 |
   65 |   async CloseHamburgerMenu() {
   66 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   67 |
   68 |     console.log('❌ Closing hamburger menu...');
>  69 |     await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
      |                                                                       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   70 |     await frameLocator.getByRole('button', { name: 'Close' }).click();
   71 |   }
   72 |
   73 |   async Newsession() {
   74 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   75 |
   76 |     console.log('🔁 Creating new session from hamburger menu...');
   77 |     await frameLocator.getByRole('button', { name: 'icon' }).nth(2).click();
   78 |     await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();
   79 |     await frameLocator.getByTestId('start-new-session').click();
   80 |   }
   81 |
   82 |    async Pagereload() {
   83 |       const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   84 |   
   85 |       console.log('🔄 Reloading and verifying bot session is cleared...');
   86 |       const botMessages = await frameLocator.locator('.system-message-text');
   87 |       await expect(botMessages).toHaveCount(0);
   88 |   
   89 |       console.log('✅ Verified: Bot responses are cleared after reload.');
   90 |     }
   91 |
   92 |         
   93 | async Edithistory() {
   94 |
   95 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
   96 |
   97 | await frameLocator.locator('li:nth-child(2) > .ant-btn').isVisible();
   98 |
   99 | await frameLocator.locator('li:nth-child(2) > .ant-btn').click();
  100 | await frameLocator.getByTestId('edit-session-input').isVisible();
  101 |
  102 | await frameLocator.getByTestId('edit-session-input').click();
  103 |  await frameLocator.getByTestId('edit-session-input').fill(this.sessionName);
  104 |
  105 | await frameLocator.getByTestId('edit-session-input').press('Enter');
  106 |
  107 | await frameLocator.getByText(name).isVisible();
  108 |
  109 |     }
  110 |
  111 | async OpenHistory_ContinueSession() {
  112 |
  113 |     const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  114 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  115 |
  116 |     await frameLocator.getByText(this.sessionName).isVisible();
  117 |     await frameLocator.getByText(this.sessionName).click();
  118 |     await frameLocator.getByText('המשך שיחה').isVisible();
  119 |     await frameLocator.getByText('המשך שיחה').click();
  120 |
  121 | }
  122 |
  123 | }
```