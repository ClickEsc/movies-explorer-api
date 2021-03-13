const { celebrate, Joi } = require('celebrate');

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});
