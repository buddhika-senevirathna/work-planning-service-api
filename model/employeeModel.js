const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    department:{
        type: String
    }
},{timestamps:true});

const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;