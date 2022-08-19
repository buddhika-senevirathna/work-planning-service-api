const express = require('express');
const userRouter= express.Router();
const Validator = require('../middleware/validator');
const isAuthenticated = require('../middleware/auth');

const { registerUser, loginUser, getUser, updateUser, getAllUsers, deleteUser } = require('../controller/userContoller');

userRouter.post('/register', Validator('register'),registerUser);

userRouter.post('/login', Validator('login'), loginUser);

userRouter.get('/:id', isAuthenticated, getUser);

userRouter.put('/:id', updateUser);

userRouter.get('/', isAuthenticated, getAllUsers);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
