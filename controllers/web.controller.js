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
          res.redirect('/webs')
        }
      });
    }
  })(req, res, next);
}

module.exports.getMierdaWeb = (req, res, next) => {
  Mierda.find( { user: res.locals.session } )
    .then(mierdas => res.render('webs', {mierdas}))
    .catch(error => next(error))
}

module.exports.createMierdaWeb = (req, res, next) => {
  const datos = req.body
  datos.user = res.locals.session
  datos.type = 'web'
  datos.web = true 
  if (datos.name === '') {
    datos.name = 'mierdón'
  }

  const mierda = new Mierda(datos);
  mierda.save()
    .then(post => res.redirect('/web'))
    .catch(error => next(error))
}

module.exports.deleteMierdaWeb = (req, res, next) => {
  Mierda.findByIdAndRemove(req.params.id)
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/web');
      }
    })
    .catch(error => next(error));
}



