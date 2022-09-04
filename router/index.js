const express = require('express');
const route= express.Router();

const userRouter = require('./userRouter');
const shift = require('./shiftRouter');
const userShift = require('./userShiftRouter');

route.use('/user', userRouter);
route.use('/shift', userShift);

module.exports = route;
