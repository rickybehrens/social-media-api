// Require Usres and Thoughts Models
const { Users, Thoughts } = require('../models');

module.exports = {
    // Get all Users
    async getUsers(req, res) {
        try {
            const users = await Users.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single User
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.username })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a single User
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a single User
    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.username },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this username' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a single User
    async deleteUser(req, res) {
        try {
            const user = await Users.findOneAndDelete({ _id: req.params.username });
            // Send a success response
            res.status(200).json({ message: 'User deleted successfully' });

            if (!user) {
                res.status(404).json({ message: 'No user with that username' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a single Friend
    async addFriend(req, res) {
        try {
            const { username, friendId } = req.params;
            const user = await Users.findOne({ _id: username });
            const friend = await Users.findOne({ _id: friendId });

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found' });
            }

            // Check if the user is trying to add themselves as a friend
            if (user._id.equals(friend._id)) {
                return res.status(400).json({ message: 'You cannot be friends with yourself' });
            }

            // Check if the friend is already in the user's friends list
            if (user.friends.includes(friend._id)) {
                return res.status(400).json({ message: 'Friend already added' });
            }

            user.friends.push(friend._id);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a single Friend
    async deleteFriend(req, res) {
        try {
            const { username, friendId } = req.params; // Change friendUsername to friendId
            const user = await Users.findOne({ _id: username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the friend is in the user's friends list
            const friend = await Users.findOne({ _id: friendId }); // Change to use friendId
            if (!friend) {
                return res.status(404).json({ message: 'Friend not found' });
            }

            if (!user.friends.includes(friendId)) { // Change to use friendId
                return res.status(400).json({ message: 'Friend not found in the user\'s friends list' });
            }

            user.friends = user.friends.filter((id) => !id.equals(friendId)); // Change to use friendId
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}