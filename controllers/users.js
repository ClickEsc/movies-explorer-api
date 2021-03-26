const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  userNotFoundErrorText, badRequestErrorText,
} = require('../utils/errorTexts');

// Запрос информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorText);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userNotFoundErrorText);
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Запрос на обновление информации в профиле
module.exports.updateProfileInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorText);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userNotFoundErrorText);
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError(badRequestErrorText);
      } else {
        next(err);
      }
    })
    .catch(next);
};
