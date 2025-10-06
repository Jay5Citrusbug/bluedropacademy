import { Page, expect, FrameLocator, TestInfo } from '@playwright/test';
import { generateRandomQuestion } from '../Utils/testData';
import { FormLocator } from '../Locators/FormLocator';
import { adminPageLocators } from '../Locators/AdminpageLocator';
import { Chatbotlocator } from '../Locators/chatbotLocator';
import { faker } from '@faker-js/faker';
import { MenuLocator } from '../Locators/HamburgerMenuLocator';


let name = faker.food.dish();


export class Edge_case {


  readonly page: Page;
  private userMessage: string = '';

   readonly frameLocator: FrameLocator;
 
   constructor(page: Page) {
     this.page = page;
     this.frameLocator = page.frameLocator(`iframe[name="${FormLocator.iframeName}"]`);
   }
 

    async goto() {
        console.log("Navigating to the admin page...");
        const AdminUrl = process.env.URL_ADMIN;
        if (!AdminUrl) {
            throw new Error("Environment variable URL_CHATBOT is not defined.");
        }
        console.log("Navigating to the chatbot page...");
        await this.page.goto(AdminUrl);
        console.log("Successfully navigated to the admin page.");
    }

  // Perform login using the provided credentials
  async login(email: string, password: string) {
    console.log(`Starting login process for user: ${email}`);
    
    console.log('Filling in email input...');
    await this.page.getByRole('textbox', { name: adminPageLocators.emailInput.name }).fill(email);

    console.log('Filling in password input...');
    await this.page.getByRole('textbox', { name: adminPageLocators.passwordInput.name }).fill(password);

    console.log('Clicking on Sign In button...');
    await this.page.getByRole('button', { name: adminPageLocators.signInButton.name }).click();

    console.log('Login submitted, waiting for dashboard to load...');
  }

  // Reset user data for a specific user email
  async resetUserData(userEmail: string) {
    const timeoutLimit = 30000; // assuming 30s from your global config; adjust accordingly

    console.log(`Starting reset process for user: ${userEmail}`);

    try {
      console.log('Clicking on User Data tab...');
      await this.page.getByText(adminPageLocators.userDataTab.text).click();

      console.log(`Searching for user with email: ${userEmail}`);
      await this.page.getByRole('searchbox', { name: adminPageLocators.searchBox.name }).fill(userEmail);
      await this.page.waitForTimeout(3000);

      console.log('Waiting for user data to appear...');
      const cardBody = this.page.locator('.ant-card-body');
      const targetRow = cardBody.getByRole('cell', { name: 'Reset' });

             console.log("Scrolling horizontally to bring Reset button into view...");
            // const resetButton = this.page.locator(adminPageLocators.resetButton.xpath);

            // Focus the scrollable container
            const scrollableTable = this.page.locator('.ant-table-scroll-horizontal');
            await scrollableTable.click(); // give focus

            // Scroll right using keyboard multiple times
            for (let i = 0; i < 10; i++) {
                await this.page.keyboard.press('ArrowRight');
                await this.page.waitForTimeout(100); // slight pause between scrolls
            }
            console.log("Clicking Reset button...");
        console.log("Clicking Reset button by text...");
        await this.page.getByText("Reset", { exact: true }).isVisible();

        await this.page.getByText("Reset", { exact: true }).click();

            console.log("Confirming the reset...");
            await this.page.getByRole("button", { name: "Yes" }).click();

            console.log("Waiting for success message...");
            await expect(
                this.page
                    .locator("div")
                    .filter({ hasText: adminPageLocators.successMessage.text })
                    .nth(3)
            ).toBeVisible();
            console.log("Reset confirmation message is visible.");

            console.log(`✅ Reset process completed for user: ${userEmail}`);
    } catch (error) {
      console.error(`❌ Error during resetUserData: ${error}`);
      console.error(`Test failed due to timeout after ${timeoutLimit} ms - check network/API/browser performance.`);
      throw error;
    }
  }
  
