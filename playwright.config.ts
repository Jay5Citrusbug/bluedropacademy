import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({


  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 60000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
 // retries: 1, // retry once before marking as failed

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [
  //   ['list'],
  //   ['allure-playwright']
  // ],
  // // 
  reporter:[
   ['html',{outputFolder: 'playwright-report' }],
   ['allure-playwright'],
   ['list'],


  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   //globalSetup: require.resolve('./globalsetup.ts'), // Path to your global setup file

  use: {
  //  storageState: 'storageState.json', // This applies to all tests
    screenshot: 'only-on-failure', // Automatically take screenshot on test failure


    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/tests/!(No_Activity).spec.ts'], // all tests except inactivity

    },

    {
      name: 'long-wait',
      timeout: 700_000, // 10+ minutes
      testMatch: ['**/tests/No_Activity.spec.ts'], // only the inactivity test
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
