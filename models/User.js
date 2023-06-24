const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
		type: String, 
    required: true, 
		unique: true, 
		trim: true,  
	},
  email: { 
		type: String, 
		required:true, 
		unique:true, 
		// validate: {
		// 	validator: function(v) {
		// 		return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);
		// 	},
		// 	message: props => `${props.value} is not a valid email address!`
		// },
	},
	thoughts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }
  ],
  friends:  [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
