const router = require('express').Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userID')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userID/friends/:friendID')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
