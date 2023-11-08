// Require Thoughts and Users Models
const { Thoughts, Users } = require('../models');

module.exports = {
    // Get all Thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single Thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No thought with that ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a single Thought
    async createThought(req, res) {
        console.log(req.body);

        try {
            const thought = await Thoughts.create(req.body);
            console.log(thought);
            const userData = await Users.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true }
            )
            console.log(userData);
            res.json(userData);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a single Thought
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a single Thought
    async deleteThought(req, res) {
        try {
            // First, find and delete the thought
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            // Then, remove the thoughtId from the user's thoughts array
            const userData = await Users.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: thought._id } }, // Use $pull to remove the thoughtId from the array
                { runValidators: true, new: true }
            );

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            
            // Send a success response
            res.status(200).json({ message: 'Thought deleted successfully' });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a Reaction
    async createReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const thought = await Thoughts.findOneAndUpdate(
                { _id: thoughtId },
                {
                    $push: {
                        reactions: req.body // Assuming the request body contains reaction data
                    }
                },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a Reaction
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;
            const thought = await Thoughts.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
