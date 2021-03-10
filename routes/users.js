const router = require('express').Router();
const { getCurrentUser, updateProfileInfo } = require('../controllers/users');

// Запрос информации о текущем пользователе
router.get('/users/me', getCurrentUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', updateProfileInfo);

module.exports = router;
