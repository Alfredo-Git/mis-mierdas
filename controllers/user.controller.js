const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          User.find()
          res.redirect('/user/mis-mierdas')
        }
      });
    }
  })(req, res, next);
}

module.exports.profile = (req, res, next) => {
  Mierda.find()
    .then(mierdas => res.render('user/mis-mierdas', {mierdas}))
    .catch(error => next(error))
}

module.exports.createMierda = (req, res, next) => {
  const mierda = new Mierda(req.body);
  mierda.save()
    .then(post => res.redirect('/user/mis-mierdas'))
    .catch(error => next(error))
}

module.exports.deleteMierda = (req, res, next) => {
  Mierda.findByIdAndRemove(req.params.id)
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/user/mis-mierdas');
      }
    })
    .catch(error => next(error));
}



