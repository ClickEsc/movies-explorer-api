const router = require('express').Router();
const { userInfoValidator } = require('../middlewares/validators/userInfo');
const { getCurrentUser, updateProfileInfo } = require('../controllers/users');

// Запрос информации о текущем пользователе
router.get('/users/me', getCurrentUser);

// Запрос на обновление информации в профиле
router.patch('/users/me', userInfoValidator, updateProfileInfo);

module.exports = router;
