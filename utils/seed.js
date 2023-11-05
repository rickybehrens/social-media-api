const mongoose = require('mongoose');
const connection = require('../config/connection');
const Thoughts = require('../models/Thoughts'); // Import your Thoughts model
const Users = require('../models/Users'); // Import your Users model
const { getRandomUser, getRandomThought, getRandomReaction } = require('./data');

connection.on('error', (err) => {
  console.error(err);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Remove any existing data
    await Thoughts.deleteMany({});
    await Users.deleteMany({});

    // Create an array to hold user documents
    const users = [];

    // Create users and their thoughts
    for (let i = 0; i < 20; i++) {
      const user = new Users(getRandomUser());
      await user.save();

      for (let j = 0; j < 3; j++) {
        const thought = new Thoughts(getRandomThought(user.username));
        await thought.save();
        user.thoughts.push(thought);
      }

      users.push(user);
    }

    // Create friendships (each user becomes friends with the next user in the array)
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        users[i].friends.push(users[j]);
        users[j].friends.push(users[i]);
        await users[i].save();
        await users[j].save();
      }
    }

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
