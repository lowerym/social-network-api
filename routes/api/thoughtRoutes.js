const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtID')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtID/reactions')
.post(createReaction);

router.route('/:thoughtID/reactions/:reactionID')
.delete(deleteReaction);

module.exports = router;
