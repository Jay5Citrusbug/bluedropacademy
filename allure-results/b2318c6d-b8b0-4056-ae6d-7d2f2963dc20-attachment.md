# Test info

- Name: BlueDrop test cases >> Chatbot Screen >> TC_03: Confirm chatbot screen elements
- Location: D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:53:9

# Error details

```
Error: Playwright Test did not expect test() to be called here.
Most common reasons include:
- You are calling test() in a configuration file.
- You are calling test() in a file that is imported by the configuration file.
- You have two different versions of @playwright/test. This usually happens
  when one of the dependencies in your package.json depends on @playwright/test.
    at D:\Playwright\Bluedrop_academy\tests\Main.spec.ts:32:9
```

# Test source

```ts
   1 | import { BrowserContext, Page, test, expect } from '@playwright/test';
   2 | import { ChatbotLoginPage } from './Pages/LoginChatbot';
   3 | import { FillPersonalInfopage } from './Pages/FormPage';
   4 | import { testUserData } from './Utils/testData';
   5 | import { adminCredentials, chatbotCredentials } from './Config/credentials';
   6 | import { AdminPage } from './Pages/AdminPage';
   7 | import { chatbotPage } from './Pages/chatbotPage';
   8 |
   9 | let page: Page;
   10 | let context: BrowserContext;
   11 | let chatbot: ChatbotLoginPage;
   12 | let form: FillPersonalInfopage;
   13 | let chatbotscreen: chatbotPage;
   14 | let adminPage: AdminPage;
   15 |
   16 | test.describe('BlueDrop test cases', () => {
   17 |
   18 |   test.beforeAll(async ({ browser }) => {
   19 |     const adminContext = await browser.newContext();
   20 |     const adminPageInstance = await adminContext.newPage();
   21 |     const adminPage = new AdminPage(adminPageInstance);
   22 |     await adminPage.goto();
   23 |     await adminPage.login(adminCredentials.email, adminCredentials.password);
   24 |     await adminPage.resetUserData(testUserData.email);
   25 |     await adminContext.close();
   26 |
   27 |     context = await browser.newContext();
   28 |     page = await context.newPage();
   29 |     chatbot = new ChatbotLoginPage(page);
   30 |     form = new FillPersonalInfopage(page);
   31 |     chatbotscreen = new chatbotPage(page);
>  32 |     test('TC_01: Login', async () => {
      |         ^ Error: Playwright Test did not expect test() to be called here.
   33 |       
   34 |     await chatbot.goto();
   35 |     await chatbot.login(chatbotCredentials.email, chatbotCredentials.password);
   36 |
   37 |     });    test('TC_01: Submit without required fields', async () => {
   38 |       await form.fillinvalidPersonalInfo(testUserData.name, testUserData.gender);
   39 |
   40 |     });
   41 |     test('TC_02: Submit with valid data', async () => {
   42 |       await form.fillPersonalInfo(testUserData.name, testUserData.gender);
   43 |
   44 |     });
   45 |   });
   46 |
   47 |
   48 |   test.afterAll(async () => {
   49 |     await context.close();
   50 |   });
   51 |
   52 |   test.describe('Chatbot Screen', () => {
   53 |     test('TC_03: Confirm chatbot screen elements', async () => {
   54 |       await chatbotscreen.verifyConfirmationElements();
   55 |     });
   56 |
   57 |     test('TC_04: Initial chatbot message', async () => {
   58 |       await chatbotscreen.InitialbotMessage();
   59 |     });
   60 |
   61 |     test('TC_05: Predefined buttons are not active', async () => {
   62 |       await chatbotscreen.PredefinebuttonNotActive();
   63 |     });
   64 |
   65 |     test('TC_06: Submit button is disabled', async () => {
   66 |       await chatbotscreen.SubmitbtnNotActive();
   67 |     });
   68 |
   69 |     test('TC_07: Submit button is enabled', async () => {
   70 |       await chatbotscreen.SubmitbtnActive();
   71 |     });
   72 |
   73 |     test('TC_08: Submit query', async ({}, testInfo) => {
   74 |       await chatbotscreen.SubmitQuery(testInfo);
   75 |     });
   76 |
   77 |
   78 |     test('TC_09: Scroll to bottom', async () => {
   79 |       await chatbotscreen.scrollToBottom();
   80 |     });
   81 |
   82 |     test('TC_10: Predefined buttons are active', async () => {
   83 |       await chatbotscreen.PredefinebuttonActive();
   84 |     });
   85 |
   86 |     test('TC_11: Like and Dislike buttons', async () => {
   87 |       await chatbotscreen.LikeBtn();
   88 |     });
   89 |
   90 |     test('TC_12: Dislike buttons', async () => {
   91 |      await chatbotscreen.DisLikeBtn();
   92 |     });
   93 |
   94 |     
   95 |     test('TC_13: Copy buttons', async () => {
   96 |       await chatbotscreen.DisLikeBtn();
   97 |      });
   98 |
   99 |      test('TC_11: Click on predefined button click', async ({}, testInfo) => {
  100 |       await chatbotscreen.PredefinedBtnClick(testInfo);
  101 |     });
  102 |
  103 |     test('TC_14: Reload hides old chat', async () => {
  104 |       await page.reload();
  105 |       await chatbotscreen.Pagereload();
  106 |       await chatbotscreen.InitialbotMessage();
  107 |     });
  108 |
  109 |     test('TC_15: Create new session using "edit" icon button', async () => {
  110 |       await chatbotscreen.NewsessionChatbotPage();
  111 |       await chatbotscreen.Pagereload();
  112 |       await chatbotscreen.InitialbotMessage();
  113 |     });
  114 |   });
  115 |
  116 |   test.describe('Hamburger Menu & History', () => {
  117 |     test('TC_16: Open Hamburger Menu', async () => {
  118 |       await chatbotscreen.OpenHamburgerMenu();
  119 |     });
  120 |
  121 |     test('TC_17: Load More button functionality', async () => {
  122 |       await chatbotscreen.LoadmoreBtn();
  123 |     });
  124 |
  125 |     test('TC_18: Search in chat history', async () => {
  126 |       await chatbotscreen.SearchHistory();
  127 |     });
  128 |
  129 |     test('TC_19: No result in chat history', async () => {
  130 |       await chatbotscreen.NoSearchHistory();
  131 |     });
  132 |
```