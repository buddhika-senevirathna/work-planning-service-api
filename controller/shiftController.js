const shiftModel = require('../model/shiftModel');

const saveShift = async(req, res) => {
    try {
        const existingShift = await shiftModel.find({
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            depatment:req.body.depatment,
        });

        if (existingShift.length > 0) {
            return res.status(412).json({ status:"FAILED", message:"Shift already exist", details:existingShift })
        }

        const newShift = new shiftModel(req.body);
        const savedShift = await newShift.save();

        return res.status(200).json({ status:"OK", message:"New Shift Created Successfully", shift:savedShift })
    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

const getAllShifts = async(req, res) => {
    try {
        const shifts = await shiftModel.find();
        return res.json(200).json({ status:"OK", shifts:shifts});
    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

const getShift = async(req, res) => {
    try {
        const shifts = await shiftModel.findById(req.params.id);
        return res.json(200).json({ status:"OK", shifts:shifts});  
    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

const updateShift = async(req, res) => {
    try {
        const updatedShift = await shiftModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200).json({ status: "OK", updatedShift:updatedShift }); 
    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message }); 
    }
}

const deleteShift = async(req, res) => {
    try {
        await shiftModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Shift has been deleted successfully.");
    } catch (error) {
        return res.status(412).json({ status: "FAILED", message: error.message });
    }
}

module.exports = { saveShift, getAllShifts, getShift, updateShift, deleteShift }