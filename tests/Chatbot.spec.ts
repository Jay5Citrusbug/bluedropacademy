import { BrowserContext, Page, test, expect } from '@playwright/test';
import { adminCredentials, chatbotCredentials } from './Config/credentials';
import { AdminPage } from './Pages/AdminPage';
import { chatbotPage } from './Pages/chatbotPage';
import { FillPersonalInfopage } from './Pages/FormPage';
import { HamburgerMenuPage } from './Pages/HamburgerMenuPage';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { testUserData } from './Utils/testData';
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

 
test('TC_15: 🔄 Click on the Continue button to resume session', async () => {
      await chatbotscreen.InactivityPopup1();

    }
    );

const env = process.env.ENVIRONMENT || 'staging';
test.skip(env === 'production', '⏭️ Skipping in production environment');

test('TC_16: ⏱️ Session pop-up displays after 1 minute and close pop-up', async () => {
        await chatbotscreen.InactivityPopup2();
        await page.reload();
        await chatbotscreen.InitialbotMessage();


    }
    );
    
test.only('TC_17: 🧭 Browser tab terminated and search history page is verified', async ({ page }, testInfo) => {

  const query = await chatbotscreen.SubmitQuery(testInfo);
  await page.reload();
  const Menu = new HamburgerMenuPage(page);
  const iframe = await page.frameLocator('iframe[name="htmlComp-iframe"]');

  await page.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByTestId('hamburger-click').click();
  console.log(`🔍 Searching for message: "${query}"`);

  const input = iframe.locator(MenuLocator.Searchbar);
  await expect(input).toBeVisible();
  await input.fill(query);

  const sessionList = iframe.locator('.session-list');

  await expect(sessionList).toBeVisible();

  // Optionally wait a bit for the list to update
  await page.waitForTimeout(3000);

  // Debug: log what’s actually inside the session list
  const sessionText = await sessionList.innerText();
  console.log(`📋 Session List Text: \n${sessionText}`);

  // Assert: relaxed match (contains part of the query)
  await expect(sessionText.toLowerCase()).toContain(query.toLowerCase().trim());

  // 🧪 Optional: stricter version, if needed:
  await expect(sessionList).toContainText(query);

  await page.close();
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
});
})
