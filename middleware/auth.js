const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async(req, res, next) => {
    try {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        const token = req.headers[tokenHeaderKey];
        if(!token) {
            return next('user not autharized');
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = await userModel.find({ _id:verify.user_id, email:verify.email });

    } catch (error) {
       return res.status(401).json({status:"FAILED", message:"Invalid token"});
    }
    return next()
}

module.exports = isAuthenticated;