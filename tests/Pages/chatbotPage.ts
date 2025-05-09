import { Chatbotlocator } from '../Locators/chatbotLocator';
import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import { generateRandomQuestion } from '../Utils/testData';
import { MenuLocator } from '../Locators/HamburgerMenuLocator';

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

  async InitialbotMessage() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);

    console.log('💬 Waiting for initial bot message...');
    await expect
      .poll(async () => (await messageLocator.textContent())?.trim(), { timeout: 30000 })
      .not.toBe('');
    console.log('✅ Initial bot message received.');
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

  async SubmitQuery(testInfo: TestInfo) {
    this.userMessage = generateRandomQuestion();
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const input = frameLocator.getByTestId('seach-msg-input');
    const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);

    console.log(`💬 Submitting query: "${this.userMessage}"`);

    await input.clear();
    await input.fill(this.userMessage);
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    console.log('🕐 Waiting for bot response...');
    await this.page.waitForTimeout(9000);

    const botMessages = await frameLocator.locator('.system-message-text').all();
    const lastMessage = botMessages[botMessages.length - 1];
    const botResponse = (await lastMessage.textContent())?.trim();

    console.log(`✅ Bot response received: "${botResponse}"`);

    testInfo.annotations.push({
      type: 'info',
      description: `Bot response: ${botResponse}`,
    });

    expect(botResponse).toBeTruthy();
  }

  async scrollToBottom() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('🔽 Scrolling to bottom...');
    await this.page.waitForTimeout(5000);

    await expect(frameLocator.locator(Chatbotlocator.ScrollingBtn)).toBeVisible();
    await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
    await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();
  }

  async Pagereload() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('🔄 Reloading and verifying bot session is cleared...');
    const botMessages = await frameLocator.locator('.system-message-text');
    await expect(botMessages).toHaveCount(0);

    console.log('✅ Verified: Bot responses are cleared after reload.');
  }

  async NewsessionChatbotPage() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

    console.log('🔁 Starting a new chatbot session...');
    await expect(frameLocator.locator(Chatbotlocator.NewsessionBtn)).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));

    await frameLocator.locator(Chatbotlocator.NewsessionBtn).click({ force: true });
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
    const predefinedBtn = frameLocator.getByRole('button', { name: 'Explain me in detail so i can get it' });

    console.log('🔘 Clicking Predefined button...');
    await expect(predefinedBtn).toBeVisible();
    await predefinedBtn.click();
    await this.page.waitForTimeout(9000);

    const botMessages = await frameLocator.locator('.system-message-text').all();
    const lastMessage = botMessages[botMessages.length - 1];
    const botResponse = (await lastMessage.textContent())?.trim();

    console.log(`✅ Bot response received: "${botResponse}"`);

    testInfo.annotations.push({
      type: 'info',
      description: `Bot response: ${botResponse}`,
    });

    expect(botResponse).toBeTruthy();



}
}