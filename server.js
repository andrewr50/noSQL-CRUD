const express = require('express');
const db = require('./config/connection');
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    console.log('Something went wrong');
    res.status(500).json({ message: 'Something went wrong' });
  }
});

//---------------------------------------------------------------------------------

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
