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
  
  module.exports = { getRandomUser, getRandomThought, getRandomReaction };
  