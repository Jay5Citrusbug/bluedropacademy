import { Page, expect, Locator, FrameLocator } from '@playwright/test';
import {chatbotLocators } from '../Locators/Login_chatbotLocator';

export class ChatbotLoginPage {
  readonly page: Page;
  readonly frameLocator: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe[name="htmlComp-iframe"]');
  }

  async goto() {
    await this.page.goto('https://bluedropacademy.wixsite.com/website-1/chat6?rc=test-site');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('button', { name: chatbotLocators.loginWithEmailBtn.name }).click();
    await this.page.getByRole('textbox', { name: chatbotLocators.emailInput.name }).fill(email);
    await this.page.getByRole('textbox', { name: chatbotLocators.passwordInput.name }).fill(password);
    await this.page.getByRole('button', { name: chatbotLocators.submitLoginBtn.name }).click();
    await this.page.waitForURL(/.*chat6.*/);
  }

  async fillPersonalInfo(name: string, gender: string) {
    const textbox = this.frameLocator.getByRole('textbox', {
      name: chatbotLocators.userNameInput.name,
    });
    await textbox.click();
    await textbox.fill(name);
    await this.frameLocator.getByRole(chatbotLocators.genderRadio(gender).role as "radio", {
      name: chatbotLocators.genderRadio(gender).name,
    }).check();
    await this.frameLocator.getByRole('button', {
      name: chatbotLocators.startButton.name,
    }).click();
  }
}