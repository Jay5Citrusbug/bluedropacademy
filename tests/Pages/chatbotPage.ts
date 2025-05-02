import { Chatbotlocator } from '../Locators/chatbotLocator';
import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import {generateRandomQuestion} from '../Utils/testData'; // Import the test data
import { chatbotLocators } from '../Locators/Login_chatbotLocator';

export class chatbotPage {
  readonly page: Page;
  private userMessage: string = '';


  constructor(page: Page) {
    this.page = page;
  }

  async verifyConfirmationElements() {
    // Wait until the iframe is present in the DOM
    await this.page.waitForSelector(`iframe[name="${Chatbotlocator.iframeName.replace('iframe[name="', '').replace('"]', '')}"]`);
  
    // Step 1: Use frameLocator for visibility assertions
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  
    // ✅ Wait for the thank-you message to be visible
    await expect(frameLocator.getByText('תודה על מסירת הפרטים שלך')).toBeVisible()
  
   await expect(frameLocator.getByText("שיחות עם בלו")).toBeVisible()
   // Now validate other elements

  }
  async InitialbotMessage() {
    // Wait until the iframe is present in the DOM  
    // Step 1: Use frameLocator for visibility assertions
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const messageLocator = frameLocator.locator(Chatbotlocator.InitialMessage);
    
    // Wait until the text is not empty or whitespace
    await expect
      .poll(async () => (await messageLocator.textContent())?.trim(), { timeout: 30000 })
      .not.toBe('');
    
    
  }

  async SubmitbtnNotActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const SubmitBtnDisable = frameLocator.locator(Chatbotlocator.SubmitBtn);// Assert that textContent is not empty or just whitespace

await expect(SubmitBtnDisable).toBeDisabled(); // Only works if it’s a real <button disabled>

  }

  async SubmitbtnActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
     this.userMessage = generateRandomQuestion();

    await this.page
    .frameLocator(Chatbotlocator.iframeName)
    .getByTestId('seach-msg-input')
    .fill(this.userMessage);
    const SubmitBtnEnable = frameLocator.locator(Chatbotlocator.SubmitBtn);
await expect(SubmitBtnEnable).toBeEnabled(); // Only works if it’s a real <button disabled>

  }

  async PredefinebuttonNotActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
    await expect(PreDefineBtn).toBeHidden(); // Only works if it’s a real <button disabled>
  }

  async PredefinebuttonActive() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    const PreDefineBtn = frameLocator.locator(' .main-chat-buttons-wrapper');
    await expect(PreDefineBtn).toBeVisible(); // Only works if it’s a real <button disabled>
  }
  
  async SubmitQuery(testInfo: TestInfo) {
    this.userMessage = generateRandomQuestion(); // Generate a random question';

    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    
    await this.page
    .frameLocator(Chatbotlocator.iframeName)
    .getByTestId('seach-msg-input')
    .clear();
    await this.page
    .frameLocator(Chatbotlocator.iframeName)
    .getByTestId('seach-msg-input')
    .fill(this.userMessage);
    const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);
  await expect(submitBtn).toBeEnabled();

  await submitBtn.click();

  // Step 2: Wait for bot response
  await this.page.waitForTimeout(9000); // Consider replacing with smarter wait

  // Step 3: Capture last bot response
  const botMessages = await frameLocator.locator('.system-message-text').all();
  const lastMessage = botMessages[botMessages.length - 1];
  const botResponse = (await lastMessage.textContent())?.trim();

  // Step 4: Log in console and report
  console.log(`User: ${this.userMessage}`);
  console.log(`Bot: ${botResponse}`);

  // ✅ Add to Playwright report
  testInfo.annotations.push({
    type: 'info',
    description: `Bot response: ${botResponse}`,
  });

  // Optional assertion
  expect(botResponse).toBeTruthy();

  }

