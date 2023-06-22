const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
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
		
	}
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
