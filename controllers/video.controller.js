const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')
const getYouTubeID = require('get-youtube-id');
const resourcesService = require('../services/resource.service');

module.exports.list = (req, res, next) => {
  Mierda.find({ user: req.user.id } )
    .then(mierdas => {
      res.render('videos', { mierdas })
    })
    .catch(error => next(error))
}

module.exports.favorite = (req, res, next) => {
  Mierda.findById(req.params.id, function(err, mierda) {
    mierda.favorite = !mierda.favorite;
    mierda.save()
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'Mierda not found'));
      } else {
        res.redirect('/videos');
      }
    })
    .catch(error => next(error));
  })
}

module.exports.update = (req, res, next) => {
  Mierda.findByIdAndUpdate(req.params.id, {$set: { name: req.body.name}})
    .then(mierda => {
      if (!mierda) {
        next(createError(404, 'Mierda not found'));
      } else {
        res.redirect('/videos');
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
        res.redirect('/videos');
      }
    }).catch(error => next(error));
}
