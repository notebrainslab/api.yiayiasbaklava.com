const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class CouponValidator {
    async CouponListValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            membership_id: Joi.number()
                .integer()
                .min(1) // Ensures a valid positive membership ID
                .required()
                .messages({
                    'number.base': 'Membership ID must be a number.',
                    'number.empty': 'Membership ID is required.',
                    'any.required': 'Membership ID is required.',
                    'number.integer': 'Membership ID must be an integer.',
                    'number.min': 'Membership ID must be a positive number.',
                })                
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

module.exports = CouponValidator;
