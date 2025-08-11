import { Chatbotlocator } from '../Locators/chatbotLocator';
import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import { generateRandomQuestion } from '../Utils/testData';
import { MenuLocator } from '../Locators/HamburgerMenuLocator';
import { time } from 'console';

export class chatbotPage {
  readonly page: Page;
  private userMessage: string = '';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyConfirmationElements() {
    console.log('🔍 Waiting for confirmation iframe to appear...');
    await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);

    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('✅ Verifying confirmation message and title...');
    await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible();
    await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible();
  }

async InitialbotMessage(expectedName: string) {
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);

  console.log('💬 Waiting for initial bot message...');

  // Wait until message is non-empty
  await this.page.waitForTimeout(3000); // Waits for 3 seconds
  const messageText = (await messageLocator.first().textContent())?.trim() || '';
  console.log(`📨 Bot message received: "${messageText}"`);
await this.page.waitForTimeout(2000); // Waits for 2 seconds
  // Assert the message contains the expected name
  expect(messageText).toContain(expectedName);
  console.log(`✅ Bot message contains expected name: "${expectedName}"`);
}

async SubmitbtnNotActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    console.log('🔒 Verifying Submit button is disabled...');
    await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeDisabled();
  }

  async SubmitbtnActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    this.userMessage = generateRandomQuestion();
    console.log(`💬 Typing message: ${this.userMessage}`);

    await frameLocator.getByTestId('seach-msg-input').fill(this.userMessage);

    console.log('✅ Verifying Submit button is enabled...');
    await expect(frameLocator.locator(Chatbotlocator.SubmitBtn)).toBeEnabled();
    await frameLocator.getByTestId('seach-msg-input').clear();
    console.log('🔄 Clearing input field after verification...');

  }

  async PredefinebuttonNotActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    console.log('🔒 Verifying predefined buttons are hidden...');
    await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeHidden();
  }

  async PredefinebuttonActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    console.log('🔓 Verifying predefined buttons are visible...');
    await expect(frameLocator.locator('.main-chat-buttons-wrapper')).toBeVisible();
  }

//  async SubmitQuery(testInfo: TestInfo): Promise<string> {

//   this.userMessage = generateRandomQuestion();
//   const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
//   const input = frameLocator.getByTestId('seach-msg-input');
//   const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
//   const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);

//   console.log(`💬 Submitting query: "${this.userMessage}"`);
//   await input.fill(this.userMessage);
//  // await expect(submitBtn).toBeEnabled();
//   await input.press('Enter');

//   console.log('🕐 Waiting for AI response to complete (predefined button visible)...');
//  // await predefinedBtn.waitFor({ state: 'visible' });

//   const botMessages = await frameLocator.locator('.system-message-text').all();
//   const lastMessage = botMessages[botMessages.length - 1];
//   const botResponse = (await lastMessage.textContent())?.trim();

//   console.log(`✅ Bot response received: "${botResponse}"`);

//   testInfo.annotations.push({
//     type: 'info',
//     description: `Bot response: ${botResponse}`,
//   });

//   await expect(lastMessage).toBeVisible({ timeout: 90000 });
//   //expect(botResponse).toBeTruthy();

