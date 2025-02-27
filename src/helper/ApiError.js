class ApiError extends Error {
    // constructor(statusCode, message, isOperational = true, stack = '') {  // old code 
    constructor(statusCode = 500, message = 'Something went wrong', isOperational = true, stack = '') { // replaced code
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
