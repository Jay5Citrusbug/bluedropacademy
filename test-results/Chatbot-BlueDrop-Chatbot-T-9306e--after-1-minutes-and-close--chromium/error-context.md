# Test info

- Name: BlueDrop Chatbot Test Suite >> 💬 Chatbot Screen >> TC_16:Session pop-up display after 1 minutes and close .
- Location: D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:121:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button')

    at chatbotPage.InactivityPopup2 (D:\Playwright\Bluedrop_academy\tests\Pages\chatbotPage.ts:215:25)
    at D:\Playwright\Bluedrop_academy\tests\Chatbot.spec.ts:122:11
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
```

# Test source

```ts
  115 |   }
  116 |
  117 |   async NewsessionChatbotPage() {
  118 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  119 |
  120 |     console.log('🔁 Starting a new chatbot session...');
  121 |     await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
  122 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  123 |
  124 |     await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
  125 |       console.log('🔄 Reloading and verifying bot session is cleared...');
  126 |     const botMessages = await frameLocator.locator('.system-message-text');
  127 |     await expect(botMessages).toHaveCount(0);
  128 |
  129 |     console.log('✅ Verified: Bot responses are cleared after reload.');
  130 |   }
  131 |
  132 |   async Wait() {
  133 |     const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
  134 |     
  135 |     console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
  136 |     await this.page.waitForTimeout(10000);
  137 |     
  138 |     console.log('✅ Verifying idle timeout message appears...');
  139 |     await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  140 |   }
  141 |
  142 |   async LikeBtn() {
  143 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  144 |
  145 |     console.log('👍 Clicking Like button...');
  146 |     await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
  147 |     await frameLocator.locator(Chatbotlocator.LikeBtn).click();
  148 |     await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  149 |   }
  150 |
  151 |   async DisLikeBtn() {
  152 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  153 |
  154 |     console.log('👎 Clicking Dislike button...');
  155 |     await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
  156 |     await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
  157 |     await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  158 |   }
  159 |
  160 |   async CopyBtn() {
  161 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  162 |
  163 |     console.log('📋 Clicking Copy button...');
  164 |     await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
  165 |     await frameLocator.locator(Chatbotlocator.Copybtn).click();
  166 |   }
  167 |
  168 |   async PredefinedBtnClick(testInfo: TestInfo) {
  169 |     const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  170 |     const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);
  171 |
  172 |     console.log('🔘 Clicking Predefined button...');
  173 |
  174 |     await expect(predefinedBtn).toBeVisible();
  175 |     await predefinedBtn.click();
  176 |     await this.page.waitForTimeout(9000);
  177 |
  178 |     const botMessages = await frameLocator.locator('.system-message-text').all();
  179 |     const lastMessage = botMessages[botMessages.length - 1];
  180 |     const botResponse = (await lastMessage.textContent())?.trim();
  181 |
  182 |     console.log(`✅ Bot response received: "${botResponse}"`);
  183 |
  184 |     testInfo.annotations.push({
  185 |       type: 'info',
  186 |       description: `Bot response: ${botResponse}`,
  187 |     });
  188 |
  189 |     expect(botResponse).toBeTruthy();
  190 |
  191 | }
  192 |
  193 | async InactivityPopup1() {
  194 |   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  195 |   console.log('⏳ Waiting for inactivity popup to appear...');
  196 |   const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
  197 |   console.log('⏳ Waiting for inactivity popup to appear...');
  198 |   await expect(inactivityPopup).toBeVisible({ timeout: 70000  });
  199 |   await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('היי! לא ראינו פעילות ב-10').isVisible();
  200 |     await this.page.locator('.anticon.anticon-close.ant-modal-close-icon').isVisible();
  201 |   console.log('✅ Inactivity popup is visible.');
  202 |   await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('dialog').getByRole('button', { name: 'המשך שיחה' }).click();
  203 |   console.log('🔄 Clicking "Continue Chat" button...');
  204 |
  205 | }
  206 | async InactivityPopup2(){
  207 |
  208 |
  209 | // Wait for 1 minute and 10 seconds
  210 | await this.page.waitForTimeout(70000);
  211 |
  212 | // Check visibility of the close icon
  213 | const closeIcon = this.page.locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button');
  214 |
> 215 | await expect(closeIcon).toBeVisible();  // Optional but recommended
      |                         ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  216 |
  217 | // Click the close icon
  218 | await closeIcon.click();
  219 |
  220 |     }                                                                                                             
  221 |
  222 | }
  223 |
```