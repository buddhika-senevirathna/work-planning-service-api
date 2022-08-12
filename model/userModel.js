const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    password:{
        type: String,
        required: true,
        minLength:[8,'Password should be minimum of 8 characters']
    },
    role:{
        type: String,
        required: true,
        enum:['admin','employee']
    },
    employeeID: {
        type: {type: mongoose.Types.ObjectId, ref: "employee"},
    },
    token:{
        type: String
    }

},{timestamps:true});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;