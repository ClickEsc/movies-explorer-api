const router = require('express').Router();
const { postMovieInfoValidator } = require('../middlewares/validators/postMovie');
const { movieIdValidator } = require('../middlewares/validators/movieId');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// Запрос списка фильмов
router.get('/movies', getMovies);

// Запрос на создание фильма
router.post('/movies', postMovieInfoValidator, createMovie);

// Запрос на удаление фильма
router.delete('/movies/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
