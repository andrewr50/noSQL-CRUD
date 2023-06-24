const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { 
		type: String, 
		unique: true, 
		required: true,
    minLength: 1,
    maxLength: 280, 
		trim: true,  
	},
  createdAt: { 
		type: Date, 
		default: Date.now, 
		
	},
  username: {
    type: String,
    required: true,
  },
  reactions: 
    [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
