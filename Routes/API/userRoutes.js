const router = require('express').Router();
const {
  createUser,
  getThoughts,
  getOneThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/userController');

// api/thoughts   get all thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:id         get thought by id   update by id        delete by id
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

// api/thoughts/:id                   create reaction
router.route('/thoughtId/reactions').post(createReaction);

// api/thoughts/thoughtId/reactions/:reactionId
router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;