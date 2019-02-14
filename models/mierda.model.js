const constants = require('../constants');
const mongoose = require('mongoose');
// const getYouTubeID = require('get-youtube-id');
const getVideoId = require('get-video-id');

const mierdaSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
  },
  publisher: String,
  url: String,
  title: String,
  description: String,
  tags: [String],
  videos: [String],
  thumbnail: String,
  favorite: Boolean,
  urlVideo: Boolean,
  urlWeb: Boolean
}, { timestamps: true });

mierdaSchema.virtual('videoId')
  .get(function () {
    return getVideoId(this.url).id;
  });

const Mierda = mongoose.model('Mierda', mierdaSchema);
module.exports = Mierda;
