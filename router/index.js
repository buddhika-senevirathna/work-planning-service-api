const express = require('express');
const route= express.Router();

const userRouter = require('./userRouter');
const employeeShiftRouter = require('./employeeShiftRouter');
const employeeRouter = require('./employeeRouter');
const shift = require('./shiftRouter');

route.use('/user', userRouter);
route.use('/emp', employeeRouter);
route.use('/emp_shift', employeeShiftRouter);
route.use('/shift', shift);

module.exports = route;