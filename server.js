const express = require('express');
const db = require('./config/connection');

// Require model
const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------User--------------------------------------------

// Creates a new user
app.post('/new-user', (req, res) => {
  const newUser = new User({ name: req.params.user });
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all user
app.get('/all-users', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Find first document with name equal to "Kids"
app.get('/user/:id', async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params._id });
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds first document that matches and deletes
app.delete('/delete/:user', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ name: req.params._id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

app.put('/update/:user', async (req, res) => {
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

//------------Thoughts---------------------------------------------------

// Creates a new document
app.post('/new-user', (req, res) => {
  const newUser = new User({ name: req.params.user });
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all documents
app.get('/all-users', async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Find first document with name equal to "Kids"
app.get('/user/:id', async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params._id });
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds first document that matches and deletes
app.delete('/delete/:user', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ name: req.params._id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

app.put('/update/:user', async (req, res) => {
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

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
