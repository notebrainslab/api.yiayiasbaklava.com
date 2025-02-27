const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../helper/ApiError');
const logger = require('../config/logger');

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        // const statusCode = error.statusCode // old code 
        const statusCode = Number.isInteger(error.statusCode) // replaced code
            //? httpStatus.BAD_REQUEST // old code 
            ? error.statusCode  // replaced code
            : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    statusCode = Number.isInteger(statusCode) ? statusCode : httpStatus.INTERNAL_SERVER_ERROR; // add new
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        // message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]; // old code
        message = 'Something went wrong, please try again later.'; //replaced code
    }

    res.locals.errorMessage = err.message;

    const response = {
        // code: statusCode, // old code 
        status: 0, //replaced code
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    if (config.env === 'development') {
        logger.error(err);
    }
    else { 
        logger.error(`${statusCode} - ${message}`); // add else part
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};
