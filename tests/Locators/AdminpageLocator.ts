export const adminPageLocators = {
    emailInput: { name: '* Email' },
    passwordInput: { name: '* Password' },
    signInButton: { name: 'Sign In' },
    userDataTab: { text: 'User Data' },
    searchBox: { name: 'Search by Email' },
    resetButton: { xpath: '//*[@id="root"]/div/div[2]/div/div/main/div[3]/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[8]/div/button[1]' },
    PlanUsagevalue: {xpath: 'xpath=//*[@id="root"]/div/div[2]/div/div/main/div[3]/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[4][text()="0"]'},
    successMessage: { text: 'User data reset successfully' },
    };  