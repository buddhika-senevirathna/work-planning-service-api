const mongoose = require('mongoose');

const userShiftSchema = new mongoose.Schema({
            shiftId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "shifts",
                required: true,
            },
            shiftDate:{
                type: Date,
                required: true,
            },
            shiftName:{
                type: String,
                ref: "shifts",
                required: true,
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
            },
            // Status of the shift.
            shiftStatus:{
                type: String,
                required: true,
                enum:["pending","started","completed"],
                default: "pending",
            },
            assignedUsers:[{
                _id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                    required: true,
                    unique: true,
                },
                firstName:{
                    type: String,
                    required: true
                },
                lastName:{
                    type: String,
                    required: true
                },
                email:{
                    type: String,
                    required: true,
                    unique: true
                },
                phoneNumber:{
                    type: String,
                    required: true,
                    unique: true,
                },
                // User completed the shift or not.
                userShiftStatus:{
                    type: String,
                    enum:["pending","started","completed"],
                    default: "pending",
                },
                creatBy:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                },
                createdDate:{
                    type: Date,
                    required: true,
                },
                updatedBy:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                    required: true,
                },
                updatedDate:{
                    type: Date,
                    default: Date.now()
                }
            }]
},{timestamps:true});

const userShiftModel = mongoose.model('userShifts', userShiftSchema);
module.exports = userShiftModel;
