const express = require('express');
const userRouter= express.Router();
const Validator = require('../middleware/validator');

const { registerUser, getUser, updateUser, getAllUsers, deleteUser } = require('../controller/userContoller');

userRouter.post('/register', Validator('register'),registerUser);

userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.get('/all', getAllUsers);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;