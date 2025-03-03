const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class AddressValidator {
    async addAddressValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            street: Joi.string()
                .required()
                .messages({
                    'string.base': 'Street must be a string.',
                    'string.empty': 'Street is required.',
                    'any.required': 'Street is required.',
                }),
        
            city: Joi.string()
                .required()
                .messages({
                    'string.base': 'City must be a string.',
                    'string.empty': 'City is required.',
                    'any.required': 'City is required.',
                }),
        
            zip: Joi.number()
                .integer()
                .min(10000)
                .max(99999)
                .required()
                .messages({
                    'number.base': 'ZIP code must be a number.',
                    'number.empty': 'ZIP code is required.',
                    'any.required': 'ZIP code is required.',
                    'number.min': 'ZIP code must be a valid 5-digit US ZIP code.',
                    'number.max': 'ZIP code must be a valid 5-digit US ZIP code.',
                }),
                    
            state: Joi.string()
                .required()
                .messages({
                    'string.base': 'State must be a string.',
                    'string.empty': 'State is required.',
                    'any.required': 'State is required.',
                }),
        
            country: Joi.string()
                .required()
                .messages({
                    'string.base': 'Country must be a string.',
                    'string.empty': 'Country is required.',
                    'any.required': 'Country is required.',
                }),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
}

module.exports = AddressValidator;
