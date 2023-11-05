const mongoose = require('mongoose');
const connection = require('../config/connection');
const Thoughts = require('../models/Thoughts');
const Users = require('../models/Users');
const { getRandomUser, getRandomThought, getRandomReaction } = require('./data');

// Import shuffled first names and last names
const { firstNames, lastNames } = require('./data');

// Function to generate random first name and last name
function generateUserData(firstName, lastName) {
  const username = `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`;
  const email = `${username}@user.com`;
  return { firstName, lastName, email, username };
}

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

    // Create 8 users with random data
    for (let i = 0; i < 8; i++) {
      const firstName = firstNames[i];
      const lastName = lastNames[i];
      const userData = generateUserData(firstName, lastName);
      const user = new Users({ ...getRandomUser(), ...userData });
      await user.save();
      users.push(user);
    }

    // Create friendships (each user has exactly 4 friends)
    for (let i = 0; i < users.length; i++) {
      for (let j = 1; j <= 4; j++) {
        const friendIndex = (i + j) % users.length;
        users[i].friends.push(users[friendIndex]);
        await users[i].save();
      }
    }

    console.log(users);

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
