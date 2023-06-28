const router = require('express').Router();
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

// api/Users   get all Users
router.route('/').get(getUsers).post(createUser);

// api/Users/:id         get User by id   update by id        delete by id
router.route('/:UserId').get(getOneUser).put(updateUser).delete(deleteUser)

module.exports = router;