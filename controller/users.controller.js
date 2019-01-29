const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('users/register')
};
module.exports.doCreate = (req, res, next) => {

};