const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')
const getYouTubeID = require('get-youtube-id');

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

module.exports.logout = (function(req, res) {
  req.session.destroy(function(e){
      req.logout();
      res.redirect('/');
  });
});

module.exports.profile = (req, res, next) => {
  Mierda.find( { user: res.locals.session } )
    .then(mierdas => res.render('user/mis-mierdas', {mierdas}))
    .catch(error => next(error))
}

module.exports.createMierda = (req, res, next) => {
  const datos = req.body
  const youtubeID = getYouTubeID(datos.url)
  datos.user = res.locals.session
  datos.type = 'web'
  datos.web = true
  if (datos.name === '') {
    datos.name = 'mierdón'
  }
  if (datos.url.match(/(youtube|vimeo|streamable)/i) ||
      datos.url.match(/.mp4$/i)) { datos.type = 'video', datos.video = true, datos.web = false }
  if (datos.url.match(/(youtube)/i) ) {datos.youtubeID = youtubeID}
      

  const mierda = new Mierda(datos);
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



