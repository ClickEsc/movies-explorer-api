const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// Запрос списка фильмов
router.get('/movies', getMovies);

// Запрос на создание фильма
router.post('/movies', createMovie);

// Запрос на удаление фильма
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
