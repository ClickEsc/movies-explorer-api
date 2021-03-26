const mongoose = require('mongoose');
const { badUrlErrorText } = require('../utils/errorTexts');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
        message: badUrlErrorText,
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: badUrlErrorText,
    },
  },
  // Миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: badUrlErrorText,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
