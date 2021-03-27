const { celebrate, Joi } = require('celebrate');

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
