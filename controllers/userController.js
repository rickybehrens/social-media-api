// Require Usres and Thoughts Models
const { Users, Thoughts } = require('../models');

module.exports = {
    // Get all Users
    async getUsers (req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single User
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.usedname })
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

            if (!user) {
                res.status(404).json({ message: 'No user with that username' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a single Friend

    // Delete a single Friend
}