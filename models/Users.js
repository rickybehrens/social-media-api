const { Schema, model } = require('mongoose');

// Schema to create Users model
const usersSchema = new Schema(
    {
        firstName: {
            type: String,
            require: true,
            max_length: 20,
        },
        lastName: {
            type: String,
            require: true,
            max_length: 20,
        },
        username: {
            type: String,
            require: true,
            max_length: 50,
        },
        email: {
            type: String,
            require: true,
            max_length: 50,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// get total count of friends
usersSchema
.virtual('friendCount')
// Getter
.get(function() {
    return this.friends.length;
})
// Setter to set the first and last name
.set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const Users = model('Users', usersSchema);

// Export Users module
module.exports = Users;