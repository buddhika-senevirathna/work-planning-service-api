const userModel = require("../model/userModel");
const userShiftsModel = require("../model/userShiftsModel");
const mongoose = require('mongoose');
const { object } = require("joi");
const ObjectId = mongoose.Types.ObjectId;

/**
 * Assigning shift to the selected user.
 * @param {*} req 
 * @param {*} res 
 */
const assignShiftToUser = async(req, res) => {
    try {
        // get the user_id from request body
        const shiftDate = req.body.shiftDate;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        let assignedUsers = req.body.assignedUsers;

        // Check the shift already exist in the system or not.
        let usersInShift = [];
        usersInShift = await userShiftsModel.find({
            shiftDate:new Date(shiftDate),
        },{assignedUsers:1, _id:0},);

        // if users already exist in the database get only new users. 
        if (usersInShift.length > 0) {
            assignedUsers = assignedUsers.filter(newUser => ! usersInShift[0].assignedUsers.some(existing => existing._id.valueOf() === newUser._id));;
        }

        const shifts = await userShiftsModel.updateOne(
            {
                'shiftDate':shiftDate,
                'startTime':startTime,
                'endTime':endTime,
                'shiftId': req.body.shiftId,
                'shiftName': req.body.shiftName,
                'department': req.body.department,
                'shiftStatus': 'pending'
            },
            {
                $addToSet:{
                    assignedUsers: assignedUsers,
                }
            },
            {upsert: true},
        );
        return res.status(200).json({ status:"OK", message: shifts })
    } catch (error) {
        return res.status(412).json({ status:"FAILED", message: error.message })
    }
}


/**
 * Get all user shifts.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllUsersShifts = async(req, res) => {
    try {
        const usersShifts = await userShiftsModel.find()
        .populate({
            path:'assignedUsers._id', select:['firstName', 'lastName']
        });

        return res.status(200).json({ status:"OK", message:usersShifts });
    } catch (error) {
        return res.status(412).json({ status:"FAILED", message: error.message });    
    }
}

/**
 * Update shift status.
 */
const updateShiftStatus = async(req, res) => {
    try {
        const updatedShiftStatus = await userShiftsModel.findByIdAndUpdate(
            { 
                _id: new ObjectId(req.params.id) 
            },
            {
                $set: {
                    shiftStatus: req.body.status,
                }
            }
        );
        return res.status(200).json({ status:"OK", message: updatedShiftStatus });
    } catch (error) {
        return res.status(412).json({ status:"FAILED", message: error.message });
    }
}

/**
 * Update user status.
 */
 const updateShiftUserStatus = async(req, res) => {
    try {
        const updatedShiftStatus = await userShiftsModel.findByIdAndUpdate(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: {
                    shiftStatus: req.body.status,
                }
            }
        );
        return res.status(200).json({ status:"OK", message: updatedShiftStatus });
    } catch (error) {
        return res.status(412).json({ status:"FAILED", message: error.message });
    }
}


/**
 * Return selected user's shift between given days.
 */
const userShiftFromTo = async(req, res) => {
   try {
    const usersShifts = await userShiftsModel.aggregate([
        {
            "$unwind":"$assignedUsers"},
        {
            "$match":{
                "assignedUsers._id": new ObjectId(req.params.id),
                "shiftDate":{$gte: new Date(req.body.from), $lte: new Date(req.body.to)}
            }
        },
        {
            "$project":{
                "shiftDate":1,
                "shiftStatus":1,
                "startTime":1,
                "endTime":1,
                "assignedUsers":1
            }
        }
    ]);

    res.status(200).json({ status:"OK", message: usersShifts });
   } catch (error) {
    res.status(412).json({ status:"FAILED", message: error.message });
   }
}

/**
 * Return users for selected shift.
 */
const usersInSelectedShift = async(req, res) => {
    try {
        const usersInShift = await userShiftsModel.find({ _id:new ObjectId(req.params.id) })

        return res.status(200).json({ status:"OK", message:usersInShift });
    } catch (error) {
        res.status(412).json({ status:"FAILED", message: error.message });
    }
}

/**
 * Remove user from shift.
 */
const removeUserFromShift = async(req, res) => {
    try {
        const shiftId = req.params.id;
        const userId = req.body.userId;
       const removeStatus = await userShiftsModel.updateOne(
            {_id:new ObjectId(shiftId)},
            {'$pull':{ 'assignedUsers':{'_id': new ObjectId(userId) }}},
            {new:true}
        );
       return res.status(200).json({ status:"OK", removeStatus });
    } catch (error) {
        res.status(412).json({ status:"FAILED", message: error.message });
    }
}

/**
 * Delete Shift.
 */
 const removeSelectedShift = async(req, res) => {
    try {
        await userShiftsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "OK", message: "Shift has been deleted." });
    } catch (error) {
        res.status(412).json({ status:"FAILED", message:error.message });
    }
}

module.exports = {
    assignShiftToUser,
    getAllUsersShifts,
    updateShiftStatus,
    userShiftFromTo,
    usersInSelectedShift,
    removeUserFromShift,
    removeSelectedShift,
    updateShiftStatus,
    updateShiftUserStatus,
    removeSelectedShift
};
