const Joi = require('joi');

const userRegisterValidation = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

module.exports = userRegisterValidation;