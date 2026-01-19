import { faker } from '@faker-js/faker';

// Randomly decide on male or female
const gender = faker.helpers.arrayElement(['male', 'female']);

// Generate name based on selected gender
const name = faker.person.firstName(gender);


export function generateRandomQuestion(): string {
  const chemical = faker.science.chemicalElement().name;
  const dish = faker.food.dish();
  const techTopic = faker.hacker.noun();
  const country = faker.location.country();

  const questionTemplates = [
    `
    תסביר לי בפרטים על ${chemical}.
    בנוסף:
    1. איפה משתמשים בו בעולם האמיתי?
    2. מהם היתרונות, החסרונות והסיכונים?
    
    אנא תן תשובה ארוכה, מפורטת וברורה למתחילים.
    `,

    `
    איך להכין ${dish}?
    בנוסף:
    1. טעויות נפוצות בהכנה
    2. שדרוגים וגרסה בריאה יותר
    
    תסביר שלב אחר שלב עם טיפים.
    `,

    `
    תסביר מה זה ${techTopic} בטכנולוגיה.
    בנוסף:
    1. איך זה עובד?
    2. השוואה לפתרונות דומים
    
    תשובה ארוכה עם דוגמאות.
    `,

    `
    ספר לי בהרחבה על ${country}.
    בנוסף:
    1. תרבות והיסטוריה
    2. אתגרים כלכליים וחברתיים
    
    סקירה מפורטת עם כותרות.
    `
  ];

  return faker.helpers.arrayElement(questionTemplates).trim();
}

// Map to Hebrew gender string for the chatbot
const chatbotGender = gender === 'male' ? 'זכר 👨' : 'נקבה 👩';

export const testUserData = {
  email: 'paras.citrusbug@gmail.com',
  name,
  gender: chatbotGender,
};
