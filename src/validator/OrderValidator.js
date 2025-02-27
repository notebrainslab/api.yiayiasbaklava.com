const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class OrderValidator {
    async addReviewValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            order_id: Joi.string()            
            .required()
            .messages({
                'string.base': 'Order ID must be a string.',
                'string.empty': 'Order ID is required.',
                'any.required': 'Order ID is required.',                
            }), 
              
            rating: Joi.string()
            .pattern(/^(?:[0-5](?:\.5)?)$/) // Allows numbers 0-5 with optional .5
            .required()
            .messages({
                'string.base': 'Rating must be a string.',
                'string.empty': 'Rating is required.',
                'any.required': 'Rating is required.',
                'string.pattern.base': 'Rating must be between 0 and 5 in 0.5 increments.',
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
