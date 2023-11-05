const { Schema, Types, model } = require('mongoose');
const mongoose = require('mongoose');

// ReactionsSchema
const reactionsSchema = new mongoose.Schema(
    {
        // Set custom ID 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId()
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 50
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Schema to create Thoughts model
const thoughtsSchema = new mongoose.Schema({
    thoughtId: {
        type: Types.ObjectId, // Use Schema directly
        default: () => new Types.ObjectId(),
    },
    thoughtText: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 4,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});


// get total count of reactions
thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thoughts = mongoose.model('Thoughts', thoughtsSchema);


module.exports = Thoughts;