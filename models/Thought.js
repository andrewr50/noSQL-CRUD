const mongoose = require('mongoose');

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
		unique:true, 
	},
  username: {
    type: String,
    required: true,
  },
  reactions: 
    [reactionSchema],
});

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date(),  
  },
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
