const { celebrate, Joi } = require('celebrate');

module.exports.signupInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
    }),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});
