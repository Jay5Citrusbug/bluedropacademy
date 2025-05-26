
import { test, expect, BrowserContext, Page } from '@playwright/test';
import { ChatbotLoginPage } from './Pages/LoginChatbot';
import { FillPersonalInfopage } from './Pages/FormPage';
import { testUserData } from './Utils/testData';
import { Edge_case } from './Pages/insufficient_balance';
import { chatbotPage } from './Pages/chatbotPage';
import { adminCredentials, chatbotCredentials } from './Config/credentials';


test('TC_26: 💰 Admin daily plan cost update and verify insufficient balance popup', async ({ browser }, testInfo) => {
 
   const env = process.env.ENVIRONMENT || 'staging';

  // Skip this test in production
  test.skip(env === 'production', 'Skipping in production environment');


  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const adminInsufficientPopup = new Edge_case(adminPage); // ✅ correct instantiation

  await adminInsufficientPopup.goto();
  await adminInsufficientPopup.login(adminCredentials.email, adminCredentials.password);
  await adminInsufficientPopup.resetUserData(testUserData.email);
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
  await chatbotInsufficientPopup.Verify_insufficientBalance();

  await chatbotPg.close();
  await chatbotContext.close();

   // ----- Admin: Reverse the balance change -----
  const adminReverseContext = await browser.newContext();
  const adminReversePage = await adminReverseContext.newPage();
  const adminReverse = new Edge_case(adminReversePage); // ✅ correct class

  await adminReverse.goto();
  await adminReverse.login(adminCredentials.email, adminCredentials.password);
  await adminReverse.AdminreverseAmout();
  await adminReverseContext.close();

const chatbotContext1 = await browser.newContext();
const chatbotPage1 = await chatbotContext1.newPage();
const chatbotLogin2 = new ChatbotLoginPage(chatbotPage1);
const chatbotscreen = new chatbotPage(chatbotPage1);
const form1 = new FillPersonalInfopage(chatbotPage1);

await chatbotLogin2.goto();
await chatbotLogin2.login(chatbotCredentials.email, chatbotCredentials.password);
await form1.fillPersonalInfo(testUserData.name, testUserData.gender);
await chatbotPage1.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});
// await chatbotPage1.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('switch', { name: '📚 תשובה קצרה תשובה מפורטת 📄' }).isVisible();
// await chatbotPage1.locator('iframe[name="htmlComp-iframe"]').contentFrame().getByRole('switch', { name: '📚 תשובה קצרה תשובה מפורטת 📄' }).click();
await chatbotscreen.SubmitQuery(testInfo);

});
