const express = require('express');
const shiftRouter = express.Router();
const Validator = require('../middleware/validator');
const { isAuthenticated, isAuthenticatedAndAdmin } = require('../middleware/auth');

const { assignShiftToUser, getAllUsersShifts, userShiftFromTo, usersInSelectedShift, removeUserFromShift } = require('../controller/userShiftController');

// Allocating shift to the users only for Admins.
shiftRouter.post('/', isAuthenticatedAndAdmin, Validator('assignShiftValidation'), assignShiftToUser);
shiftRouter.get('/', isAuthenticatedAndAdmin, getAllUsersShifts);
shiftRouter.get('/:id', userShiftFromTo);
shiftRouter.get('/shiftusers/:id', usersInSelectedShift);
shiftRouter.patch('/removeuser/:id', removeUserFromShift);

module.exports = shiftRouter;
