import { faker } from '@faker-js/faker';

// Randomly decide on male or female
const gender = faker.helpers.arrayElement(['male', 'female']);

// Generate name based on selected gender
const name = faker.person.firstName(gender);

// Map to Hebrew gender string for the chatbot
const chatbotGender = gender === 'male' ? 'בן' : 'בת';

export const testUserData = {
  email: 'qa@yopmail.com',
  name,
  gender: chatbotGender,
};
