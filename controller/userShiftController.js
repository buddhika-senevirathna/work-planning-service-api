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
        console.log("getAllUsersShifts");
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
 * Update shift status and given users status.
 */

/**
 * Return selected users shift between given days.
 */

/**
 * Return users for selected shift.
 */
module.exports = { assignShiftToUser, getAllUsersShifts };