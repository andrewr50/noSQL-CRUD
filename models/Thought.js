const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  thoughtText: { 
		type: String, 
		required: true,
    minLength: 1,
    maxLength: 280, 
		trim: true,  
	},
  createdAt: { 
		type: Date, 
		default: Date.now, 
		// date formatter
	},
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
