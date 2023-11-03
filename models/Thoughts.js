const { Schema, model } = require('mongoose');

// Schema to create Users model
const usersSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thought: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
        },
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
    }
);

module.exports = usersSchema;