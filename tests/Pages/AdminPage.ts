import { Page, expect } from "@playwright/test";
import { adminPageLocators } from "../Locators/AdminpageLocator";
require('dotenv').config();


export class AdminPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the admin login page
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

        console.log("Filling in email input...");
        await this.page
            .getByRole("textbox", { name: adminPageLocators.emailInput.name })
            .fill(email);

        console.log("Filling in password input...");
        await this.page
            .getByRole("textbox", { name: adminPageLocators.passwordInput.name })
            .fill(password);

        console.log("Clicking on Sign In button...");
        await this.page.getByRole("button", { name: adminPageLocators.signInButton.name }).click();

        console.log("Login submitted, waiting for dashboard to load...");
    }

    // Reset user data for a specific user email
async resetUserData(userEmail: string) {
    const timeoutLimit = 30000;

    console.log(`Starting reset process for user: ${userEmail}`);

    try {
        console.log("Clicking on User Data tab...");
        await this.page.getByText(adminPageLocators.userDataTab.text).click();

        console.log(`Searching for user with email: ${userEmail}`);
        await this.page
            .getByRole("searchbox", { name: adminPageLocators.searchBox.name })
            .fill(userEmail);
        await this.page.waitForTimeout(3000);

        console.log("Scrolling horizontally to bring Reset button into view...");
        const scrollableTable = this.page.locator('.ant-table-scroll-horizontal');
        await scrollableTable.click();

        for (let i = 0; i < 10; i++) {
            await this.page.keyboard.press('ArrowRight');
            await this.page.waitForTimeout(100);
        }

        console.log("Checking Reset button...");
        const resetBtn = this.page.getByText("Reset", { exact: true });

        if (await resetBtn.count() > 0 && await resetBtn.isEnabled()) {
            console.log("Reset button found & enabled — clicking...");
            await resetBtn.click();

            console.log("Confirming the reset...");
            await this.page.getByRole("button", { name: "Yes" }).click();

            console.log("Waiting for success message...");
            await expect(
                this.page.locator("div")
                    .filter({ hasText: adminPageLocators.successMessage.text })
                    .nth(3)
            ).toBeVisible();

            console.log("Reset confirmation message is visible.");
            console.log(`✅ Reset process completed for user: ${userEmail}`);
        } else {
            console.log("Reset button not found or disabled — skipping click.");
        }

        await this.page.close(); // ensure page always closes

    } catch (error) {
        console.error(`❌ Error during resetUserData: ${error}`);
        console.error(
            `Test failed due to timeout after ${timeoutLimit} ms`
        );
        throw error;
    }
}
}
    function timeout(arg0: number) {
    throw new Error("Function not implemented.");
}
