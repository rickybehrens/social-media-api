const { Schema, Types, model } = require('mongoose');
const mongoose = require('mongoose');

// ReactionsSchema
const reactionsSchema = new mongoose.Schema(
    {
        // Set custom ID 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
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