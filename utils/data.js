const userNames = [
  'User1',
  'User2',
  'User3',
  'User4',
  'User5',
  // Add more user names here
];

const thoughtTexts = [
  'Thought 1',
  'Thought 2',
  'Thought 3',
  // Add more thought texts here
];

const reactionTexts = [
  'Reaction 1',
  'Reaction 2',
  'Reaction 3',
  // Add more reaction texts here
];

// Array of first names and last names
const firstNames = ['John', 'Jane', 'David', 'Emily', 'Michael', 'Olivia', 'William', 'Sophia', 'James', 'Ava', 'Robert', 'Mia', 'Richard', 'Emma', 'Joseph', 'Liam', 'Susan', 'Daniel', 'Charlotte', 'Matthew', 'Ella', 'Christopher', 'Grace', 'Andrew', 'Sophie', 'Elizabeth', 'Lucas', 'Anna', 'Benjamin', 'Oliver'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Lee', 'Wilson', 'Davis', 'Evans', 'Clark', 'Hall', 'Turner', 'Wright', 'Walker', 'Hill', 'Green', 'Carter', 'King', 'Scott', 'Morris', 'Baker', 'Adams', 'Cook', 'Hughes', 'Harrison', 'Cooper', 'Howard', 'Bell', 'Parker', 'Price', 'Mitchell', 'Peterson'];

// Function to shuffle an array randomly in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the arrays to ensure randomness
shuffleArray(firstNames);
shuffleArray(lastNames);

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () => ({
  username: getRandomItem(userNames),
  friends: [],
});

const getRandomThought = (userId) => ({
  thoughtText: getRandomItem(thoughtTexts),
  username: userId,
  reactions: [],
});

const getRandomReaction = (userId) => ({
  reactionText: getRandomItem(reactionTexts),
  username: userId,
});

module.exports = { getRandomUser, getRandomThought, getRandomReaction, firstNames, lastNames };
