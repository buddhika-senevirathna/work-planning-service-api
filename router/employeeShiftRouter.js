const express = require('express');
const shiftRouter = express.Router();

const { newShift, getShift, getAllShifts, updateShift, deleteShift } = require('../controller/employeeShiftController');

shiftRouter.post('/', newShift);

shiftRouter.get('/:id', getShift);

shiftRouter.get('/all', getAllShifts);

shiftRouter.put('/:id', updateShift);

shiftRouter.delete('/:id', deleteShift);

module.exports = shiftRouter;