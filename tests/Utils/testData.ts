import { faker } from '@faker-js/faker';

// Randomly decide on male or female
const gender = faker.helpers.arrayElement(['male', 'female']);

// Generate name based on selected gender
const name = faker.person.firstName(gender);

export function generateRandomQuestion(): string {
  const questionTemplates = [
    `אתה יכול להסביר את השימוש של ${faker.science.chemicalElement().name}?`,
    `איך מבשלים ${faker.food.dish()}?`
  ];
  // Pick one randomly
  const randomIndex = Math.floor(Math.random() * questionTemplates.length);
  return questionTemplates[randomIndex];
}

// Map to Hebrew gender string for the chatbot
const chatbotGender = gender === 'male' ? 'בן' : 'בת';

export const testUserData = {
  email: 'qa@yopmail.com',
  name,
  gender: chatbotGender,
};
