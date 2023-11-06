const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:username/friends/:username
router.route('/:username/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
