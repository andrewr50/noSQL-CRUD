const express = require('express');
const db = require('./config/connection');

// Require model
const { User, Thought, } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------User--------------------------------------------

// Creates a new user
app.post('/users', (req, res) => {
  const newUser = 
    new User({ 
      username: req.body.username,
      email: req.body.email,
    });
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all user
app.get('/users', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds user by id
app.get('/users/:id', async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id })
      .populate('thoughts')
      .populate('friends');
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds user by id and updates
app.put('/users/:id', async (req, res) => {
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
});

// Finds user by id and deletes
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ name: req.params.id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

//------------Thoughts---------------------------------------------------

// Creates a new thought
app.post('/thoughts', (req, res) => {
  const newThought = 
    new Thought({ 
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
  newThought.save();
  if (newThought) {
    res.status(200).json(newThought);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all thoughts
app.get('/thoughts', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds document by id 
app.get('/thoughts/:id', async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params._id });
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds thought by id and deletes
app.delete('/thoughts/:id', async (req, res) => {
  try {
    const result = await Thought.findOneAndDelete({ name: req.params._id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

app.put('/thoughts:id', async (req, res) => {
  try {
    const result = await Thought
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
});

//---------------------------Reactions-------------------------------------------

// Creates a new reaction
app.post('/reactions', (req, res) => {
  const newReaction = new ({ 
    name: req.params.user 
  });
  newReaction.save();
  if (newReaction) {
    res.status(200).json(newReaction);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds matching id and deletes
app.delete('/reactions:id', async (req, res) => {
  try {
    const result = await Thought.findOneAndDelete({ name: req.params.reactions.reactionId});
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

//---------------------------------------------------------------------------------

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