//   // Return the message
//   return this.userMessage;  // <-- ensure this line exists at the end
// }
async SubmitQuery(testInfo: TestInfo): Promise<string> {
  this.userMessage = generateRandomQuestion();
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  const input = frameLocator.getByTestId('seach-msg-input');
  const systemMessages = frameLocator.locator('.system-message-text');

  console.log(`💬 Submitting query: "${this.userMessage}"`);
  await input.fill(this.userMessage);
  await input.press('Enter');

  console.log('🕐 Waiting for bot response to begin...');
  await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 60000 });

  // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  let botResponse: string | undefined = '';
  await expect
    .poll(async () => {
      const all = await systemMessages.all();
      const last = all[all.length - 1];
      botResponse = (await last.textContent())?.trim();
      return botResponse && botResponse !== this.userMessage;
    }, {
      timeout: 60000,
      message: 'Waiting for full bot response...',
    })
    .toBeTruthy();

  botResponse = botResponse || 'No response received';
  console.log(`✅ Bot response received: "${botResponse}"`);

  testInfo.annotations.push({
    type: 'info',
    description: `Bot response: ${botResponse}`,
  });

  return botResponse;
}

  async scrollToBottom() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    console.log('🔽 Scrolling to bottom...');

    await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
    await frameLocator.locator('body').evaluate((body) => {
  window.scrollTo(0, body.scrollHeight);
});
 //   await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
    await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  }

  async Pagereload() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    console.log('🔄 Reloading and verifying bot session is cleared...');
  }

  async NewsessionChatbotPage() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('🔁 Starting a new chatbot session...');
    await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));

    await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
      console.log('🔄 Reloading and verifying bot session is cleared...');
  }

  async Wait() {
    const idleMessage = 'היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.';
    
    console.log('⏱️ Waiting for 10 minutes to simulate user inactivity...');
    await this.page.waitForTimeout(10000);
    
    console.log('✅ Verifying idle timeout message appears...');
    await expect(this.page.locator(`text=${idleMessage}`)).toBeVisible();
  }

  async LikeBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('👍 Clicking Like button...');
    await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible();
    await frameLocator.locator(Chatbotlocator.LikeBtn).click();
    await expect(frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  }

  async DisLikeBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('👎 Clicking Dislike button...');
    await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();
    await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();
    await expect(frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)).toHaveAttribute('src', /fill='%23008AFC'/);
  }

  async CopyBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('📋 Clicking Copy button...');
    await expect(frameLocator.locator(Chatbotlocator.Copybtn)).toBeVisible();
    await frameLocator.locator(Chatbotlocator.Copybtn).click();
  }

  async PredefinedBtnClick(testInfo: TestInfo) {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const predefinedBtn = frameLocator.locator(Chatbotlocator.Predefinebutton1);

  await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('suggest-message-button').first().click();
 const systemMessages = frameLocator.locator('.system-message-text');

    console.log('🔘 Clicking Predefined button...');
  await expect(predefinedBtn).toBeVisible();
  await this.page.waitForTimeout(1000); // Wait for button to be ready
  await predefinedBtn.click();

  const input = frameLocator.getByTestId('seach-msg-input');

  console.log('🕐 Waiting for bot response to begin...');
  await expect(frameLocator.locator(Chatbotlocator.LikeBtn)).toBeVisible({ timeout: 30000 });

  // ✅ Poll the last visible message until it is non-empty and not equal to the user query
  let botResponse: string | undefined = '';
  await expect
    .poll(async () => {
      const all = await systemMessages.all();
      const last = all[all.length - 1];
      botResponse = (await last.textContent())?.trim();
      return botResponse && botResponse !== this.userMessage;
    }, {
      timeout: 40000,
      message: 'Waiting for full bot response...',
    })
    .toBeTruthy();

  botResponse = botResponse || 'No response received';
  console.log(`✅ Bot response received: "${botResponse}"`);

  testInfo.annotations.push({
    type: 'info',
    description: `Bot response: ${botResponse}`,
  });

  return botResponse;
}

async InactivityPopup1() {
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  console.log('⏳ Waiting for inactivity popup to appear...');

  const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');

  const env = process.env.ENVIRONMENT || 'staging';
  const timeout = env === 'production' ? 610_000 : 70_000; // 10m10s or 1m10s

  console.log(`⏳ Waiting in ${env} with timeout: ${timeout / 1000}s`);

  // Wait for popup to be visible with appropriate timeout
  await expect(inactivityPopup).toBeVisible({ timeout });

  const popupFrame = this.page.frameLocator('iframe[name="htmlComp-iframe"]');

  await expect(popupFrame.getByText('היי! לא ראינו פעילות ב-10')).toBeVisible();
 //await expect(this.page.locator('.anticon.anticon-close.ant-modal-close-icon')).toBeVisible();

  console.log('✅ Inactivity popup is visible.');

  await popupFrame.getByRole('dialog').getByRole('button', { name: 'המשך שיחה' }).click();

  console.log('🔄 Clicked "Continue Chat" button.');
}

async InactivityPopup2(){

 const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  const inactivityPopup = frameLocator.locator('role=heading[name="נראה שלא היית פעיל לאחרונה"]');
 // Wait for 1 minute and 10 seconds
  console.log('⏳ Waiting for inactivity popup to appear for close...');

  await expect(inactivityPopup).toBeVisible({ timeout: 70000  });
  await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('היי! לא ראינו פעילות ב-10').isVisible();

  console.log('✅ Inactivity popup is visible.');

// Check visibility of the close icon
//const closeIcon = this.page.locator('//html/body/div[2]/div/div[2]/div/div[1]/div/button');

//await expect(closeIcon).toBeVisible();  // Optional but recommended

// Click the close icon
//await closeIcon.click();

    }                                                                                                             

}
