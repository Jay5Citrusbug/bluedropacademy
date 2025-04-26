export const chatbotLocators = {
    loginWithEmailBtn: { name: 'התחברות עם כתובת מייל' },
    emailInput: {  name: 'כתובת מייל' },
    passwordInput: {  name: 'סיסמה' },
    submitLoginBtn: { name: 'התחברות' },
    userNameInput: { name: 'איך קוראים לך? כך אוכל לפנות אליך בשמך ולדבר איתך באופן אישי!' },
    genderRadio: (gender: string) => ({ role: 'radio', name: gender }),
    startButton: {name: 'בואו נתחיל' },
    iframeName: 'iframe[name="htmlComp-iframe"]',
  };
  