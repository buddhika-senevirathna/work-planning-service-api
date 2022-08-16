const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Rgister a new user to the system.
 * @param { firstName, lastName, email, password, role  } req 
 * @param { status, message} res 
 */
const registerUser = async(req, res) => {
    try {
        // Check if the user already exist or not.
        const userExist = await userModel.findOne({ email: req.body.email });
        if(userExist) {
            return res.status(400).json("Requested user email already exist");
        }

        // Hash the password and adding hashed password to request body.
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const newUser = new userModel(req.body);
        const savedUser = await newUser.save();

        const token = await jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        // Remove the password.
        const { password, ...others } = savedUser._doc;

        return res.cookie({ 'token': token }).json({ success: true,message: 'User registered successfully', data: others })

    } catch (error) {
        res.status(400).json(error);
    }
}

const getUser = async(req, res) => {
    
}

const getAllUsers = async(req, res) => {
    
}

const updateUser = async(req, res) => {
    
}

const deleteUser = async(req, res) => {
    
}
module.exports = { registerUser, getUser, getAllUsers, updateUser, deleteUser };