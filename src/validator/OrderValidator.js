const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class OrderValidator {
    async addReviewValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            order_id: Joi.number()
                .integer()
                .min(1) // Ensures a valid positive order ID
                .required()
                .messages({
                    'number.base': 'Order ID must be a number.',
                    'number.empty': 'Order ID is required.',
                    'any.required': 'Order ID is required.',                
                    'number.integer': 'Order ID must be an integer.',
                    'number.min': 'Order ID must be a positive number.',
                }), 

            rating: Joi.number()
                .min(0)
                .max(5)
                .precision(1) // Allows decimal values with 1 decimal place (e.g., 0.5, 1.5)
                .valid(0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5) // Ensures valid rating values
                .required()
                .messages({
                    'number.base': 'Rating must be a number.',
                    'number.empty': 'Rating is required.',
                    'any.required': 'Rating is required.',
                    'number.min': 'Rating must be at least 0.',
                    'number.max': 'Rating must not exceed 5.',
                    'number.precision': 'Rating must have at most 1 decimal place.',
                    'any.only': 'Rating must be between 0 and 5 in 0.5 increments.',
                }),
    
            review: Joi.string()                        
            .messages({
                'string.base': 'Review must be a string.',
                'string.empty': 'Review is required.',                           
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

module.exports = OrderValidator;
