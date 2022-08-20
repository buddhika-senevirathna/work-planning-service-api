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
        shiftName:{
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
        duration:{
            type: Number,
            required: true,
            min: 1,
            max: 8
        },
        status:{
            type: String,
            required: true,
            enum:["pending","ongoing","completed"]
        }
    }
},{timestamps:true});

const employeeShiftModel = mongoose.model('employeeShift', employeeShiftSchema);
module.exports = employeeShiftModel;
