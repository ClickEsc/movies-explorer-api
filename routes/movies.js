const router = require('express').Router();
const { postMovieInfoValidator } = require('../middlewares/validators/postMovie');
const { movieIdValidator } = require('../middlewares/validators/movieId');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

// Запрос списка фильмов
router.get('/movies', getMovies);

// Запрос на создание фильма
router.post('/movies', postMovieInfoValidator, addMovie);

// Запрос на удаление фильма
router.delete('/movies/:id', movieIdValidator, deleteMovie);

module.exports = router;
