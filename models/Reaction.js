const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  reactionId: { 
		type: ObjectId, 
		default: new ObjectId,  
	},
  reactionBody: { 
		type: String,
		required: true,

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

const handleError = (err) => console.error(err);

module.exports = Genre;