//Scrolling to the bottom of the page
async scrollToBottom() {
  
  await this.page.waitForTimeout(5000); // Wait for the chatbot complete loading
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

  await frameLocator.locator(Chatbotlocator.ScrollingBtn).isVisible();
  await frameLocator.locator(Chatbotlocator.ScrollingBtn).click();
  await expect(frameLocator.getByText(Chatbotlocator.VerifyBottomTxt)).toBeVisible();

  }

  async Pagereload() {

    // Re-locate the iframe after reload
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    
    // Assert that no bot messages are present after reload
    const botMessages = await frameLocator.locator('.system-message-text');
    
    // ✅ Assert that it is **not visible**
    await expect(botMessages).toHaveCount(0); // Meaning no messages are shown
    
    console.log('✅ Verified: Bot responses are cleared after reload.');
  
    }

    async NewsesionChatbotPage() {
      const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    
      // Assert that no bot messages are present after reload
      await frameLocator.locator(Chatbotlocator.NewsessionBtn).isVisible();
      await frameLocator.locator(Chatbotlocator.NewsessionBtn).click();      

}

async OpenHamburgerMenu() {
        

  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
const iconButtons = frameLocator.getByRole('button', { name: 'icon' }).nth(2);

await iconButtons.isVisible();
await iconButtons.click( { force: true });
await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
await frameLocator.getByTestId('start-new-session').isVisible();
}

async LoadmoreBtn() {
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);

  await frameLocator.locator(Chatbotlocator.LoadMoreBtn).isVisible();
  await frameLocator.locator(Chatbotlocator.LoadMoreBtn).click();
  //const sessionList = this.page.locator('ul.session-list');
 // await expect(sessionList).toBeVisible();
  }


  async SearchHistory() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    await frameLocator.locator(Chatbotlocator.Searchbar).isVisible();
    const frame = this.page.frameLocator(Chatbotlocator.iframeName);
const input = frame.locator(Chatbotlocator.Searchbar);

await expect(input).toBeVisible();
await input.click({ force: true }); // optional if needed
await input.fill(this.userMessage);
//await expect(sessionList).toHaveText(this.userMessage);
    }
  
    async NoSearchHistory() {
      const userMessage = generateRandomQuestion()
      const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
      await frameLocator.locator(Chatbotlocator.Searchbar).clear();
      await frameLocator.locator(Chatbotlocator.Searchbar).fill(userMessage);
      await expect(frameLocator.getByText('לא נמצאה שיחה')).toBeVisible();
      }
    
async CloseHamburgerMenu() {
const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
await frameLocator.getByRole('button', { name: 'Close' }).isVisible();
await frameLocator.getByRole('button', { name: 'Close' }).click();
}

async Newsession() {
const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
const HamburgericonButtons = frameLocator.getByRole('button', { name: 'icon' });

await HamburgericonButtons.nth(2).click();

await frameLocator.getByTestId('start-new-session').isVisible();
await frameLocator.getByTestId('start-new-session').click();
}

async Wait() {
  console.log('Waiting for 10 minutes...');
  this.page.setDefaultTimeout(11 * 60 * 1000);

  // Optional: increase timeout for Playwright actions (e.g., expect)
  this.page.setDefaultTimeout(60 * 1000); // 1 minute timeout for actions

  await this.page.waitForTimeout(10 * 60 * 1000); // wait 10 minutes
  console.log('Wait complete!');await expect(this.page.locator('text=היי! לא ראינו פעילות ב-10 הדקות האחרונות. רוצה להמשיך בשיחה? פשוט לחץ על כפתור המשך שיחה למטה.')).toBeVisible();


  }

  async LikeBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    await frameLocator.locator(Chatbotlocator.LikeBtn).isVisible();
    await frameLocator.locator(Chatbotlocator.LikeBtn).click();
    await expect(
      frameLocator.locator(`${Chatbotlocator.LikeBtn} img`)
    ).toHaveAttribute('src', /fill='%23008AFC'/);
     
      }

  async DisLikeBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
await expect(frameLocator.locator(Chatbotlocator.DisLikeBtn)).toBeVisible();

await frameLocator.locator(Chatbotlocator.DisLikeBtn).click();

await expect(
  frameLocator.locator(`${Chatbotlocator.DisLikeBtn} img`)
).toHaveAttribute('src', /fill='%23008AFC'/);
 
  }

  async CopyBtn() {
    const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
    await frameLocator.locator(Chatbotlocator.Copybtn).isVisible();
    await frameLocator.locator(Chatbotlocator.Copybtn).click();
  }

}