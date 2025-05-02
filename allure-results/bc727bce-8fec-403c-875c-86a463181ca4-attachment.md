# Test info

- Name: BlueDrop test cases >> Form Submission >> TC_01: Submit without required fields
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:42:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('div').filter({ hasText: 'User data reset successfully' }).nth(3)
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('div').filter({ hasText: 'User data reset successfully' }).nth(3)

    at AdminPage.resetUserData (D:\Playwright\Bluedrop_academy\tests\Pages\AdminPage.ts:32:7)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:24:5
```

# Page snapshot

```yaml
- paragraph: Logged in successfully
- button:
  - img
- complementary:
  - menu:
    - menuitem "Dashboard Dashboard":
      - img "Dashboard"
      - text: Dashboard
    - menuitem "Training Data Training Data":
      - img "Training Data"
      - text: Training Data
    - menuitem "User Data User Data":
      - img "User Data"
      - text: User Data
  - img "left"
- banner:
  - heading "Admin Panel" [level=5]
  - img "user"
  - text: Admin User
- main:
  - heading "User Statistics" [level=4]
  - textbox "Start date"
  - img "swap-right"
  - textbox "End date"
  - img "calendar"
  - searchbox "Search by Email": qa@yopmail.com
  - button "search":
    - img "search"
  - table:
    - rowgroup:
      - row "Email User Registered at Plan Usage Subscription Gender Name Reset User Data":
        - cell
        - columnheader "Email"
        - columnheader "User Registered at"
        - columnheader "Plan Usage"
        - columnheader "Subscription"
        - columnheader "Gender"
        - columnheader "Name"
        - columnheader "Reset User Data"
    - rowgroup:
      - row "Expand row QA@yopmail.com 23-04-2025 04:24:52 PM 0.00042764999999999996 No plan Male Marco Reset Block":
        - cell "Expand row":
          - button "Expand row"
        - cell "QA@yopmail.com"
        - cell "23-04-2025 04:24:52 PM"
        - cell "0.00042764999999999996"
        - cell "No plan"
        - cell "Male"
        - cell "Marco"
        - cell "Reset Block":
          - button "Reset"
          - button "Block"
  - list:
    - listitem "Previous Page":
      - button "left" [disabled]:
        - img "left"
    - listitem "1"
    - listitem "Next Page":
      - button "right" [disabled]:
        - img "right"
- dialog:
  - img "exclamation-circle"
  - text: Are you sure you want to Reset this user? This action cannot be undone.
  - button "No"
  - button "Yes"
```

# Test source

```ts
   1 | import { Page, expect } from '@playwright/test';
   2 | import { adminPageLocators } from '../Locators/AdminpageLocator'; // Import the locators from the new file
   3 | import { testUserData } from '../Utils/testData'; // Import the test data
   4 |
   5 |
   6 | export class AdminPage {
   7 |   readonly page: Page;
   8 |
   9 |   constructor(page: Page) {
  10 |     this.page = page;
  11 |   }
  12 |
  13 |   async goto() {
  14 |     await this.page.goto('https://stg-chat.bluedropacademy.com/admin/');
  15 |   }
  16 |
  17 |   async login(email: string, password: string) {
  18 |     await this.page.getByRole('textbox', { name: adminPageLocators.emailInput.name }).fill(email);
  19 |     await this.page.getByRole('textbox', { name: adminPageLocators.passwordInput.name }).fill(password);
  20 |     await this.page.getByRole('button', { name: adminPageLocators.signInButton.name }).click();
  21 |   }
  22 |
  23 |   async resetUserData(userEmail: string) {
  24 |     await this.page.getByText(adminPageLocators.userDataTab.text).click();
  25 |     await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
  26 |     const cardBody = this.page.locator('.ant-card-body');
  27 | const targetRow = cardBody.getByRole('cell', { name: 'Reset' });
  28 | await this.page.locator(adminPageLocators.resetButton.xpath).click();
  29 |
  30 |     await expect(
  31 |       this.page.locator('div').filter({ hasText: adminPageLocators.successMessage.text }).nth(3)
> 32 |     ).toBeVisible();
     |       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  33 |
  34 |     // Refresh and confirm reset
  35 |     await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).clear();
  36 |     await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
  37 |     await this.page.locator('.ant-card-body').waitFor();
  38 |     await this.page.getByRole('cell', { name: testUserData.email }).waitFor();
  39 |     const usageCell = this.page.locator(adminPageLocators.PlanUsagevalue.xpath)
  40 |     await expect(usageCell).toBeVisible()
  41 |     await expect(usageCell).toHaveText('0');
  42 |     await this.page.close();
  43 |
  44 |   }
  45 | }
  46 |
```