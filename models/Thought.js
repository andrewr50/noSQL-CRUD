const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { 
		type: String, 
		unique: true, 
		required: true, 
		trim: true,  
	},
  createdAt: { 
		type: Date, 
		default:Date(), 
		unique:true, 
	},
  username: {
    type: String,
    required: true,
  },
  reactions: [{
    reactionId: {
      type: ObjectId,
      default: new ObjectId,
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
  }],
});

function getDate() {

}

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
