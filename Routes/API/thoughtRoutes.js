const router = require('express').Router();
const {
  createThought,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:id
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

// api/thoughts/:id
router.route('/thoughtId/reactions').post(createReaction);

// api/thoughts/thoughtId/reactions/:reactionId
router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;