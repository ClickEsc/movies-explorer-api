require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/configs');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { badRequestErrorText, userConflictErrorText, authErrorText } = require('../utils/errorTexts');

// Запрос на создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({
    email,
  })
    .then((data) => {
      if (data) {
        throw new ConflictError(userConflictErrorText);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badRequestErrorText);
      } else {
        next(err);
      }
    });
};

// Контроллер аутентификации
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .catch(() => {
      throw new UnauthorizedError(authErrorText);
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
