import { faker } from '@faker-js/faker';

// Randomly decide on male or female
const gender = faker.helpers.arrayElement(['male', 'female']);

// Generate name based on selected gender
const name = faker.person.firstName(gender);

export function generateRandomQuestion(): string {
  const questionTemplates = [
    `תסביר לי בפרטים על ${faker.science.chemicalElement().name}.`,
    `איך להכין ${faker.food.dish()}? תסביר לי בפרטים, שלב אחר שלב מההתחלה ועד הסוף.`
  ];

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
