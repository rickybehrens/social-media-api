const connection = require('../config/connection');
const { Thoughts, Users } = require('../models');
const { getRandomUser, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => {
  console.error('Connection error:', err);
});

connection.once('open', async () => {
  console.log('Connected to the database.');

  // Delete the collections if they exist
  await Promise.all([Thoughts.collection.drop(), Users.collection.drop()]);

  const users = Array.from({ length: 20 }, getRandomUser);

  // Add users to the collection and await the results
  const createdUsers = await Users.create(users);

  // Create Thoughts for each user
  for (const user of createdUsers) {
    const thoughts = Array.from({ length: 3 }, () => getRandomThought(user._id));
    user.thoughts = thoughts.map((thought) => thought._id);

    // Create Reactions for each Thought from the user's friends
    for (const friendId of user.friends) {
      for (const thought of thoughts) {
        thought.reactions.push(getRandomReaction(friendId));
      }
    }
  }

  // Save the users and Thoughts with updated associations
  await Promise.all(createdUsers.map((user) => user.save()));
  const createdThoughts = await Thoughts.create(
    createdUsers.reduce((acc, user) => acc.concat(user.thoughts), [])
  );

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
