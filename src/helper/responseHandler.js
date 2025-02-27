const logError = (err) => {
    console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
};

const returnError = (statusCode, message) => {
    return {
        statusCode,
        response: {
            status: 0,            
            message,
        },
    };
};

const returnSuccess = (statusCode, message, data) => {
    const response = {
        status: 1,       
        message,
    };

    if (data && Object.keys(data).length > 0) {
        response.data = data;
    }

    return { statusCode, response };
};

// const returnSuccess = (statusCode, message, data = {}) => {
//     return {
//         statusCode,
//         response: {
//             status: 1,
//             code: statusCode,
//             message,
//             data,
//         },
//     };
// };



const getPaginationData = (rows, page, limit) => {
    const { count: totalItems, rows: data } = rows;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        data,
        totalPages,
        currentPage,
    };
};

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    returnSuccess,
    getPaginationData,
};
