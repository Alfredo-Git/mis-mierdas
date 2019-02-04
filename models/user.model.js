const constants = require('../constants');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  social: {
    googleId: String
  },
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_USER],
    default: constants.ROLE_USER
  },
  mierdas: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Mierda' }]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;



