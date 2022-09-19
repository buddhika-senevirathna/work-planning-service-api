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
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength:[6,'Password should be minimum of 6 characters']
    },
    role:{
        type: String,
        required: true,
        enum:['admin','employee']
    },
    department: {
        type: String,
        require: true,
        enum:["transport","hr","it","manufacturing"]
    },
    token:{
        type: String
    },
    creatBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps:true});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
