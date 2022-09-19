const express = require('express');
const shiftRouter = express.Router();
const Validator = require('../middleware/validator');
const { isAuthenticated, isAuthenticatedAndAdmin } = require('../middleware/auth');

const {
    assignShiftToUser,
    getAllUsersShifts,
    userShiftFromTo,
    usersInSelectedShift,
    removeUserFromShift,
    updateShiftStatus,
    updateShiftUserStatus
 } = require('../controller/userShiftController');

// Allocating shift to the users only for Admins.
shiftRouter.post('/', isAuthenticatedAndAdmin, Validator('assignShiftValidation'), assignShiftToUser);
shiftRouter.get('/', isAuthenticatedAndAdmin, getAllUsersShifts);
shiftRouter.get('/:id', isAuthenticated, userShiftFromTo);
shiftRouter.get('/shiftusers/:id', isAuthenticatedAndAdmin, usersInSelectedShift);
shiftRouter.patch('/removeuser/:id', isAuthenticatedAndAdmin, removeUserFromShift);
shiftRouter.patch('/shiftstatus/:id', isAuthenticated, updateShiftStatus);
shiftRouter.patch('/userstatus/:id', isAuthenticated, updateShiftUserStatus);

module.exports = shiftRouter;
