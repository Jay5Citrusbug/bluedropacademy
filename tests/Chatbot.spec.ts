import { BrowserContext, Page, test, expect } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { adminCredentials, chatbotCredentials } from './Config/credentials';
import { AdminPage } from './Pages/AdminPage';
import { chatbotPage } from './Pages/chatbotPage';
import { HamburgerMenuPage } from './Pages/HamburgerMenuPage';
import { MenuLocator } from './Locators/HamburgerMenuLocator';


let page: Page;
let context: BrowserContext;
let chatbot: ChatbotLoginPage;
let form: FillPersonalInfopage;
let chatbotscreen: chatbotPage;
let adminPage: AdminPage;
let Menu: HamburgerMenuPage;


test.describe('BlueDrop Chatbot Test Suite', () => {

  test.beforeAll(async ({ browser }) => {
    const adminContext = await browser.newContext();
    const adminPageInstance = await adminContext.newPage();
    const admin = new AdminPage(adminPageInstance);
    Menu = new HamburgerMenuPage(page);

    await admin.goto();
    await admin.login(adminCredentials.email, adminCredentials.password);
    await admin.resetUserData(testUserData.email);
    await adminContext.close();
    console.log('✅ User reset complete');
    context = await browser.newContext();
    page = await context.newPage();
    chatbot = new ChatbotLoginPage(page);
    form = new FillPersonalInfopage(page);
    chatbotscreen = new chatbotPage(page);

    await chatbot.goto();
    await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
    await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
    await form.fillPersonalInfo(testUserData.name, testUserData.gender);
    console.log('✅ Chatbot login and form submitted');
  });

  test.afterAll(async () => {
    console.log('🧹 Closing context');
    await context.close();
  });

  test.describe('💬 Chatbot Screen', () => {

    test('TC_01: ✅ Confirm chatbot screen elements are visible', async () => {
      await chatbotscreen.verifyConfirmationElements();
    });

    test('TC_02: 🧠 Initial chatbot message is displayed', async () => {
      await chatbotscreen.InitialbotMessage();
    });


    test('TC_03: 🚫 Predefined buttons are not active', async () => {
      await chatbotscreen.PredefinebuttonNotActive();
    });

    test('TC_04: 🚫 Submit button is disabled initially', async () => {
      await chatbotscreen.SubmitbtnNotActive();
    });

    test('TC_05: ✅ Submit button is enabled after input', async () => {
      await chatbotscreen.SubmitbtnActive();
    });

    test('TC_06: 📤 Submit query message', async ({}, testInfo) => {
      await chatbotscreen.SubmitQuery(testInfo);
    });

    test('TC_07: 🔽 Scroll to bottom of chat', async () => {
      await chatbotscreen.scrollToBottom();
    });

    test('TC_08: ✅ Predefined buttons become active after response', async () => {
      await chatbotscreen.PredefinebuttonActive();
    });

    test('TC_09: 👍 Like button functionality', async () => {
      await chatbotscreen.LikeBtn();
    });

    test('TC_10: 👎 Dislike button functionality', async () => {
      await chatbotscreen.DisLikeBtn();
    });

    test('TC_11: 📋 Copy button functionality', async () => {
      await chatbotscreen.CopyBtn(); // changed from DisLikeBtn to CopyBtn for clarity
    });

    test('TC_12: 📍 Predefined button click triggers response', async ({}, testInfo) => {
      await chatbotscreen.PredefinedBtnClick(testInfo);
    });

    test('TC_13: 🔄 Reload hides previous chat', async () => {
      await page.reload();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });

    test('TC_14: ✏️ New session is created using edit icon', async () => {
      await chatbotscreen.NewsessionChatbotPage();
      await chatbotscreen.Pagereload();
      await chatbotscreen.InitialbotMessage();
    });

 
test('TC_15: Click on the Continue button for continue session.', async () => {
      await chatbotscreen.InactivityPopup1();

    }
    );
  test('TC_16:Session pop-up display after 1 minutes and close .', async () => {
          await chatbotscreen.InactivityPopup2();

    }
    );

    
    test('TC_17: Browser tab end/terminate and verify search history page.', async ({ browser }, testInfo) => {

      const chatbotContext = await browser.newContext();
      const chatbotPage = await chatbotContext.newPage();

        const query = await chatbotscreen.SubmitQuery(testInfo);
        await chatbotscreen.scrollToBottom()
        await chatbotscreen.PredefinebuttonActive()
        // await chatbotscreen.Pagereload();
      
        // ❌ Close only the second tab (action tab)
        await chatbotPage.close();

        // 🔁 Open a new tab in same context for history check
      const Historypage = await browser.newContext();
      const History = await chatbotContext.newPage();

        await chatbot.goto();
      
        const iframe = await History.frameLocator('iframe[name="htmlComp-iframe"]');
        await iframe.getByTestId('hamburger-click').click();
        await iframe.getByTestId('search-session-input').click();
      
        const frameLocator = History.frameLocator(MenuLocator.iframeName);
        console.log(`🔍 Searching for message: "${query}"`);
      
        const input = frameLocator.locator(MenuLocator.Searchbar);
        await expect(input).toBeVisible();
      
        await History.evaluate(() => window.scrollTo(0, 0));
        await input.fill(query);
        await History.waitForTimeout(2000);
      
        const sessionList = frameLocator.locator('.session-list');
        await expect(sessionList).toBeVisible();
        // await expect(sessionList).toContainText(query);
      
        // ✅ Clean up
        await chatbotContext.close();
      });
      

  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`❌ Test failed: ${testInfo.title}`);
    console.log(`📸 Screenshot saved at: ${screenshotPath}`);
  }

  const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
  if (videoPath) {
    testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
  }
});
