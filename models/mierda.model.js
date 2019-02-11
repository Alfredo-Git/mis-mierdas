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
    required: true
  },
  publisher: String,
  url: String,
  title: String,
  description: String,
  tags: [String],
  videos: [String],
  thumbnail: String,
  type: String,
  video: Boolean,
  web: Boolean,
  youtube: Boolean,
  vimeo: Boolean,
  videopress: Boolean,
}, { timestamps: true });

mierdaSchema.virtual('youtubeId')
  .get(function () {
    return (this.publisher === 'YouTube') ? getVideoId(this.url).id : undefined;
  });
mierdaSchema.virtual('vimeoId')
.get(function () {
  return (this.publisher === 'Vimeo') ? getVideoId(this.url).id : undefined;
});
mierdaSchema.virtual('videoPressId')
.get(function () {
  return (this.publisher === 'videoPress') ? getVideoId(this.url).id : undefined;
});

const Mierda = mongoose.model('Mierda', mierdaSchema);
module.exports = Mierda;
