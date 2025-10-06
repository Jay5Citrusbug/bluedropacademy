
import { test, expect, BrowserContext, Page } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { Edge_case } from './Pages/insufficient_balance';
import { chatbotPage } from './Pages/chatbotPage';
import { adminCredentials, chatbotCredentials } from './Config/credentials';
import { generateRandomQuestion } from './Utils/testData';
import { Chatbotlocator } from './Locators/chatbotLocator';



test('TC_22: 💰 Admin daily plan cost update and verify insufficient balance popup', async ({ browser }, testInfo) => {
 
   const env = process.env.ENVIRONMENT || 'staging';

  // Skip this test in production
  test.skip(env === 'production', 'Skipping in production environment');


  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const adminInsufficientPopup = new Edge_case(adminPage); // ✅ correct instantiation

   await adminInsufficientPopup.goto();
   await adminInsufficientPopup.login(adminCredentials.email, adminCredentials.password);
  // await adminInsufficientPopup.resetUserData(testUserData.email);
  await adminInsufficientPopup.AdminChangeBalanceValue();
  await adminPage.close();
  await adminContext.close();

  // ----- Chatbot: Login and verify popup -----
  const chatbotContext = await browser.newContext();
  const chatbotPg = await chatbotContext.newPage();

  const chatbotLogin = new ChatbotLoginPage(chatbotPg);
  const form = new FillPersonalInfopage(chatbotPg);
  const chatbotInsufficientPopup = new Edge_case(chatbotPg); // ✅ reuse Edge_case

  await chatbotLogin.goto();
  await chatbotLogin.login(chatbotCredentials.email, chatbotCredentials.password);
  // await chatbotInsufficientPopup.fillPersonalInfo(testUserData.name, testUserData.gender);
  const userMessage = generateRandomQuestion();
  console.log(`💬 Submitting query: "${userMessage}"`);
  const frameLocator = chatbotPg.frameLocator(Chatbotlocator.iframeName);

  const input = frameLocator.getByTestId('seach-msg-input');

  // await input.fill(userMessage);
  // await input.press('Enter');

  //await chatbotInsufficientPopup.SubmitQuery2(testInfo);
  console.log('Insufficient Balance pop-up comming');
  await chatbotPg.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('heading', { name: 'נראה שהגיע הזמן לעשות מנוי😊' }).isVisible();
  await chatbotPg.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByText('הגעת לגבול השימוש היומי ב"בלו" ללא מנוי. תוכל להמשיך רק מחר. או שתוכל לרכוש אחד ').isVisible();

  await chatbotInsufficientPopup.Verify_insufficientBalance();

  await chatbotPg.close();
  await chatbotContext.close();

 //  ----- Admin: Reverse the balance change -----
  // Admin context
const adminContext1 = await browser.newContext();
const adminPage1 = await adminContext1.newPage();
const admin1 = new Edge_case(adminPage1);
await admin1.goto();
await admin1.login(adminCredentials.email, adminCredentials.password);
await admin1.AdminreverseAmount();
await adminContext1.close(); // ✅ only closes admin context

// Chatbot context
const chatbotContext1 = await browser.newContext();
const chatbotPage1 = await chatbotContext1.newPage();
const chatbotLogin1 = new ChatbotLoginPage(chatbotPage1);

await chatbotLogin1.goto();
await chatbotLogin1.login(chatbotCredentials.email, chatbotCredentials.password);

const frameLocator1 = chatbotPage1.frameLocator(Chatbotlocator.iframeName);
const input1 = frameLocator1.getByTestId('seach-msg-input');

await input1.waitFor({ state: 'visible' }); // ensure input is ready

await chatbotPage1.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await input1.fill(userMessage);
await input1.press('Enter');

await chatbotPage1.waitForTimeout(2000); // wait for response
});