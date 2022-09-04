const Joi = require('joi');

const assignShiftValidator = Joi.object({
    shiftId: Joi.string().hex().length(24),
    shiftDate: Joi.date().required(),
    shiftName: Joi.string().min(1).required(),
    startTime: Joi.string().min(5).required(),
    endTime: Joi.string().min(5).required(),
    duration: Joi.number(),
    assignedUsers: Joi.array()
    .items({
        _id: Joi.string().hex().length(24),
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().lowercase().required(),
        phoneNumber: Joi.string().min(5).required(),
        createdDate: Joi.date().required(),
        updatedBy: Joi.string().hex().length(24)
    })
});

module.exports = assignShiftValidator;