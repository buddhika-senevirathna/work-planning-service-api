const express = require('express');
const shiftRouter= express.Router();
const Validator = require('../middleware/validator');
const { isAuthenticated, isAuthenticatedAndAdmin } = require('../middleware/auth');

const { saveShift, getAllShifts, getShift, updateShift, deleteShift } = require('../controller/shiftController');

// shiftRouter.post('/', Validator('newShift'),isAuthenticatedAndAdmin, saveShift);
shiftRouter.post('/', isAuthenticatedAndAdmin, Validator('saveShiftValidation'), saveShift);

shiftRouter.get('/', isAuthenticated, getAllShifts);

shiftRouter.get('/:id', isAuthenticated, getShift);

shiftRouter.put('/:id', isAuthenticatedAndAdmin, updateShift);

shiftRouter.delete('/:id', isAuthenticatedAndAdmin, deleteShift);

module.exports = shiftRouter;
