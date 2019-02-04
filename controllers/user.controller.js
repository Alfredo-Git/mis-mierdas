const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
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
  console.log(req.body)
  const mierda = new Mierda(req.body);

  mierda.save()
    .then(post => res.redirect('/user/mis-mierdas'))
    .catch(error => next(error))
  
}



