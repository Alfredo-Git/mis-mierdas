const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  res.render('users/register')
};
module.exports.doCreate = (req, res, next) => {

};