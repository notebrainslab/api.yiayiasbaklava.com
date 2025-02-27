const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ProductValidator {
    async ProductDetailsValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            product_id: Joi.string()            
            .required()
            .messages({
                'string.base': 'Product ID must be a string.',
                'string.empty': 'Product ID is required.',
                'any.required': 'Product ID is required.',                
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
            product_id: Joi.string()            
                .required()
                .messages({
                    'string.base': 'Product ID must be a string.',
                    'string.empty': 'Product ID is required.',
                    'any.required': 'Product ID is required.',
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
