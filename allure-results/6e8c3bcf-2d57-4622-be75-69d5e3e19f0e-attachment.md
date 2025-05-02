# Test info

- Name: BlueDrop test cases >> Form Submission >> TC_01: Submit without required fields
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:42:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('button', { name: 'בואו נתחיל' })

    at FillPersonalInfopage.fillinvalidPersonalInfo (D:\Playwright\Bluedrop_academy\tests\Pages\FormPage.ts:40:8)
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:43:18
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
   5 |
   6 | export class FillPersonalInfopage {
   7 |   readonly page: Page;
   8 |   readonly frameLocator: FrameLocator;
   9 |
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
  13 |   }
  14 |
  15 |   async fillPersonalInfo(name: string, gender: string) {
  16 |    
  17 |     const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  18 |
  19 |     const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  20 |     await this.frameLocator.locator(FormLocator.usernameField).fill(name);
  21 |     // Gender radio button
  22 |     await this.frameLocator.getByRole(FormLocator.genderRadio(gender).role as "radio", {
  23 |       name: FormLocator.genderRadio(gender).name,
  24 |     }).check();
  25 |     // Start button
  26 |     const startButton = this.frameLocator.getByRole('button', {
  27 |       name: FormLocator.startButton.name,
  28 |     });
  29 |     await expect(startButton).toBeVisible();
  30 |     await startButton.click();
  31 |     
  32 |   }
  33 |
  34 |   async fillinvalidPersonalInfo(name: string, gender: string) {
  35 |
  36 |     const iframe = this.page.frameLocator('iframe[name="htmlComp-iframe"]');
  37 |   
  38 |     await this.frameLocator.getByRole('button', {
  39 |       name: FormLocator.startButton.name,
> 40 |     }).click();
     |        ^ Error: locator.click: Target page, context or browser has been closed
  41 |     // Start button
  42 |     const startButton = this.frameLocator.getByRole('button', {
  43 |       name: FormLocator.startButton.name,
  44 |     });
  45 |     await expect(startButton).toBeVisible();
  46 |     //await startButton.click();
  47 |     
  48 |   // Assert error message for missing gender
  49 |   await expect(iframe.getByText('נא להזין את המגדר שלך')).toBeVisible();
  50 |   
  51 |   // Assert error message for missing name
  52 |   await expect(iframe.getByText('אנא הכנס את שמך')).toBeVisible();
  53 |   }
  54 |   
  55 | }
```