const Joi = require('joi');

const userRegisterValidation = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().min(5).required()
});

module.exports = userRegisterValidation;