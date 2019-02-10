const constants = require('../constants');
const mongoose = require('mongoose');
const getYouTubeID = require('get-youtube-id');

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
  thumbnail: String
}, { timestamps: true });

mierdaSchema.virtual('youtubeId')
  .get(function () {
    return (this.publisher === 'YouTube') ? getYouTubeID(this.url) : undefined;
  });
mierdaSchema.virtual('vimeoId')
.get(function () {
  return (this.publisher === 'Vimeo') ? getYouTubeID(this.url) : undefined;
});

const Mierda = mongoose.model('Mierda', mierdaSchema);
module.exports = Mierda;
