const Joi = require('joi');

const saveShiftValidation = Joi.object({
    shiftName: Joi.string().min(1).required(),
    department: Joi.string().valid('Transport','HR','IT','Manufacturing').required(),
    startTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).min(5).required(),
    endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).min(5).required(),
    duration: Joi.number(),
});

module.exports = saveShiftValidation;
