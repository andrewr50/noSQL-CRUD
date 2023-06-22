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
      // maximum character count
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

const handleError = (err) => console.error(err);

module.exports = Thought;
