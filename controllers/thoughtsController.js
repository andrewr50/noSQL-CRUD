const { User, Thought } = require('../models');

const thoughtController = {
  // Creates a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      //Update the thoughts array of the User that created the Thought to link them
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id }},
        { new: true }, // Returns updated document
      )
      
      if (!userData) {
        return res.status(404).json({message: "User not found"})
      }

      if (newThought) {
        res.status(200).json(newThought);
      }
    } catch {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds all thoughts
  async getThoughts(req, res) {
    try {
      const result = await Thought.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds Thought by id 
  async getOneThought(req, res) {
    try {
      const result = await Thought.findOne({ _id: req.params.thoughtId });

      if (!result) {
        return res.status(404).json({message: 'No Thought with this id'});
      }
      res.status(200).json(result);
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds thought by id and deletes
  async deleteThought(req, res) {
    try {
      const result = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.status(200).json(result);

      if (!result) {
        res.status(404).json({ message: 'No Thought with this id'})
      } else {
      console.log(`Deleted: ${result}`);
      }
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds Thought by id and updates
  async updateThought(req, res) {
    try {
      const result = await Thought
        .findOneAndUpdate(
          { _id: req.params.thoughtId }, // Finds Thought by id
          { thoughtText: req.body.name }, // Updates thoughtText
          { new: true } // Returns updated document
        );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  //-------------------------------Reactions-------------------------------//

  // Creates a new reaction
  async createReaction (req, res) {
    try{
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true },
        );
      newReaction.save();

      if (!thoughtData) {
        return res.status(404).json({ message: 'No Thought with this id' });
      }
      res.status(200).json(thoughtData);
    } catch {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

  // Finds matching id and deletes
  async deleteReaction(req, res) {
    try {
      const result = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true },
        );
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

module.exports = thoughtController;
