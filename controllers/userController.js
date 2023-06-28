const { User } = require('../models')

const userController = {
  // Creates a new user
  createUser(req, res) {
    const newUser = 
      new User({ 
        username: req.body.username,
        email: req.body.email,
      });
    newUser.save();
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds all users
  async getUsers(req, res) {
    try {
      // Using model in route to find all documents that are instances of that model
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  // Finds user by id
  async getOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
        .populate('thoughts') // Populate the thoughts array with created Thoughts
        .populate('friends'); // Populate the friends array with friend ObjectId's
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  // Finds user by id and updates
  async updateUser(req, res) {
    try {
      const result = await User
        .findOneAndUpdate(
          { name: req.params._id }, // Finds doc with id
          { name: req.params.name }, // Updates name
          { email: req.params.email}, // Updates email
          { new: true } // Returns updated document
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  // Finds user by id and deletes
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  // Add to User's friend list by User id
  async addFriend(req, res) {
    try {
      const result = 
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: {friends: req.params.friendId}},
          { new: true }, // Returns updated document
        );

      if (!result) {
        return res.status(404).json({ message: 'No user with that Id' })
      }
    } catch (error) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Delete from User's friends list by id
  deleteFriend (req, res) {
    try {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.params.friendId}},
        { new: true }, // Returns updated document
      );

      if (!result) {
        return res.status(404).json({ message: 'No user with that Id' })
      }

    } catch (error) {
          console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

module.exports = userController;
