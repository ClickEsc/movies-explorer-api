const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

// Запрос списка фильмов
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Запрос на создание фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

// Запрос на удаление фильма по идентификатору
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .catch(() => {
      throw new NotFoundError('Нет фильма с таким id');
    })
    .then((data) => {
      if (req.user._id === data.owner.toString()) {
        Movie.findByIdAndRemove({ _id: data._id })
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удален' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять фильмы, добавленные в базу другими пользователями');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Нет фильма с таким id');
      } else {
        next(err);
      }
    });
};