  async fillPersonalInfo(name: string, gender: string) {
      const timeoutLimit = 3000; // Adjust based on global config if different
  
      try {
        console.log('Starting to fill personal information form...');
        const frame = this.page.frameLocator(Chatbotlocator.iframeName);
  
        console.log(`Filling name: ${name}`);
        await this.frameLocator.locator(FormLocator.usernameField).fill(name);
  
    const genderLabel = FormLocator.genderRadio(gender).name;
    console.log(`Selecting gender: ${genderLabel}`);

    // Click the gender label by visible text (like "זכר 👨" or "נקבה 👩")
    await frame.locator('label').filter({ hasText: genderLabel }).click();

    console.log('Checking visibility of "Start" button...');
    const startButton = frame.getByText(FormLocator.startButton.name, { exact: true });
    await expect(startButton).toBeVisible({ timeout: timeoutLimit });

    console.log('Clicking "Start" button...');
    await startButton.click();

    console.log('✅ Personal info submitted successfully.');

      } catch (error) {
        console.error(`❌ Error in fillPersonalInfo: ${error}`);
        console.error(`Test failed due to timeout after ${timeoutLimit} ms - check iframe load or form issues.`);
        throw error;
      }
    }

async AdminChangeBalanceValue () {

  //await this.page.getByText('Training Data').click();
  await this.page.getByText('SubScriptions').click();
  await this.page.getByRole('listitem', { name: '2' }).locator('a').click();
  await this.page.getByRole('button', { name: 'edit' }).click();  
  await this.page.getByRole('cell', { name: 'Increase Value Decrease Value' }).getByRole('spinbutton').fill('0.005');
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('button', { name: 'Save' }).click();
  const successMessage = this.page.locator('text=Subscription updated successfully');
    await expect(successMessage).toBeVisible();
 
}
async AdminreverseAmount(){
   // await this.page.getByText('Training Data').click();
  await this.page.getByText('SubScriptions').click();
  await this.page.getByRole('listitem', { name: '2' }).locator('a').click();
  await this.page.getByRole('button', { name: 'edit' }).click();  
  await this.page.getByRole('cell', { name: 'Increase Value Decrease Value' }).getByRole('spinbutton').fill('1');
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('button', { name: 'Save' }).click();
  const successMessage = this.page.locator('text=Subscription updated successfully');
    await expect(successMessage).toBeVisible();

}

async Verify_insufficientBalance(){

console.log('Insufficient Balance pop-up comming');
  await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('heading', { name: 'נראה שהגיע הזמן לעשות מנוי😊' }).isVisible();
  await this.page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('הגעת לגבול השימוש היומי ב"בלו" ללא מנוי. תוכל להמשיך רק מחר. או שתוכל לרכוש אחד ').isVisible();

}

async SubmitQuery2(testInfo: TestInfo): Promise<string> {
  this.userMessage = generateRandomQuestion();
  const frameLocator = this.page.frameLocator(Chatbotlocator.iframeName);
  const input = frameLocator.getByTestId('seach-msg-input');
  const submitBtn = frameLocator.locator(Chatbotlocator.SubmitBtn);

  console.log(`💬 Submitting query: "${this.userMessage}"`);

  //await input.clear();
  await input.fill(this.userMessage);
  await input.press('Enter');
  console.log('🕐 Waiting for bot response...');
  await this.page.waitForTimeout(30000);

  const botMessages = await frameLocator.locator('.system-message-text').all();
  const lastMessage = botMessages[botMessages.length - 1];
  const botResponse = (await lastMessage.textContent())?.trim();

  console.log(`✅ Bot response received: "${botResponse}"`);

  testInfo.annotations.push({
    type: 'info',
    description: `Bot response: ${botResponse}`,
  });

  expect(botResponse).toBeTruthy();

  // Return the message
  return this.userMessage;  // <-- ensure this line exists at the end
}
 
 async OpenHamburgerMenu2() {

  const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
    const menuButton = frameLocator.locator(MenuLocator.hamburgerMenuBtn);

    console.log('📂 Opening hamburger menu...');
    await expect(menuButton).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await menuButton.click({force: true});

    await expect(frameLocator.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(frameLocator.getByTestId('start-new-session')).toBeVisible();

 
}

async SearchHistory2(query: string) {
 const frameLocator = this.page.frameLocator(MenuLocator.iframeName);
  console.log(`🔍 Searching for message: "${query}"`);

  const input = frameLocator.locator(MenuLocator.Searchbar);
  await expect(input).toBeVisible();

  await this.page.evaluate(() => window.scrollTo(0, 0)); // Ensure input is in view
  await input.fill(query); // Fill the search box with the query
  await this.page.waitForTimeout(2000); // Optional wait for results
  // ✅ Assertion: session list is visible
  const sessionList = frameLocator.locator('.session-list');
  await expect(sessionList).toBeVisible();

  //✅ Assertion: session list contains the searched query
  await expect(sessionList).toContainText(query);

  console.log(`✅ Verified session list contains: "${query}"`);
}

}