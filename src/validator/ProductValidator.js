const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ProductValidator {
    async ProductDetailsValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            product_id: Joi.number()
                .integer()
                .min(1) // Ensures a valid positive product ID
                .required()
                .messages({
                    'number.base': 'Product ID must be a number.',
                    'number.empty': 'Product ID is required.',
                    'any.required': 'Product ID is required.',                
                    'number.integer': 'Product ID must be an integer.',
                    'number.min': 'Product ID must be a positive number.',
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

    async addToFavuritesValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            product_id: Joi.number()
                .integer()
                .min(1) // Ensures a valid positive product ID
                .required()
                .messages({
                    'number.base': 'Product ID must be a number.',
                    'number.empty': 'Product ID is required.',
                    'any.required': 'Product ID is required.',                
                    'number.integer': 'Product ID must be an integer.',
                    'number.min': 'Product ID must be a positive number.',
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

module.exports = ProductValidator;
