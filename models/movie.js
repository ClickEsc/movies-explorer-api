const mongoose = require('mongoose');

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
    type: String,
    required: true,
    validate: {
      validator(url) {
        // eslint-disable-next-line no-useless-escape
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i;
        return regex.test(url);
      },
      message: 'Введите URL.',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        // eslint-disable-next-line no-useless-escape
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i;
        return regex.test(url);
      },
      message: 'Введите URL.',
    },
  },
  // Миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        // eslint-disable-next-line no-useless-escape
        const regex = /https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i;
        return regex.test(url);
      },
      message: 'Введите URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
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