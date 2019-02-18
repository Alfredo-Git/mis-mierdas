const passport = require('passport');
const mongoose = require('mongoose');
const axios = require('axios');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')
const getYouTubeID = require('get-youtube-id');
const getVideoId = require('get-video-id');
const resourcesService = require('../services/resource.service');

module.exports.list = (req, res, next) => {
  Mierda.find({ user: req.user.id } )
    .then(mierdas => {
      res.render('shits/list', { mierdas })
    })
    .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {
  let url = null;
  let name = null;
  if (req.method === 'POST') {
    url = req.body.url;
    name = req.body.name;
  } else {
    url = req.query.url;
    name = '';
  }
  resourcesService.get(url)
    .then(datos => {
      const mierda = new Mierda(datos);
      mierda.user = req.user.id;
      mierda.name = name;
      mierda.favorite = false;
      mierda.urlWeb = true;
      if (mierda.name === '') {
        mierda.name = mierda.title
      }
      if (mierda.url.match(/(youtube|vimeo|streamable)/i)) { mierda.urlVideo = true, mierda.urlWeb = false }
      return mierda.save()
         .then(mierda => res.redirect('/shits'))
    })
    .catch(error => next(error));
}

module.exports.favorite = (req, res, next) => {
  Mierda.findById(req.params.id, function(err, mierda) {
    mierda.favorite = !mierda.favorite;
    mierda.save()
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'Mierda not found'));
      } else {
        res.redirect('/shits');
      }
    })
    .catch(error => next(error));
  })
}

// module.exports.favorite = (req, res, next) => {
//   console.info('Se hace!')
//   Mierda.findById(req.params.id)
//     .then(mierda => {
//       console.info('MIERDON => ', mierda)
//       mierda.favorite = !mierda.favorite
//       mierda.save()
//     })
//     .catch(() => console.info('No encontramos cacota'))

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

module.exports.update = (req, res, next) => {
  Mierda.findByIdAndUpdate(req.params.id, {$set: { name: req.body.name}})
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'Mierda not found'));
      } else {
        res.redirect('/shits');
      }
    })
    .catch(error => next(error));
}

module.exports.doDelete = (req, res, next) => {
  Mierda.findByIdAndRemove(req.params.id)
    .then(mierda => {
      if (!mierda) {
        next(createError(404, `Mierda ${req.params.id} not found`));
      } else {
        res.redirect('/shits');
      }
    }).catch(error => next(error));
}

