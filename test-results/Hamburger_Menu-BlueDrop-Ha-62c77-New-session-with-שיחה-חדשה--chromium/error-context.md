# Test info

- Name: BlueDrop Hamburgermenu Test Suite >> Hamburger Menu & 📜 Chat History >> TC_21 🆕 New session with "שיחה חדשה"
- Location: D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:73:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'בואו נתחיל' })

    at FillPersonalInfopage.fillinvalidPersonalInfo (D:\Playwright\Bluedrop_academy\tests\Pages\FormPage.ts:61:25)
    at D:\Playwright\Bluedrop_academy\tests\Hamburger_Menu.spec.ts:38:16
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
  16 |     const timeoutLimit = 30000; // Adjust based on global config if different
  17 |
  18 |     try {
  19 |       console.log('Starting to fill personal information form...');
  20 |       const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  21 |
  22 |       console.log(`Filling name: ${name}`);
  23 |       await this.frameLocator.locator(FormLocator.usernameField).fill(name);
  24 |
  25 |       console.log(`Selecting gender: ${gender}`);
  26 |       await this.frameLocator.getByRole(FormLocator.genderRadio(gender).role as "radio", {
  27 |         name: FormLocator.genderRadio(gender).name,
  28 |       }).check();
  29 |
  30 |       console.log('Checking visibility of "Start" button...');
  31 |       const startButton = this.frameLocator.getByRole('button', {
  32 |         name: FormLocator.startButton.name,
  33 |       });
  34 |       await expect(startButton).toBeVisible({ timeout: timeoutLimit });
  35 |
  36 |       console.log('Clicking "Start" button...');
  37 |       await startButton.click();
  38 |
  39 |       console.log('✅ Personal info submitted successfully.');
  40 |     } catch (error) {
  41 |       console.error(`❌ Error in fillPersonalInfo: ${error}`);
  42 |       console.error(`Test failed due to timeout after ${timeoutLimit} ms - check iframe load or form issues.`);
  43 |       throw error;
  44 |     }
  45 |   }
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