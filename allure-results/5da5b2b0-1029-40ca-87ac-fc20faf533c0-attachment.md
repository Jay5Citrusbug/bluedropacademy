# Test info

- Name: BlueDrop test cases >> Hamburger Menu & History >> TC_17: Load More button functionality
- Location: D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:49:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByText('User Data')

    at AdminPage.resetUserData (D:\Playwright\Bluedrop_academy\tests\Pages\AdminPage.ts:45:69)
    at D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:24:21
```

# Test source

```ts
   1 | import { Page, expect } from '@playwright/test';
   2 | import { adminPageLocators } from '../Locators/AdminpageLocator';
   3 | import { testUserData } from '../Utils/testData';
   4 | import { time } from 'console';
   5 | import { TIMEOUT } from 'dns';
   6 |
   7 | export class AdminPage {
   8 |   readonly page: Page;
   9 |
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |   }
  13 |
  14 |   // Navigate to the admin login page
  15 |   async goto() {
  16 |     console.log('Navigating to the admin page...');
  17 |     await this.page.goto('https://stg-chat.bluedropacademy.com/admin/');
  18 |     console.log('Successfully navigated to the admin page.');
  19 |   }
  20 |
  21 |   // Perform login using the provided credentials
  22 |   async login(email: string, password: string) {
  23 |     console.log(`Starting login process for user: ${email}`);
  24 |     
  25 |     console.log('Filling in email input...');
  26 |     await this.page.getByRole('textbox', { name: adminPageLocators.emailInput.name }).fill(email);
  27 |
  28 |     console.log('Filling in password input...');
  29 |     await this.page.getByRole('textbox', { name: adminPageLocators.passwordInput.name }).fill(password);
  30 |
  31 |     console.log('Clicking on Sign In button...');
  32 |     await this.page.getByRole('button', { name: adminPageLocators.signInButton.name }).click();
  33 |
  34 |     console.log('Login submitted, waiting for dashboard to load...');
  35 |   }
  36 |
  37 |   // Reset user data for a specific user email
  38 |   async resetUserData(userEmail: string) {
  39 |     const timeoutLimit = 30000; // assuming 30s from your global config; adjust accordingly
  40 |
  41 |     console.log(`Starting reset process for user: ${userEmail}`);
  42 |
  43 |     try {
  44 |       console.log('Clicking on User Data tab...');
> 45 |       await this.page.getByText(adminPageLocators.userDataTab.text).click();
     |                                                                     ^ Error: locator.click: Target page, context or browser has been closed
  46 |
  47 |       console.log(`Searching for user with email: ${userEmail}`);
  48 |       await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
  49 |       await this.page.waitForTimeout(3000);
  50 |
  51 |       console.log('Waiting for user data to appear...');
  52 |       const cardBody = this.page.locator('.ant-card-body');
  53 |       const targetRow = cardBody.getByRole('cell', { name: 'Reset' });
  54 |
  55 |       console.log('Clicking Reset button...');
  56 |       await this.page.locator(adminPageLocators.resetButton.xpath).click();
  57 |
  58 |       console.log('Confirming the reset...');
  59 |       await this.page.getByRole('button', { name: 'Yes' }).click();
  60 |
  61 |       console.log('Waiting for success message...');
  62 |       await expect(
  63 |         this.page.locator('div').filter({ hasText: adminPageLocators.successMessage.text }).nth(3)
  64 |       ).toBeVisible();
  65 |       console.log('Reset confirmation message is visible.');
  66 |
  67 |       const usageCell = this.page.locator(adminPageLocators.PlanUsagevalue.xpath);
  68 |
  69 |       console.log('Verifying usage value has been reset to 0...');
  70 |       await expect(usageCell).toBeVisible();
  71 |       await expect(usageCell).toHaveText('0');
  72 |
  73 |       console.log(`✅ Reset process completed for user: ${userEmail}`);
  74 |       await this.page.close();
  75 |     } catch (error) {
  76 |       console.error(`❌ Error during resetUserData: ${error}`);
  77 |       console.error(`Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`);
  78 |       throw error;
  79 |     }
  80 |   }
  81 | }
  82 | function timeout(arg0: number) {
  83 |   throw new Error('Function not implemented.');
  84 | }
  85 |
  86 |
```