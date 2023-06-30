const router = require('express').Router();
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// api/users   get all Users
router.route('/').get(getUsers).post(createUser);

// api/users/            get User by id    update by id        delete by id
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

// api/users/  update user friends array
router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend)

module.exports = router;