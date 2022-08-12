const mongoose = require('mongoose');

const employeeShiftSchema = new mongoose.Schema({
    employeeID: {
        type: {type: mongoose.Types.ObjectId, ref: "employee"},
        required: true,
    },
    shiftInfo:{
        shiftDate:{
            type: Date,
            required: true,
        },
        startTime:{
            type: Time,
            required: true,
        },
        endTime:{
            type: Time,
            required: true,
        },
        status:{
            type: String
        }
    }
},{timestamps:true});

const employeeShiftModel = mongoose.model('employeeShift', employeeShiftSchema);
module.exports = employeeShiftModel;