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
            return res.status(412).json("Requested user email already exist");
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
        const { password, ...other_details } = savedUser._doc;

        return res.status(201).json({ status: "OK",message: 'User registered successfully', data: other_details, 'token': token })

    } catch (error) {
        res.status(412).json(error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async(req, res) => {
    try {
        const  email = req.body.email;
        // Get the user details.
        const user = await userModel.findOne({ email: email });
        if(!user) {
            return res.status(400).json({status: "FAILED", message:'Please check the login credentials'});
        }

        // Check the password matches or not.
        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordMatched) {
            return res.status(400).json({status: "FAILED", message:'Please check the login credentials'}); 
        }

        // Create the user token.
        const token = await jwt.sign(
            { user_id: user._id, email }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );

        // Remove the password from user details and return the user details.
        const { password, ...other_details } = user._doc;

        // Adding token to the user details.
        other_details.token = token;

        return res.status(201).json({ status: "OK",message: 'Logged in successfully', data: other_details })

    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

const getUser = async(req, res) => {
    try {
        // Check if the user exist or not by user id.
        const userExist = await userModel.findById(req.params.id).select({ password: false });

        if (!userExist) {
            return res.status(412).json({ status: "FAILED", message: "User not found" }) 
        }

        return res.status(200).json({ status: "OK", data: userExist })

    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
    
}

const getAllUsers = async(req, res) => {
    try {
        // Check if the user exist or not.
        const users = await userModel.find().select({ password: false });

        if (!users) {
            return res.status(412).json({ status: "FAILED", message: "Cannot find users in the system" }); 
        }

        return res.status(200).json({ status: "OK", data: users })

    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

const updateUser = async(req, res) => {
    
}

const deleteUser = async(req, res) => {
    
}
module.exports = { registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser };
