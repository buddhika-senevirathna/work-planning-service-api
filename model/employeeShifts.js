const mongoose = require('mongoose');

const employeeShiftSchema = new mongoose.Schema({
    employeeID: {
        type: {type: mongoose.Types.ObjectId, ref: "employee"},
    },
    shiftInfo:{
        shiftDate:{
            type: Date,
            required: true,
        },
        startTime:{
            type: Date,
            required: true,
        },
        endTime:{
            type: Date,
            required: true,
        },
        status:{
            type: String
        }
    }
},{timestamps:true});

const employeeShiftModel = mongoose.model('employeeShift', employeeShiftSchema);
module.exports = employeeShiftModel;
