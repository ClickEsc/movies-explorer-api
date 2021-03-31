const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  badRequestErrorText, movieNotFoundErrorText, movieDeleteOkText, movieDeleteErrorText,
} = require('../utils/errorTexts');

// Запрос списка сохраненных фильмов
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// Запрос на добавление фильма в сохраненные
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    image,
    nameRU,
    nameEN,
    thumbnail,
    id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badRequestErrorText);
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Запрос на удаление фильма из сохраненных по идентификатору
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .catch(() => {
      throw new NotFoundError(movieNotFoundErrorText);
    })
    .then((data) => {
      if (!data) {
        throw new NotFoundError(movieNotFoundErrorText);
      }
      if (req.user._id === data.owner.toString()) {
        Movie.deleteOne({ _id: data._id })
          .then(() => {
            res.send({ message: movieDeleteOkText });
          })
          .catch(next);
      } else {
        throw new ForbiddenError(movieDeleteErrorText);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(movieNotFoundErrorText);
      } else {
        next(err);
      }
    })
    .catch(next);
};
