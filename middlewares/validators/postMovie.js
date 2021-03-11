const { celebrate, Joi } = require('celebrate');

module.exports.postMovieInfoValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    // eslint-disable-next-line no-useless-escape
    image: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
    // eslint-disable-next-line no-useless-escape
    trailer: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
    // eslint-disable-next-line no-useless-escape
    thumbnail: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }).unknown(true),
});
