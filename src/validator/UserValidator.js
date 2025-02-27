const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class UserValidator {
    async userCreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required()
            .messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invaluid email address',
                'any.required': 'Email is required',
            }),
            phone: Joi.number()
            .integer()
            .positive()
            .required()
            .messages({
                'number.base': 'Phone number must be a number',
                'number.integer': 'Phone number must be an integer',
                'number.positive': 'Phone number must be a positive number',
                'any.required': 'Phone number is required',
            }),
            password: Joi.string().min(8).required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be atleast 8 characters',
                'any.required': 'Password is required',
            }),
            confirm_password: Joi.string().valid(Joi.ref('password')).required()
            .messages({
                'string.base': 'Confirm password must be a string',
                'string.empty': 'Confirm password is required',
                'any.required': 'Confirm password is required',
            }),           
            name: Joi.string().required()
            .messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name is required',
                'any.required': 'Name is required',
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

    async userLoginValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required()
            .messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invaluid email address',
                'any.required': 'Email is required',
            }),
            password: Joi.string().required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',                
                'any.required': 'Password is required',
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

    async checkEmailValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
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

    async changePasswordValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            // old_password: Joi.string().required(),
            password: Joi.string().min(8).required()
            .messages({
                'string.base': 'Password must be a string',
                'string.min': 'Password must be atleast 8 characters',
                'any.required': 'Password is required',
            }),
            confirm_password: Joi.string().min(8).required()
            .messages({
                'string.base': 'Confirm password must be a string',
                'string.min': 'Confirm password must be atleast 8 characters',
                'any.required': 'Confirm password is required',
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

    async profileupdateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            name: Joi.string()
            .required()
            .messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name is required',
                'any.required': 'Name is required',
            }),
            email: Joi.string().email().required()
            .messages({
                'string.email': 'Invalid email format',
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
            }),
            phone: Joi.number().integer().positive().required()
            .messages({
                'number.base': 'Phone number must be a number',
                'number.integer': 'Phone number must be an integer',
                'number.positive': 'Phone number must be a positive number',
                'any.required': 'Phone number is required',
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

module.exports = UserValidator;
