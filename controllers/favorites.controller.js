const passport = require('passport');
const mongoose = require('mongoose');
const Mierda = require('../models/mierda.model')
const User = require('../models/user.model')
const getYouTubeID = require('get-youtube-id');
const resourcesService = require('../services/resource.service');

module.exports.list = (req, res, next) => {
  Mierda.find({ user: req.user.id } )
    .then(mierdas => {
      res.render('favorites', { mierdas })
    })
    .catch(error => next(error))
}
