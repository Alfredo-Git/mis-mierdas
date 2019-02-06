const constants = require('../constants');
const mongoose = require('mongoose');
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;
const User = require('./user.model');

const mierdaSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  video: {
    type: Boolean
  },
  web: {
    type: Boolean
  }  
}, { timestamps: true });


const Mierda = mongoose.model('Mierda', mierdaSchema);
module.exports = Mierda;