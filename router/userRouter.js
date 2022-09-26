const express = require('express');
const userRouter= express.Router();
const Validator = require('../middleware/validator');
const { isAuthenticated, isAuthenticatedAndAdmin } = require('../middleware/auth');

const { registerUser, loginUser, getUser, updateUser, getAllUsers, deleteUser } = require('../controller/userContoller');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - password
 *         - role
 *         - department
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         phoneNumber:
 *           type: string
 *           description: phoneNumber of the user
 *         password:
 *           type: string
 *           description: password of the user
 *         role:
 *           type: string
 *           description: role of the user (Admin, Employee)
 *         department:
 *           type: string
 *           description: department["transport","hr","it","manufacturing"] of the user
 *       example:
 *         firstName: Buddhika
 *         lastName: Senevirathna
 *         email: buddhika@gmail.com
 *         phoneNumber: 0045112343456
 *         password: Password should be minimum of 6 characters
 *         role: Admin
 *         department: transport
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: First name of the user
 *         password:
 *           type: string
 *           description: Last name of the user
 */

/**
 * @swagger
 * /api/user/:
 *   post:
 *     security: 
 *       - BearerAuth: []
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.post('/register', Validator('register'),registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login authentication
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.post('/login', Validator('login'), loginUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Returns the selected user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', isAuthenticated, getUser);

userRouter.put('/:id', updateUser);

userRouter.get('/', isAuthenticatedAndAdmin, getAllUsers);

userRouter.delete('/:id', isAuthenticatedAndAdmin,deleteUser);

module.exports = userRouter;
