const router = require('express').Router();

const {
    getThoughts,
    getSIngleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/thoughtId
router
.route('/:thoughtId')
.get(getSIngleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;
