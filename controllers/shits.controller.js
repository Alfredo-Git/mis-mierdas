const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')
const getYouTubeID = require('get-youtube-id');
const resourcesService = require('../services/resource.service');

module.exports.list = (req, res, next) => {
  Mierda.find({ user: res.user.id } )
    .then(mierdas => res.render('shits/list', {mierdas}))
    .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {
  const { url, name } = req.body;
  resourcesService.get(url)
    .then(data => {
      const shit = new Mierda(data);
      // TODO: feed shit
      //return shit.save().then(...);
    })
    .catch(error => next(error));
}

/**
 * 
module.exports.doCreate = (req, res, next) => {
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
 */

module.exports.doDelete = (req, res, next) => {
  Mierda.findByIdAndRemove(req.params.id)
    .then(mierda => {
      if (!mierda) {
        next(createError(404, `Mierda ${req.params.id} not found`));
      } else {
        res.redirect('/user/mis-mierdas');
      }
    }).catch(error => next(error));
}



