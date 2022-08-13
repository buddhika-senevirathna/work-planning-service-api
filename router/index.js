const express = require('express');
const route= express.Router();

const userRouter = require('./userRouter');
const employeeShiftRouter = require('./employeeShiftRouter');
const employeeRouter = require('./employeeRouter');

route.use('/user', userRouter);
route.use('/emp', employeeRouter);
route.use('/shift', employeeShiftRouter);

module.exports = route;