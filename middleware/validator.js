const createHttpError  = require('http-errors');

const Joi = require('joi')

const Validators = require('../validators');

const validator = (validator) => {
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async(req, res, next) => {
        try{
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch(err) {
            if(err.isJoi) {
                return res.status(412)
                .send({
                    success: false,
                    message: err.message,
                });
            }else{
                return res.status(500).json(err); 
            }
        }
    }
}

module.exports = validator;
