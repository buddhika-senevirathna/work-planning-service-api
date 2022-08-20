const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    shiftName: {
        type: String,
        required: true,
        unique: true,
    },
    depatment: {
        type: String,
        require: true,
        enum:["Transport","HR","IT","Manufacturing"]
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true
    }
},{ timestamps: true });

const shifts = mongoose.model('shifts', shiftSchema);
module.exports = shifts;