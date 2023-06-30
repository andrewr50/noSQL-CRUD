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
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Finds all users
  async getUsers(req, res) {
    try {
      const result = await User.find({});
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Finds user by id
  async getOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
        .populate('thoughts') // Populate the thoughts array with created Thoughts
        .populate('friends'); // Populate the friends array with friend ObjectId's
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Finds user by id and updates
  async updateUser(req, res) {
    try {
      const result = await User
        .findOneAndUpdate(
          { _id: req.params.userId }, // Finds doc with id
          {
            $set: req.body,
          }, // Updates email
          { new: true } // Returns updated document
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Finds user by id and deletes
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Add to User's friend list by User id
  async addFriend(req, res) {
    try {
      const result = 
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }, // Returns updated document
        );
      
      res.status(200).json(result);
      
      if (!result) {
        return res.status(404).json({ message: 'No user with that Id' })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Delete from User's friends list by id
  async deleteFriend (req, res) {
    try {
      const result = 
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }, // Returns updated document
        );

      res.status(200).json();

      if (!result) {
        return res.status(404).json({ message: 'No user with that Id' })
      }

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

module.exports = userController;
