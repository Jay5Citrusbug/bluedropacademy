# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_15 🔓 Open Hamburger Menu
- Location: D:\Automation\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:99:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'בואו נתחיל! 🚀' })

    at FillPersonalInfopage.fillinvalidPersonalInfo (D:\Automation\Playwright\Bluedrop_academy\tests\Pages\FormPage.ts:61:25)
    at D:\Automation\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:39:16
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
   1 | import { Page, expect, FrameLocator } from '@playwright/test';
   2 | import { FormLocator } from '../Locators/FormLocator';
   3 | import { Chatbotlocator } from '../Locators/chatbotLocator';
   4 |
   5 | export class FillPersonalInfopage {
   6 |   readonly page: Page;
   7 |   readonly frameLocator: FrameLocator;
   8 |
   9 |   constructor(page: Page) {
  10 |     this.page = page;
  11 |     this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
  12 |   }
  13 |
  14 |   // Fill personal info form with valid data
  15 |   async fillPersonalInfo(name: string, gender: string) {
  16 |   const timeoutLimit = 3000;
  17 |
  18 |   try {
  19 |     console.log('Starting to fill personal information form...');
  20 |
  21 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  22 |
  23 |     console.log(`Filling name: ${name}`);
  24 |     await frame.locator(FormLocator.usernameField).fill(name);
  25 |
  26 |     const genderLabel = FormLocator.genderRadio(gender).name;
  27 |     console.log(`Selecting gender: ${genderLabel}`);
  28 |
  29 |     // Click the gender label by visible text (like "זכר 👨" or "נקבה 👩")
  30 |     await frame.locator('label').filter({ hasText: genderLabel }).click();
  31 |
  32 |     console.log('Checking visibility of "Start" button...');
  33 |     const startButton = frame.getByText(FormLocator.startButton.name, { exact: true });
  34 |     await expect(startButton).toBeVisible({ timeout: timeoutLimit });
  35 |
  36 |     console.log('Clicking "Start" button...');
  37 |     await startButton.click();
  38 |
  39 |     console.log('✅ Personal info submitted successfully.');
  40 |   } catch (error) {
  41 |     console.error(`❌ Error in fillPersonalInfo: ${error}`);
  42 |     console.error(`Test failed due to timeout after ${timeoutLimit} ms - check iframe load or form issues.`);
  43 |     throw error;
  44 |   }
  45 | }
  46 |
  47 |   // Attempt to submit form without required fields and validate error messages
  48 |   async fillinvalidPersonalInfo(name: string, gender: string) {
  49 |     const timeoutLimit = 30000; // Adjust as needed
  50 |
  51 |     try {
  52 |       console.log('Attempting to submit form with missing fields (invalid input)...');
  53 |
  54 |       const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  55 |
  56 |       const startButton = this.frameLocator.getByRole('button', {
  57 |         name: FormLocator.startButton.name,
  58 |       });
  59 |
  60 |       console.log('Clicking "Start" button without filling fields...');
> 61 |       await startButton.click();
     |                         ^ Error: locator.click: Target page, context or browser has been closed
  62 |
  63 |       console.log('Waiting for validation error messages...');
  64 |
  65 |       // Assert error message for missing gender
  66 |       await expect(iframe.getByText('נא להזין את המגדר שלך')).toBeVisible({ timeout: timeoutLimit });
  67 |       console.log('Verified gender required validation message.');
  68 |
  69 |       // Assert error message for missing name
  70 |       await expect(iframe.getByText('אנא הכנס את שמך')).toBeVisible({ timeout: timeoutLimit });
  71 |       console.log('Verified name required validation message.');
  72 |
  73 |       console.log('✅ Invalid input test completed with expected error validations.');
  74 |     } catch (error) {
  75 |       console.error(`❌ Error in fillinvalidPersonalInfo: ${error}`);
  76 |       console.error(`Test failed due to timeout after ${timeoutLimit} ms - check if error messages are rendering correctly.`);
  77 |       throw error;
  78 |     }
  79 |   }
  80 | }
  81 |
```